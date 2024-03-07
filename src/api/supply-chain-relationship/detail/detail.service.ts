import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@shared/services/redis/redis.service';
import {
  GetSupplyChainRelationshipExconfListQuery,
} from './dtos';
import {
  SupplyChainRelationshipDetailExconfList,
  SupplyChainRelationshipDetail,
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

  async getSupplyChainRelationshipDetailExconfList(
    runtimeSessionId: string,
    supplyChainRelationshipId: number,
    userType: UserTypes,
    query: GetSupplyChainRelationshipExconfListQuery,
  ): Promise<SupplyChainRelationshipDetailExconfList> {
    const uiKey = uiKeys.supplyChainRelationship.detailExconfList.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        supplyChainRelationshipId,
      },
    );

    const uiFunctionParams = CreateUiFunctionParams({
      User: userType,
      SupplyChainRelationshipID: supplyChainRelationshipId,
      [UserTypes[userType]]: query.businessPartner,
      ...query,
    });

    const message: UIFunctionOutput = {
      ui_key_general_user_id: `${uiKey}/userID=${query.userId}`,
      ui_key_general_user_language: `${uiKey}/language=${query.language}`,
      ui_key_general_business_partner: `${uiKey}/businessPartnerID=${query.businessPartner}`,
      ui_function: uiKeys.supplyChainRelationship.detailExconfList.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams,
    };

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    const header = results.SupplyChainRelationshipGeneral?.SupplyChainRelationship[
      results.SupplyChainRelationshipExconfList?.General?.Index
      ] || {};

    return plainToInstance(SupplyChainRelationshipDetailExconfList, {
      supplyChainRelationshipDetailExconfListHeader: header,
      supplyChainRelationshipDetailExconfList: {
        SupplyChainRelationshipID: supplyChainRelationshipId,
        Existences: results.SupplyChainRelationshipExconfList?.Existences || [],
      },
    });
  }

  async getSupplyChainRelationshipDetail(
    runtimeSessionId: string,
    supplyChainRelationshipId: number,
    userType: UserTypes,
    query: GetSupplyChainRelationshipExconfListQuery,
  ): Promise<SupplyChainRelationshipDetail> {
    const uiKey = uiKeys.supplyChainRelationship.detail.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        supplyChainRelationshipId,
      },
    );

    const uiFunctionParams = CreateUiFunctionParams({
      User: userType,
      SupplyChainRelationshipID: supplyChainRelationshipId,
      [UserTypes[userType]]: query.businessPartner,
      ...query,
    });

    const message: UIFunctionOutput = {
      ui_key_general_user_id: `${uiKey}/userID=${query.userId}`,
      ui_key_general_user_language: `${uiKey}/language=${query.language}`,
      ui_key_general_business_partner: `${uiKey}/businessPartnerID=${query.businessPartner}`,
      ui_function: uiKeys.supplyChainRelationship.detail.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams,
    };

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    const header = results.SupplyChainRelationshipGeneral?.SupplyChainRelationship[
      results.SupplyChainRelationshipDetail?.Header?.Index
      ] || {};

    return plainToInstance(SupplyChainRelationshipDetail, {
      supplyChainRelationshipDetailHeader: header,
      supplyChainRelationshipContents: {
        SupplyChainRelationshipID: supplyChainRelationshipId,
        Contents: results.SupplyChainRelationshipDetail?.Contents || [],
      },
    });
  }
}
