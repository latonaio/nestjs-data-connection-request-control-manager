import { Injectable } from '@nestjs/common';
import { UserTypes } from './enums';
import { GetPriceMasterListQuery } from './dtos';
import { PriceMasterList, UIFunctionOutput } from '@shared/interfaces';
import { CreateUiFunctionParams, CreateUiFunctionUrl } from '@shared/utils/convert-ui-function-parameters.utils';
import { RedisService } from '@shared/services/redis/redis.service';
import { plainToInstance } from 'class-transformer';
import { uiKeys } from '@shared/constants/ui-keys';

@Injectable()
export class PriceMasterService {
  constructor(
    private readonly redisService: RedisService,
  ) {}

  async getPriceMasterList(
    runtimeSessionId: string,
    userType: UserTypes,
    query: GetPriceMasterListQuery,
  ): Promise<PriceMasterList> {
    const uiKey = uiKeys.priceMaster.list.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
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
      ui_function: uiKeys.priceMaster.list.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams
    }

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    return plainToInstance(PriceMasterList, {
      priceMasterList: results.PriceMasterList?.PriceMasters || [],
    });
  }
}
