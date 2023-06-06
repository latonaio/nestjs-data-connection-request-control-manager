import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@shared/services/redis/redis.service';
import { UserTypes } from './enums';
import { GetDeliveryDocumentListQuery } from './dtos';
import { DeliveryDocumentList } from '@shared/interfaces';
import { UIFunctionOutput } from '@shared/interfaces';
import { plainToInstance } from 'class-transformer';
import {
  ConvertUiFunctionParameters,
  CreateUiFunctionParams,
  CreateUiFunctionUrl,
} from '@shared/utils/convert-ui-function-parameters.utils';
import { MethodTypes } from '@shared/enums/method-types';
import { ExtensionTypes } from '@shared/enums/extension-types';
import { RabbitmqService } from '@shared/services/rabbitmq/rabbitmq.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { SendMailAttachment, SmtpService } from '@shared/services/smtp/smtp.service';
import { PrismaService as DataPlatformAuthenticatorMysqlKube } from '@shared/services/prisma/dataPlatformAuthenticatorMysqlKube.service';
import { uiKeys } from '@shared/constants/ui-keys';

@Injectable()
export class DeliveryDocumentService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly rabbitmqService: RabbitmqService,
    private readonly dataPlatformAuthenticatorMysqlKube: DataPlatformAuthenticatorMysqlKube,
    private readonly smtpService: SmtpService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async createDeliveryDocumentCsv(
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
      ...headerInfo,
    };

    if (serviceLabel === 'FUNCTION_DPFM_DELIVERY_DOCUMENT_CSV_READS') {
      msg['DeliveryDocument'] = {
        FilePath: `${filePath}/${runtimeSessionId}.${ExtensionTypes.CSV}`,
      }
    }

    if (serviceLabel === 'FUNCTION_DPFM_DELIVERY_NOTICE_EDI_FOR_SMES_CSV_READS') {
      msg['DeliveryNotice'] = {
        FilePath: `${filePath}/${runtimeSessionId}.${ExtensionTypes.CSV}`,
      }
    }

    if (serviceLabel === 'FUNCTION_DPFM_DELIVERY_NOTICE_EDI_FOR_VOLUNTARY_CHAIN_SMES_CSV_READS') {
      msg['DeliveryNotice'] = {
        FilePath: `${filePath}/${runtimeSessionId}.${ExtensionTypes.CSV}`,
      }
    }

    this.logger.info(`Send Queue Data`, {
      runtimeSessionId,
      rmqName,
    });

    await this.rabbitmqService.sendToQueue(rmqName, msg, channel);

    this.logger.info(`Sent Queue Data`, {
      runtimeSessionId,
      rmqName,
    });

    const result: any = await this.rabbitmqService.consume(runtimeSessionId, channel);

    if (serviceLabel === 'FUNCTION_DPFM_DELIVERY_NOTICE_EDI_FOR_VOLUNTARY_CHAIN_SMES_CSV_READS') {
      if (aPIType === MethodTypes.Creates) {
        await this.sendingEmail(
          '出荷案内が完了しました',
          `<p>出荷案内が完了しました。</p>` +
          `<p>出荷番号: ${result.message.Header[0].DeliveryDocument}</p>`,
          result.message.Header[0].Buyer,
          [
            {
              filename: `deliveryDocument_${result.message.Header[0].DeliveryDocument}.json`,
              content: JSON.stringify(result),
            },
          ],
        );
      }

      if (aPIType === MethodTypes.Updates) {
        await this.sendingEmail(
          '仕入明細の登録が完了しました',
          `<p>仕入明細の登録が完了しました。</p>` +
          `<p>出荷番号: ${result.message.Header[0].DeliveryDocument}</p>`,
          result.message.Header[0].Seller,
          [
            {
              filename: `deliveryDocument_answer_${result.message.Header[0].DeliveryDocument}.json`,
              content: JSON.stringify(result),
            },
          ],
        );
      }

      this.logger.info(`Sent Email`, {
        serviceLabel,
        deliveryDocument: result.message.Header.DeliveryDocument,
      });
    }

    return result;
  }

  async getDeliveryDocumentList(
    runtimeSessionId: string,
    userType: UserTypes,
    query: GetDeliveryDocumentListQuery,
  ): Promise<DeliveryDocumentList> {
    const uiKey = uiKeys.deliveryDocument.list.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        // headerCompleteDeliveryIsDefined: query.headerCompleteDeliveryIsDefined,
        // headerDeliveryStatus: query.headerDeliveryStatus,
        // headerBillingStatus: query.headerBillingStatus,
        // headerDeliveryBlockStatus: query.headerDeliveryBlockStatus,
        // headerIssuingBlockStatus: query.headerIssuingBlockStatus,
        // headerReceivingBlockStatus: query.headerReceivingBlockStatus,
        // headerBillingBlockStatus: query.headerBillingBlockStatus,
        headerBillingStatusException: query.headerBillingStatusException,
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
      ui_function: uiKeys.deliveryDocument.list.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams
    }

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    return plainToInstance(DeliveryDocumentList, {
      deliveryDocumentListEdit: {
        pullDown: results.DeliveryDocumentList?.Pulldown,
      },
      deliveryDocuments: results.DeliveryDocumentList?.DeliveryDocuments
    });
  }

  private async sendingEmail(
    title: string,
    textBody: string,
    businessPartner: number,
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
