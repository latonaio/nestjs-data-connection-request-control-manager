import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { DetailService } from './detail.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import {
  GetSupplyChainRelationshipExconfListParam,
  GetSupplyChainRelationshipExconfListQuery,
  GetSupplyChainRelationshipDetailParam,
  GetSupplyChainRelationshipDetailQuery,
} from './dtos';
import {
  OrdersDetail, SupplyChainRelationshipDetail,
  SupplyChainRelationshipDetailExconfList,
} from '@shared/interfaces';

@Controller()
export class DetailController {
  constructor(
    private readonly detailService: DetailService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get('exconf/list/:userType/:supplyChainRelationshipDeliveryId')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { supplyChainRelationshipDeliveryId, userType }: GetSupplyChainRelationshipExconfListParam,
    @Query() query: GetSupplyChainRelationshipExconfListQuery,
  ) : Promise<SupplyChainRelationshipDetailExconfList> {
    return await this.detailService.getSupplyChainRelationshipDetailExconfList(
      runtimeSessionId,
      supplyChainRelationshipDeliveryId,
      userType,
      query,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userType/:supplyChainRelationshipDeliveryId')
  async detail(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { supplyChainRelationshipDeliveryId, userType, }: GetSupplyChainRelationshipDetailParam,
    @Query() query: GetSupplyChainRelationshipDetailQuery,
  ): Promise<SupplyChainRelationshipDetail> {
    return await this.detailService.getSupplyChainRelationshipDetail(
      runtimeSessionId,
      supplyChainRelationshipDeliveryId,
      userType,
      query,
    );
  }
}
