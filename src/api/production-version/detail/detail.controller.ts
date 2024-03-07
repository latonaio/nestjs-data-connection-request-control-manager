import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { DetailService } from './detail.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import {
  GetProductionVersionDetailListParam,
  GetProductionVersionDetailListQuery,
} from './dtos';
import {
  ProductionVersionDetailList,
} from '@shared/interfaces';

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
    @Param() { userType }: GetProductionVersionDetailListParam,
    @Query() query: GetProductionVersionDetailListQuery,
  ): Promise<ProductionVersionDetailList> {
    return await this.detailService.getProductionVersionDetailList(
      runtimeSessionId,
      userType,
      query,
    );
  }
}
