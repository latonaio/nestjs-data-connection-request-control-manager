import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@shared/services/redis/redis.service';
import { GetOrdersDetailQuery, GetOrdersDetailListQuery } from './dtos';
import { OrdersDetail, OrdersDetailList, OrdersPagination, ProductTag } from '@shared/interfaces';
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

  async getOrdersDetail(
    runtimeSessionId: string,
    orderId: number,
    orderItem: number,
    product: string,
    userType: UserTypes,
    query: GetOrdersDetailQuery,
  ): Promise<OrdersDetail> {
    const uiKey = uiKeys.orders.detail.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        orderID: orderId,
        orderItem,
        product,
      },
    );

    const uiFunctionParams = CreateUiFunctionParams({
      User: userType,
      OrderId: orderId,
      OrderItem: orderItem,
      Product: product,
      [UserTypes[userType]]: query.businessPartner,
      ...query,
    });

    const message: UIFunctionOutput = {
      ui_key_general_user_id: `${uiKey}/userID=${query.userId}`,
      ui_key_general_user_language: `${uiKey}/language=${query.language}`,
      ui_key_general_business_partner: `${uiKey}/businessPartnerID=${query.businessPartner}`,
      ui_function: uiKeys.orders.detail.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams,
    };

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    return plainToInstance(OrdersDetail, {
      ordersDetail: results.OrdersDetail,
    });
  }

  async getOrdersPagination(
    runtimeSessionId: string,
    orderId: number,
    orderItem: number,
    product: string,
    userType: UserTypes,
    query: GetOrdersDetailQuery,
  ): Promise<OrdersPagination> {
    const paginationMessage = {
      ui_function: uiKeys.orders.detail.pagination.function,
      ui_key_function_url: CreateUiFunctionUrl(
        uiKeys.orders.detail.pagination.key,
        {
          userId: query.userId,
          user: userType,
          orderID: orderId,
        },
      ),
      runtime_session_id: runtimeSessionId,
      Params: CreateUiFunctionParams({
        User: userType,
        OrderId: orderId,
        UserType: UserTypes[userType],
        [UserTypes[userType]]: query.businessPartner,
        ...query,
      }),
    };

    const { redisCache: paginationResults } = await this.redisService.waitForApiRequestCache(
      CreateUiFunctionUrl(
        uiKeys.orders.detail.pagination.key,
        {
          userId: query.userId,
          user: userType,
          orderID: orderId,
        },
      ),
      runtimeSessionId,
      paginationMessage,
    );

    return plainToInstance(OrdersPagination, {
      ordersDetailPagination: paginationResults.OrdersDetailPagination,
    });
  }

  async getOrdersDetailList(
    runtimeSessionId: string,
    userType: UserTypes,
    query: GetOrdersDetailListQuery,
  ): Promise<OrdersDetailList> {
    const uiKey = uiKeys.orders.detailList.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        orderId: query.orderId,
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
      ui_function: uiKeys.orders.detailList.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams,
    };

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    return plainToInstance(OrdersDetailList, {
      numberOfRecords: results.OrdersDetailList?.Details?.length || 0,
      ordersDetailList: results.OrdersDetailList?.Details,
      ordersDetailHeader: results.OrdersDetailHeader?.Orders[results.OrdersDetailList?.Header?.Index],
      paymentTerms: results.OrdersDetailList?.Header?.PaymentTerms,
      paymentMethod: results.OrdersDetailList?.Header?.PaymentMethod,
      currency: results.OrdersDetailList?.Header?.Currency,
      quantityUnit: results.OrdersDetailList?.Header?.QuantityUnit,
    });
  }
}
