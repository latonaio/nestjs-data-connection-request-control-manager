import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService as DataPlatformCommonSettingsMysqlKube } from '@shared/services/prisma/dataPlatformCommonSettingsMysqlKube.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
import { RabbitmqService } from '@shared/services/rabbitmq/rabbitmq.service';

@Injectable()
export class ApiModuleRuntimesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dataPlatformCommonSettingsMysqlKube: DataPlatformCommonSettingsMysqlKube,
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
    const { queueName, serviceLabel } = await this.getQueueName(aPIServiceName, aPIType);

    this.logger.debug(`Got Queue Name`, {
      runtimeSessionId,
      queueName,
    });

    const channel = await this.rabbitmqService.createChannel();
    await this.send(runtimeSessionId, queueName, bodyParams, aPIType, serviceLabel, channel);
    return await this.rabbitmqService.consume(runtimeSessionId, channel);
  }

  private async getQueueName(aPIServiceName: string, aPIType: string) {
    const result = await this.dataPlatformCommonSettingsMysqlKube.data_platform_api_request_to_rabbitmq_queue_mapper.findUnique({
      where: {
        APIServiceName_APIType: {
          APIServiceName: aPIServiceName,
          APIType: aPIType,
        }
      }
    });

    return {
      queueName: result.NameOfQueueFrom,
      serviceLabel: result.ServiceLabel,
    };
  }

  private async send(runtimeSessionId: string,
                     rmqName: string,
                     bodyParams: Object,
                     aPIType: string,
                     serviceLabel: string,
                     channel: any,
  ) {
    const msg = {
      ...bodyParams,
      runtime_session_id: runtimeSessionId,
      api_status_code: HttpStatus.OK,
      api_type: aPIType,
      service_label: serviceLabel,
    };

    this.logger.info(`Send Queue Data`, {
      runtimeSessionId,
      rmqName,
    });

    await this.rabbitmqService.sendToQueue(rmqName, msg, channel);

    this.logger.info(`Sent Queue Data`, {
      runtimeSessionId,
      rmqName,
    });
  }
}
