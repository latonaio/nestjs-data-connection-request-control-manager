import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@shared/services/redis/redis.service';
import { UserTypes } from './enums';
import { GetBusinessPartnerListQuery } from './dtos';
import { BusinessPartnerList } from '@shared/interfaces';
import {
  CreateUiFunctionParams,
  CreateUiFunctionUrl,
  GenerateLowerCase,
} from '@shared/utils/convert-ui-function-parameters.utils';
import { UIFunctionOutput } from '@shared/interfaces';
import { plainToInstance } from 'class-transformer';
import { uiKeys } from '@shared/constants/ui-keys';

@Injectable()
export class BusinessPartnerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async getBusinessPartnerList(
    runtimeSessionId: string,
    userType: UserTypes,
    query: GetBusinessPartnerListQuery,
  ): Promise<BusinessPartnerList> {
    const uiKey = uiKeys.businessPartner.list.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        businessPartner: query.businessPartner,
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
      ui_function: uiKeys.businessPartner.list.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams
    }

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );
    
    return plainToInstance(BusinessPartnerList, {
      BusinessPartners: results.BusinessPartner?.BusinessPartners
    });
  }
}
