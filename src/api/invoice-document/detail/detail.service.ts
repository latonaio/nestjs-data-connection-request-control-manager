import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@shared/services/redis/redis.service';
import { UserTypes } from '../enums';
import { GetInvoiceDocumentDetailListQuery } from './dtos';
import {
  InvoiceDocumentDetailList,
  UIFunctionOutput } from '@shared/interfaces';
import {
  CreateUiFunctionParams,
  CreateUiFunctionUrl,
} from '@shared/utils/convert-ui-function-parameters.utils';
import { plainToInstance } from 'class-transformer';
import { uiKeys } from '@shared/constants/ui-keys';

@Injectable()
export class DetailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async getInvoiceDocumentDetailList(
    runtimeSessionId: string,
    userType: UserTypes,
    query: GetInvoiceDocumentDetailListQuery,
  ): Promise<InvoiceDocumentDetailList> {
    const uiKey = uiKeys.invoiceDocument.detailList.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        deliveryDocument: query.invoiceDocument,
        itemPaymentBlockStatus: query.itemPaymentBlockStatus,
        // isCancelled: query.isCancelled,
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
      ui_function: uiKeys.invoiceDocument.detailList.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams,
    };

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    return plainToInstance(InvoiceDocumentDetailList, {
      numberOfRecords: results.InvoiceDocumentList?.InvoiceDocumentDetails?.length || 0,
      invoiceDocumentDetailList: results.InvoiceDocumentList?.InvoiceDocumentDetails || [],
      invoiceDocumentDetailHeader:
        results.InvoiceDocumentDetailListHeader?.InvoiceDocuments[results.InvoiceDocumentList?.InvoiceDocumentDetailHeader?.Index],
    });
  }
}
