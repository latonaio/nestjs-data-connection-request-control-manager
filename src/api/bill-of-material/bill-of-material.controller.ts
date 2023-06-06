import { Controller, Get, Inject, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import { GetBillOfMaterialListParam, GetBillOfMaterialListQuery } from './dtos';
import { BillOfMaterialList } from '@shared/interfaces';
import { BillOfMaterialService } from './bill-of-material.service';

@Controller()
export class BillOfMaterialController {
  constructor(
    private readonly billOfMaterialService: BillOfMaterialService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list/:userType')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { userType }: GetBillOfMaterialListParam,
    @Query() query: GetBillOfMaterialListQuery,
  ): Promise<BillOfMaterialList> {
    return await this.billOfMaterialService.getBillOfMaterialList(
      runtimeSessionId,
      userType,
      query,
    );
  }
}
