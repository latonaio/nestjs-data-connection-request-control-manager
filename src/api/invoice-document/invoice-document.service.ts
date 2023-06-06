import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@shared/services/redis/redis.service';
import { UserTypes } from './enums';
import { GetInvoiceDocumentListQuery } from './dtos';
import { InvoiceDocumentList } from '@shared/interfaces';
import {
  CreateUiFunctionParams,
  CreateUiFunctionUrl,
  GenerateLowerCase,
} from '@shared/utils/convert-ui-function-parameters.utils';
import { UIFunctionOutput } from '@shared/interfaces';
import { plainToInstance } from 'class-transformer';
import { uiKeys } from '@shared/constants/ui-keys';

@Injectable()
export class InvoiceDocumentService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async getInvoiceDocumentList(
    runtimeSessionId: string,
    userType: UserTypes,
    query: GetInvoiceDocumentListQuery,
  ): Promise<InvoiceDocumentList> {
    const uiKey = uiKeys.invoiceDocument.list.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        // billToParty: query.businessPartner, を businessPartner に戻した
        // [GenerateLowerCase(userType)]: query.businessPartner,
        businessPartner: query.businessPartner,
        headerPaymentBlockStatus: query.headerPaymentBlockStatus,
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
      ui_function: uiKeys.invoiceDocument.list.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams
    }

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    return plainToInstance(InvoiceDocumentList, {
      invoiceDocuments: results.InvoiceDocumentList?.InvoiceDocuments
    });
  }
}
