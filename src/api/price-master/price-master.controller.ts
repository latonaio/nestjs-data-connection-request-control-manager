import { Controller, Get, Inject, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import { GetPriceMasterListParam, GetPriceMasterListQuery } from './dtos';
import { PriceMasterList } from '@shared/interfaces';
import { PriceMasterService } from './price-master.service';

@Controller()
export class PriceMasterController {
  constructor(
    private readonly priceMasterService: PriceMasterService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list/:userType')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { userType }: GetPriceMasterListParam,
    @Query() query: GetPriceMasterListQuery,
  ): Promise<PriceMasterList> {
    return await this.priceMasterService.getPriceMasterList(
      runtimeSessionId,
      userType,
      query,
    );
  }
}
