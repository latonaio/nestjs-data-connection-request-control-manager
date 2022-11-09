import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '@shared/services/prisma/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
import { RabbitmqService } from "@shared/services/rabbitmq/rabbitmq.service";

@Injectable()
export class OdataService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly rabbitmqService: RabbitmqService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async execute(
    aPIServiceName: string,
    aPIType: string,
    runtimeSessionId: string,
    bodyParams: Object,
  ): Promise<Object> {
    const queueName = await this.getQueueName(aPIServiceName, aPIType);

    this.logger.debug(`Got Queue Name`, {
      runtimeSessionId,
      queueName,
    });

    await this.send(runtimeSessionId, queueName, bodyParams, aPIServiceName, aPIType);
    await this.rabbitmqService.consume(runtimeSessionId);

    return { message: 'Executed successfully', data: { runtimeSessionId, queueName } };
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

  private async send(runtimeSessionId: string,
                     rmqName: string,
                     bodyParams: Object,
                     aPIServiceName: string,
                     aPIType: string,
  ) {
    const msg = {
      runtime_session_id: runtimeSessionId,
      aPIServiceName,
      aPIType,
      ...bodyParams
    };

    this.logger.info(`Send Queue Data`, {
      runtimeSessionId,
      rmqName,
    });

    await this.rabbitmqService.sendToQueue(rmqName, msg);

    this.logger.info(`Sent Queue Data`, {
      runtimeSessionId,
      rmqName,
    });
  }
}
