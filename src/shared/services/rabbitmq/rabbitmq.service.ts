import { Injectable, Inject } from '@nestjs/common';
import * as amqplib from "amqplib";
import { Channel, Connection } from 'amqplib';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
import { RuntimeSessionException } from '@shared/filters/runtime-session-exception.filter';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';
import { MessageTypes } from '@shared/enums/message-types';
import { ApiModuleRuntimeException } from '@shared/filters/api-module-runtime-exception.filter';
import { ApiProcessingResultException } from '@shared/filters/api-processing-result-error.filter';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class RabbitmqService {
  connection: Connection;
  channel: Channel;

  constructor(
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private eventEmitter: EventEmitter2,
  ) {}

  async onModuleInit() {
    await this.createConnection();
  }

  detectConnectionClose() {
    this.connection.on('close', async () => {
      this.logger.info(`RabbitMQ connection closed`);
      this.eventEmitter.emit('rabbitmq.connection.close');
    });
  }

  @OnEvent('rabbitmq.connection.close')
  async handleCloseEvent() {
    this.logger.info(`Handle Rabbitmq Close Event`);
    await this.createConnection();
  }

  async createConnection() {
    const { url, createConnectionIntervalSecond: createConnectionWaitTimeSecond, address, port, vhost, user } = this.configService.get('rmq');

    try {
      this.connection = await amqplib.connect(url);
      this.detectConnectionClose();
      this.logger.info(`Connected to RabbitMQ`, {
        address,
        port,
        vhost,
        user,
      });
    } catch (e) {
      setTimeout(async () => {
        this.logger.info(`Create Connection Failed`);
        await this.createConnection();
      }, 1000 * createConnectionWaitTimeSecond);
    }
  }

  async createChannel() {
    return await this.connection.createChannel();
  }

  async closeChannel(channel: Channel) {
    return await channel.close();
  }

  async sendToQueue(queueName: string, msg: Object, channel: Channel) {
    await channel.assertQueue(queueName, { durable: true });
    return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
  }

  async consume(runtimeSessionId: string, channel: Channel): Promise<Object> {
    try {
      const {
        dbName,
        address,
        port,
        collectionName,
      } = this.configService.get('mongodb');

      const uri = `mongodb://${address}:${port}`;
      const client = new MongoClient(uri);
      await client.connect();

      const database = client.db(dbName);
      const collection = database.collection(collectionName);

      let requestData;
      do {
        this.logger.info(`Search runtime session id: `, {
          runtimeSessionId,
        });

        requestData = await collection.findOne({ requestID: runtimeSessionId });
        if (!requestData) {
          this.logger.info(`Request runtime session id is not found`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } while (!requestData);

      await client.close();

      this.logger.info(`Request runtime session id is found`, { requestID: runtimeSessionId });

      return requestData;
    } catch (error) {
      // エラーハンドリング
      this.logger.error(`Error in consume function: ${error.message}`);
      throw error;
    }
  }
}
