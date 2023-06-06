import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { ProductionOrderService } from './production-order.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import { GetProductionOrderListParam, GetProductionOrderListQuery } from './dtos';
import { ProductionOrderList } from '@shared/interfaces';

@Controller()
export class ProductionOrderController {
  constructor(
    private readonly productionOrderService: ProductionOrderService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list/:userType')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { userType }: GetProductionOrderListParam,
    @Query() query: GetProductionOrderListQuery,
  ): Promise<ProductionOrderList> {
    return await this.productionOrderService.getProductionOrderList(
      runtimeSessionId,
      userType,
      query,
    );
  }
}
