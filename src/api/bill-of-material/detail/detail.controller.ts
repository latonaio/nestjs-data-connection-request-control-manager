import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { DetailService } from './detail.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import {
  GetBillOfMaterialDetailListQuery,
  GetBillOfMaterialDetailListParam,
} from './dtos';
import { BillOfMaterialDetailList } from '@shared/interfaces';

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
    @Param() { userType }: GetBillOfMaterialDetailListParam,
    @Query() query: GetBillOfMaterialDetailListQuery,
  ): Promise<BillOfMaterialDetailList> {
    return await this.detailService.getBillOfMaterialDetailList(
      runtimeSessionId,
      userType,
      query,
    );
  }
}
