import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@shared/services/redis/redis.service';
import { GetBillOfMaterialDetailListQuery } from './dtos';
import {
  BillOfMaterialDetailList,
} from '@shared/interfaces';
import { UIFunctionOutput } from '@shared/interfaces';
import { plainToInstance } from 'class-transformer';
import { UserTypes } from '../enums';
import {
  CreateUiFunctionParams,
  CreateUiFunctionUrl,
} from '@shared/utils/convert-ui-function-parameters.utils';
import { uiKeys } from '@shared/constants/ui-keys';

@Injectable()
export class DetailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}


  async getBillOfMaterialDetailList(
    runtimeSessionId: string,
    userType: UserTypes,
    query: GetBillOfMaterialDetailListQuery,
  ): Promise<BillOfMaterialDetailList> {
    const uiKey = uiKeys.billOfMaterial.detailList.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        billOfMaterial: query.billOfMaterial,
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
      ui_function: uiKeys.billOfMaterial.detailList.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams,
    };

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    return plainToInstance(BillOfMaterialDetailList, {
      numberOfRecords: results.BillOfMaterialDetailList?.BillOfMaterialDetails?.length || 0,
      billOfMaterialDetailList: results.BillOfMaterialDetailList?.BillOfMaterialDetails,
      billOfMaterialDetailHeader: results.BillOfMaterialDetailListHeader?.BillOfMaterials[results.BillOfMaterialDetailList?.BillOfMaterialDetailHeader?.Index],
    });
  }
}
