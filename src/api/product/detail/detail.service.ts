import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@shared/services/redis/redis.service';
import {
  GetProductDetailExconfListQuery,
  GetProductDetailExconfListParam,
} from './dtos';
import {
  ProductDetailExconfList,
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

  async getProductDetailExconfList(
    runtimeSessionId: string,
    product: string,
    userType: UserTypes,
    query: GetProductDetailExconfListQuery,
  ): Promise<ProductDetailExconfList> {
    const uiKey = uiKeys.product.detailExconfList.key;

    const uiFunctionUrl = CreateUiFunctionUrl(
      uiKey,
      {
        userId: query.userId,
        user: userType,
        product,
      },
    );

    const uiFunctionParams = CreateUiFunctionParams({
      User: userType,
      Product: product,
      [UserTypes[userType]]: query.businessPartner,
      ...query,
    });

    const message: UIFunctionOutput = {
      ui_key_general_user_id: `${uiKey}/userID=${query.userId}`,
      ui_key_general_user_language: `${uiKey}/language=${query.language}`,
      ui_key_general_business_partner: `${uiKey}/businessPartnerID=${query.businessPartner}`,
      ui_function: uiKeys.product.detailExconfList.function,
      ui_key_function_url: uiFunctionUrl,
      runtime_session_id: runtimeSessionId,
      Params: uiFunctionParams,
    };

    const { redisCache: results } = await this.redisService.waitForApiRequestCache(
      uiFunctionUrl,
      runtimeSessionId,
      message,
    );

    const header = results.ProductDetailExconfListHeader?.Products[
      results.ProductDetailExconfList?.Header?.Index
      ] || {};

    return plainToInstance(ProductDetailExconfList, {
      productDetailExconfListHeader: header,
      productDetailExconfList: {
        Product: header.Product,
        Existences: results.ProductDetailExconfList?.Existences || [],
      },
    });
  }

}
