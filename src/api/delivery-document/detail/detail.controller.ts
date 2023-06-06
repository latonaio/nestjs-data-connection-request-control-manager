import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { DetailService } from './detail.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import {
  GetDeliveryDocumentDetailParam,
  GetDeliveryDocumentDetailQuery,
  GetDeliveryDocumentDetailListParam,
  GetDeliveryDocumentDetailListQuery
} from './dtos';
import { DeliveryDocumentDetailList, DeliveryDocumentDetail, DeliveryDocumentPagination } from '@shared/interfaces';

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
    @Param() { userType }: GetDeliveryDocumentDetailListParam,
    @Query() query: GetDeliveryDocumentDetailListQuery,
  ): Promise<DeliveryDocumentDetailList> {
    return await this.detailService.getDeliveryDocumentDetailList(
      runtimeSessionId,
      userType,
      query,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('pagination/:deliveryDocument/:deliveryDocumentItem/:userType/:product')
  async pagination(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { deliveryDocument, deliveryDocumentItem, product, userType, }: GetDeliveryDocumentDetailParam,
    @Query() query: GetDeliveryDocumentDetailQuery,
  ): Promise<DeliveryDocumentPagination> {
    return await this.detailService.getDeliveryDocumentPagination(
      runtimeSessionId,
      deliveryDocument,
      deliveryDocumentItem,
      product,
      userType,
      query,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':deliveryDocument/:deliveryDocumentItem/:userType/:product')
  async detail(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { deliveryDocument, deliveryDocumentItem, product, userType, }: GetDeliveryDocumentDetailParam,
    @Query() query: GetDeliveryDocumentDetailQuery,
  ): Promise<DeliveryDocumentDetail> {
    return await this.detailService.getDeliveryDocumentDetail(
      runtimeSessionId,
      deliveryDocument,
      deliveryDocumentItem,
      product,
      userType,
      query,
    );
  }
}
