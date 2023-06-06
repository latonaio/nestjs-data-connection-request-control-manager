import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { DetailService } from './detail.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import {
  GetProductionOrderDetailListParam,
  GetProductionOrderDetailListQuery,
  GetProductionOrderDetailParam,
  GetProductionOrderDetailQuery,
} from './dtos';
import {
  ProductionOrderDetailList,
  ProductionOrderDetail,
  DeliveryDocumentPagination,
  ProductionOrderPagination,
} from '@shared/interfaces';
import { GetDeliveryDocumentDetailParam, GetDeliveryDocumentDetailQuery } from '../../delivery-document/detail/dtos';

@Controller()
export class DetailController {
  constructor(
    private readonly detailService: DetailService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list/:userType')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { userType }: GetProductionOrderDetailListParam,
    @Query() query: GetProductionOrderDetailListQuery,
  ): Promise<ProductionOrderDetailList> {
    return await this.detailService.getProductionOrderDetailList(
      runtimeSessionId,
      userType,
      query,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('pagination/:productionOrder/:productionOrderItem/:userType/:product')
  async pagination(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { productionOrder, productionOrderItem, product, userType, }: GetProductionOrderDetailParam,
    @Query() query: GetProductionOrderDetailQuery,
  ): Promise<ProductionOrderPagination> {
    return await this.detailService.getProductionOrderPagination(
      runtimeSessionId,
      productionOrder,
      productionOrderItem,
      product,
      userType,
      query,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':productionOrder/:productionOrderItem/:userType/:product')
  async detail(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { productionOrder, productionOrderItem, product, userType, }: GetProductionOrderDetailParam,
    @Query() query: GetProductionOrderDetailQuery,
  ): Promise<ProductionOrderDetail> {
    return await this.detailService.getProductionOrderDetail(
      runtimeSessionId,
      productionOrder,
      productionOrderItem,
      product,
      userType,
      query,
    );
  }
}
