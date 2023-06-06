import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import { OrdersDetail, OrdersDetailList, OrdersPagination } from '@shared/interfaces';
import { DetailService } from './detail.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import {
  GetOrdersDetailParam,
  GetOrdersDetailQuery,
  GetOrdersDetailListQuery,
  GetOrdersDetailListParam,
} from './dtos';

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
    @Param() { userType }: GetOrdersDetailListParam,
    @Query() query: GetOrdersDetailListQuery,
  ): Promise<OrdersDetailList> {
    return await this.detailService.getOrdersDetailList(
      runtimeSessionId,
      userType,
      query,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('pagination/:orderId/:orderItem/:userType/:product')
  async pagination(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { orderId, orderItem, product, userType, }: GetOrdersDetailParam,
    @Query() query: GetOrdersDetailQuery,
  ): Promise<OrdersPagination> {
    return await this.detailService.getOrdersPagination(
      runtimeSessionId,
      orderId,
      orderItem,
      product,
      userType,
      query,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':orderId/:orderItem/:userType/:product')
  async detail(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { orderId, orderItem, product, userType, }: GetOrdersDetailParam,
    @Query() query: GetOrdersDetailQuery,
  ): Promise<OrdersDetail> {
    return await this.detailService.getOrdersDetail(
      runtimeSessionId,
      orderId,
      orderItem,
      product,
      userType,
      query,
    );
  }
}
