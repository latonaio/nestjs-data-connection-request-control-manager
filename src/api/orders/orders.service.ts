import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { GetOrdersListQuery } from './dtos';
import { UserTypes } from './enums';
import { UIFunctionOutput } from '@shared/interfaces';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@shared/services/redis/redis.service';
import { plainToInstance } from 'class-transformer';
import { OrdersList } from '@shared/interfaces';
import {
  CreateUiFunctionParams,
  CreateUiFunctionUrl,
} from '@shared/utils/convert-ui-function-parameters.utils';
import { MethodTypes } from '@shared/enums/method-types';
import { RabbitmqService } from '@shared/services/rabbitmq/rabbitmq.service';
import { ExtensionTypes } from '@shared/enums/extension-types';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService as DataPlatformAuthenticatorMysqlKube } from '@shared/services/prisma/dataPlatformAuthenticatorMysqlKube.service';
import { SmtpService, SendMailAttachment } from '@shared/services/smtp/smtp.service';
import { uiKeys } from '@shared/constants/ui-keys';

@Injectable()
export class OrdersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly rabbitmqService: RabbitmqService,
    private readonly dataPlatformAuthenticatorMysqlKube: DataPlatformAuthenticatorMysqlKube,
    private readonly smtpService: SmtpService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async createOrdersCsv(
    runtimeSessionId: string,
    aPIType: MethodTypes,
    serviceLabel: string,
    headerInfo: any,
    filePath: string,
    rmqName: string,
  ): Promise<Object> {
    const channel = await this.rabbitmqService.createChannel();
    const msg = {
      runtime_session_id: runtimeSessionId,
      api_status_code: HttpStatus.OK,
      api_type: aPIType,
      service_label: serviceLabel,
      Orders: {
        FilePath: `${filePath}/${runtimeSessionId}.${ExtensionTypes.CSV}`,
      },
      ...headerInfo,
    };

    this.logger.debug(`Send Queue Data`, {
      runtimeSessionId,
      rmqName,
    });

    await this.rabbitmqService.sendToQueue(rmqName, msg, channel);

    this.logger.info(`Sent Queue Data`, {
      runtimeSessionId,
      rmqName,
    });

    const result: any = await this.rabbitmqService.consume(runtimeSessionId, channel);

    if (serviceLabel === 'FUNCTION_DPFM_ORDERS_EDI_FOR_VOLUNTARY_CHAIN_SMES_CSV_READS') {
      if (aPIType === MethodTypes.Creates) {
        await this.sendingEmail(
          '注文が完了しました',
          `<p>注文が完了しました。</p>` +
          `<p>注文番号: ${result.message.Header.OrderID}</p>`,
          result.message.Header.Seller,
          [
            {
              filename: `order_${result.message.Header.OrderID}.json`,
              content: JSON.stringify(result),
            },
          ],
        );
      }

      if (aPIType === MethodTypes.Updates) {
        await this.sendingEmail(
          '注文回答が完了しました',
          `<p>注文回答が完了しました。</p>` +
          `<p>注文番号: ${result.message.Header.OrderID}</p>`,
          result.message.Header.Buyer,
          [
            {
              filename: `order_answer_${result.message.Header.OrderID}.json`,
              content: JSON.stringify(result),
            },
          ],
        );
      }

      this.logger.info(`Sent Email`, {
        serviceLabel,
        orderId: result.message.Header.OrderID,
      });
    }

    return result;
  }

  async getOrdersList(
    runtimeSessionId: string,
    userType: UserTypes,
    query: GetOrdersListQuery,
  ): Promise<OrdersList> {
    const uiKey = uiKeys.orders.list.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        headerCompleteDeliveryIsDefined: query.headerCompleteDeliveryIsDefined,
        headerDeliveryStatus: query.headerDeliveryStatus,
        headerDeliveryBlockStatus: query.headerDeliveryBlockStatus,
        // isCancelled: query.isCancelled,
        // isMarkedForDeletion: query.isMarkedForDeletion,
      },
    );

    const uiFunctionParams = CreateUiFunctionParams({
      User: userType,
      [UserTypes[userType]]: query.businessPartner,
      ...query,
    });

    const message: UIFunctionOutput = {
      ui_key_general_user_id: `${uiKey}/userID=${query.userId}`,
      ui_key_general_user_language: `${uiKey}/language=${query.language}`,
      ui_key_general_business_partner: `${uiKey}/businessPartnerID=${query.businessPartner}`,
      ui_function: `OrdersList${UserTypes[userType]}`,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams,
      responseReceiveQueue: 'nestjs-data-connection-receive-async-data-consume',
    }

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    return plainToInstance(OrdersList, {
      ordersList: results.Orders?.Orders
    });
  }

  private async sendingEmail(
    title: string,
    textBody: string,
    businessPartner,
    attachment: SendMailAttachment[] = [],
  ) {
    const businessUsers = await this.dataPlatformAuthenticatorMysqlKube
      .data_platform_authenticator_business_user_data.findMany(
        {
          where: {
            BusinessPartner: {
              equals: businessPartner,
            },
          },
        });

    for await (const businessUser of businessUsers) {
      if (businessUser.NoticeTo) {
        const toEmailAddress = businessUser.EmailAddress;

        await this.smtpService
          .sendMail(
            toEmailAddress,
            title,
            textBody,
            [
              ...attachment,
            ]
          );
      }
    }
  }
}
