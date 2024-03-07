import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@shared/services/redis/redis.service';
import {
  GetPriceMasterDetailListQuery,
  GetPriceMasterDetailListParam,
} from './dtos';
import {
  PriceMasterDetailList,
} from '@shared/interfaces';
import { UIFunctionOutput } from '@shared/interfaces';
import { uiKeys } from '@shared/constants/ui-keys';
import { plainToInstance } from 'class-transformer';
import { UserTypes } from '../enums';
import {
  CreateUiFunctionParams,
  CreateUiFunctionUrl,
} from '@shared/utils/convert-ui-function-parameters.utils';

@Injectable()
export class DetailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async getPriceMasterDetailList(
    runtimeSessionId: string,
    userType: UserTypes,
    query: GetPriceMasterDetailListQuery,
  ): Promise<PriceMasterDetailList> {
    const uiKey = uiKeys.priceMaster.detailList.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        supplyChainRelationshipID: query.supplyChainRelationshipId,
      },
    );

    const uiFunctionParams = CreateUiFunctionParams({
      User: userType,
      SupplyChainRelationshipID: query.supplyChainRelationshipId,
      [UserTypes[userType]]: query.businessPartner,
      ...query,
    });

    const message: UIFunctionOutput = {
      ui_key_general_user_id: `${uiKey}/userID=${query.userId}`,
      ui_key_general_user_language: `${uiKey}/language=${query.language}`,
      ui_key_general_business_partner: `${uiKey}/businessPartnerID=${query.businessPartner}`,
      ui_function: uiKeys.priceMaster.detailList.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams,
    };

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    return plainToInstance(PriceMasterDetailList, {
      numberOfRecords: results.PriceMasterDetailList?.PriceMasterDetail?.length || 0,
      priceMasterDetailList: results.PriceMasterDetailList?.PriceMasterDetail || [],
      priceMasterDetailHeader: results.PriceMasterDetailListHeader?.PriceMasters[results.PriceMasterDetailList?.PriceMasterDetailHeader.Index] || {},
    });
  }
}
