import { Injectable, Inject } from '@nestjs/common';
import * as amqplib from "amqplib";
import { Channel, Connection } from 'amqplib';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
import { RuntimeSessionException } from '@shared/filters/runtime-session-exception.filter';

@Injectable()
export class RabbitmqService {
  connection: Connection;
  channel: Channel;

  constructor(
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    const { url } = this.configService.get('rmq');
    this.connection = await amqplib.connect(url);
    this.channel = await this.connection.createChannel();
    this.logger.info(`Connected to RabbitMQ`, { url,});
  }

  async sendToQueue(queueName: string, msg: Object) {
    await this.channel.assertQueue(queueName, { durable: true });
    return this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
  }

  async consume(runtimeSessionId: string) {
    return new Promise(async (resolve, reject) => {
      const { rmqQueueConsume } = this.configService.get('rmq');
      const { requestTimeoutSecond } = this.configService.get('application');

      await this.channel.consume(rmqQueueConsume, (queueData) => {
        const parsedMessage = JSON.parse(queueData.content.toString());

        this.logger.debug(`Got Queue Message`, {
          parsedMessageRuntimeSessionId: parsedMessage.runtimeSessionId,
          runtimeSessionId,
        });

        if (parsedMessage.runtimeSessionId === runtimeSessionId) {
          this.channel.ack(queueData);
          return resolve(queueData)
        }
      }, { noAck: false });

      setTimeout(() => {
        return reject(
          new RuntimeSessionException(`Request timeout`, { runtimeSessionId })
        );
      }, requestTimeoutSecond * 1000);
    });
  }
}
