import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@shared/services/redis/redis.service';
import { GetDeliveryDocumentDetailListQuery, GetDeliveryDocumentDetailQuery } from './dtos';
import {
  DeliveryDocumentDetailList,
  DeliveryDocumentDetail,
  DeliveryDocumentPagination,
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

  async getDeliveryDocumentDetail(
    runtimeSessionId: string,
    deliveryDocument: number,
    deliveryDocumentItem: number,
    product: string,
    userType: UserTypes,
    query: GetDeliveryDocumentDetailQuery,
  ): Promise<DeliveryDocumentDetail> {
    const uiKey = uiKeys.deliveryDocument.detail.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        deliveryDocument,
        deliveryDocumentItem,
        product,
      },
    );

    const uiFunctionParams = CreateUiFunctionParams({
      User: userType,
      DeliveryDocument: deliveryDocument,
      DeliveryDocumentItem: deliveryDocumentItem,
      Product: product,
      [UserTypes[userType]]: query.businessPartner,
      ...query,
    });

    const message: UIFunctionOutput = {
      ui_key_general_user_id: `${uiKey}/userID=${query.userId}`,
      ui_key_general_user_language: `${uiKey}/language=${query.language}`,
      ui_key_general_business_partner: `${uiKey}/businessPartnerID=${query.businessPartner}`,
      ui_function: uiKeys.deliveryDocument.detail.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams,
    };

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    return plainToInstance(DeliveryDocumentDetail, {
      deliveryDocumentDetail: results.DeliveryDocumentDetail,
    });
  }

  async getDeliveryDocumentPagination(
    runtimeSessionId: string,
    deliveryDocument: number,
    deliveryDocumentItem: number,
    product: string,
    userType: UserTypes,
    query: GetDeliveryDocumentDetailQuery,
  ): Promise<DeliveryDocumentPagination> {
    const paginationMessage = {
      ui_function: uiKeys.deliveryDocument.detail.pagination.function,
      ui_key_function_url: CreateUiFunctionUrl(
        uiKeys.deliveryDocument.detail.pagination.key,
        {
          userId: query.userId,
          user: userType,
          deliveryDocument,
        },
      ),
      runtime_session_id: runtimeSessionId,
      Params: CreateUiFunctionParams({
        User: userType,
        DeliveryDocument: deliveryDocument,
        UserType: UserTypes[userType],
        [UserTypes[userType]]: query.businessPartner,
        ...query,
      }),
    };

    const { redisCache: paginationResults } = await this.redisService.waitForApiRequestCache(
      CreateUiFunctionUrl(
        uiKeys.deliveryDocument.detail.pagination.key,
        {
          userId: query.userId,
          user: userType,
          deliveryDocument: deliveryDocument,
        },
      ),
      runtimeSessionId,
      paginationMessage,
    );

    return plainToInstance(DeliveryDocumentPagination, {
      deliveryDocumentDetailPagination: paginationResults.DeliveryDocumentDetailPagination,
    });
  }


  async getDeliveryDocumentDetailList(
    runtimeSessionId: string,
    userType: UserTypes,
    query: GetDeliveryDocumentDetailListQuery,
  ): Promise<DeliveryDocumentDetailList> {
    const uiKey = uiKeys.deliveryDocument.detailList.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        deliveryDocument: query.deliveryDocument,
        itemCompleteDeliveryIsDefined: query.itemCompleteDeliveryIsDefined,
        // itemDeliveryStatus: query.itemDeliveryStatus,
        itemDeliveryBlockStatus: query.itemDeliveryBlockStatus,
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
      ui_function: uiKeys.deliveryDocument.detailList.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams,
    };

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    return plainToInstance(DeliveryDocumentDetailList, {
      numberOfRecords: results.DeliveryDocumentDetailList?.DeliveryDocumentDetail?.length || 0,
      deliveryDocumentDetailList: results.DeliveryDocumentDetailList?.DeliveryDocumentDetail,
      deliveryDocumentDetailHeader: results.DeliveryDocumentDetailListHeader?.DeliveryDocuments[results.DeliveryDocumentDetailList?.DeliveryDocumentDetailHeader?.Index],
    });
  }
}
