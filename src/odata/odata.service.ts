import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as amqplib from 'amqplib';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OdataService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService
  ) {
  }

  async getOdata(
    aPIServiceName: string,
    aPIType: string,
    jwtToken: string,
    sequenceId: string,
    bodyParams: Object,
  ): Promise<Object> {
    await this.verifyToken(jwtToken);

    const queueName = await this.getQueueName(aPIServiceName, aPIType);
    await this.send(sequenceId, queueName, bodyParams);
    await this.consume(sequenceId);

    return {
      result: 'success'
    }
  }

  private async getQueueName(aPIServiceName: string, aPIType: string) {
    const result = await this.prismaService.data_platform_api_request_to_rmq_mapper.findUnique({
      where: {
        APIServiceName_APIType: {
          APIServiceName: aPIServiceName,
          APIType: aPIType,
        }
      }
    });

    return result.NameOfQueue;
  }

  private async send(sequenceId: string, rmqName: string, bodyParams: Object) {
    const rmqVhost = process.env.RMQ_VHOST;
    const rmpPort = process.env.RMQ_PORT;
    const rmqAddress = process.env.RMQ_ADDRESS;
    const rmqUser = process.env.RMQ_USER;
    const rmqPass = process.env.RMQ_PASS;

    const url = `amqp://${rmqUser}:${rmqPass}@${rmqAddress}:${rmpPort}/${rmqVhost}`;

    const connection = await amqplib.connect(url);
    const channel = await connection.createChannel();

    const send = async (queue: string, msg: Buffer) => {
      await channel.assertQueue(queue, {durable: true});
      return channel.sendToQueue(queue, msg)
    }

    const msg = { sequenceId, ...bodyParams };

    await send(rmqName, Buffer.from(JSON.stringify(msg)));
  }

  private async consume(sequenceId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const rmqName = process.env.RMQ_QUEUE_CONSUME;
        const rmqVhost = process.env.RMQ_VHOST;
        const rmpPort = process.env.RMQ_PORT;
        const rmqAddress = process.env.RMQ_ADDRESS;
        const rmqUser = process.env.RMQ_USER;
        const rmqPass = process.env.RMQ_PASS;

        const url = `amqp://${rmqUser}:${rmqPass}@${rmqAddress}:${rmpPort}/${rmqVhost}`;

        const connection = await amqplib.connect(url);
        const channel = await connection.createChannel();

        await channel.consume(rmqName, async (queueData: any) => {
          const parsedMessage = JSON.parse(queueData.content.toString());
          if (parsedMessage.sequenceId === sequenceId) {
            console.log(`received sequenceId: ${sequenceId}`);
            channel.ack(queueData);
            return resolve(queueData)
          }
        });
      } catch (e) {
        console.log(e);
        return reject(e);
      }
    });
  }

  private async verifyToken(jwtToken: string): Promise<{ status: string, loginId: String}> {
    const url = `http://${process.env.AUTHENTICATOR_HOST}:${process.env.AUTHENTICATOR_PORT}/token/verify`;
    const result: any = await firstValueFrom(this.httpService.post(
      url,
      {},
      {headers: { 'Authorization': `Bearer ${jwtToken}` }},
    ));

    console.log(result.request.res.statusCode);
    console.log(result.data);

    return {
      status: String(result.request.res.statusCode),
      loginId: result.data
    }
  }
}
