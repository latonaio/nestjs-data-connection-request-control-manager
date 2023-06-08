import { Injectable } from '@nestjs/common';
import { UserTypes } from './enums';
import { GetWorkCenterListQuery } from './dtos';
import { WorkCenterList, UIFunctionOutput } from '@shared/interfaces';
import { CreateUiFunctionParams, CreateUiFunctionUrl } from '@shared/utils/convert-ui-function-parameters.utils';
import { RedisService } from '@shared/services/redis/redis.service';
import { plainToInstance } from 'class-transformer';
import { uiKeys } from '@shared/constants/ui-keys';

@Injectable()
export class WorkCenterService {
  constructor(
    private readonly redisService: RedisService,
  ) {}

  async getWorkCenterList(
    runtimeSessionId: string,
    userType: UserTypes,
    query: GetWorkCenterListQuery,
  ): Promise<WorkCenterList> {
    const uiKey = uiKeys.workCenter.list.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
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
      ui_function: uiKeys.workCenter.list.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams
    }

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    console.log('results', results.WorkCenterList?.WorkCenters)

    return plainToInstance(WorkCenterList, {
      workCenterList: results.WorkCenterList?.WorkCenters || [],
    });
  }
}
