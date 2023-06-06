import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@shared/services/redis/redis.service';
import {
  GetProductionOrderDetailListQuery,
  GetProductionOrderDetailQuery,
} from './dtos';
import {
  ProductionOrderDetailList,
  ProductionOrderDetail,
  ProductionOrderPagination,
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

  async getProductionOrderDetailList(
    runtimeSessionId: string,
    userType: UserTypes,
    query: GetProductionOrderDetailListQuery,
  ): Promise<ProductionOrderDetailList> {
    const uiKey = uiKeys.productionOrder.detailList.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        productionOrder: query.productionOrder,
        productionOrderIsReleased: query.productionOrderIsReleased,
        // isCancelled: query.isCancelled,
        isMarkedForDeletion: query.isMarkedForDeletion,
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
      ui_function: uiKeys.productionOrder.detailList.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams,
    };

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    return plainToInstance(ProductionOrderDetailList, {
      numberOfRecords: results.ProductionOrderDetailList?.Details?.length || 0,
      productionOrderDetailList: results.ProductionOrderDetailList?.Details,
      productionOrderDetailHeader: results.ProductionOrderDetailListHeader?.ProductionOrders[results.ProductionOrderDetailList?.Header?.Index],
    });
  }

  async getProductionOrderPagination(
    runtimeSessionId: string,
    productionOrder: number,
    productionOrderItem: number,
    product: string,
    userType: UserTypes,
    query: GetProductionOrderDetailQuery,
  ): Promise<ProductionOrderPagination> {
    const paginationMessage = {
      ui_function: uiKeys.productionOrder.detail.pagination.function,
      ui_key_function_url: CreateUiFunctionUrl(
        uiKeys.productionOrder.detail.pagination.key,
        {
          userId: query.userId,
          user: userType,
          productionOrder,
        },
      ),
      runtime_session_id: runtimeSessionId,
      Params: CreateUiFunctionParams({
        User: userType,
        ProductionOrder: productionOrder,
        UserType: UserTypes[userType],
        [UserTypes[userType]]: query.businessPartner,
        ...query,
      }),
    };

    const { redisCache: paginationResults } = await this.redisService.waitForApiRequestCache(
      CreateUiFunctionUrl(
        uiKeys.productionOrder.detail.pagination.key,
        {
          userId: query.userId,
          user: userType,
          productionOrder: productionOrder,
        },
      ),
      runtimeSessionId,
      paginationMessage,
    );

    return plainToInstance(ProductionOrderPagination, {
      productionOrderDetailPagination: paginationResults.ProductionOrderDetailPagination,
    });
  }

  async getProductionOrderDetail(
    runtimeSessionId: string,
    productionOrder: number,
    productionOrderItem: number,
    product: string,
    userType: UserTypes,
    query: GetProductionOrderDetailQuery,
  ): Promise<ProductionOrderDetail> {
    const uiKey = uiKeys.productionOrder.detail.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        productionOrder,
        productionOrderItem,
        product,
      },
    );

    const uiFunctionParams = CreateUiFunctionParams({
      User: userType,
      ProductionOrder: productionOrder,
      ProductionOrderItem: productionOrderItem,
      Product: product,
      [UserTypes[userType]]: query.businessPartner,
      ...query,
    });

    const message: UIFunctionOutput = {
      ui_key_general_user_id: `${uiKey}/userID=${query.userId}`,
      ui_key_general_user_language: `${uiKey}/language=${query.language}`,
      ui_key_general_business_partner: `${uiKey}/businessPartnerID=${query.businessPartner}`,
      ui_function: uiKeys.productionOrder.detail.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams,
    };

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    return plainToInstance(ProductionOrderDetail, {
      productionOrderDetail: results.ProductionOrderDetail,
    });
  }
}
