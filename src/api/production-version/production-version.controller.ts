import { Controller, Get, Inject, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import { GetProductionVersionListParam, GetProductionVersionListQuery } from './dtos';
import { ProductionVersionList } from '@shared/interfaces';
import { ProductionVersionService } from './production-version.service';

@Controller()
export class ProductionVersionController {
  constructor(
    private readonly productionVersionService: ProductionVersionService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list/:userType')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { userType }: GetProductionVersionListParam,
    @Query() query: GetProductionVersionListQuery,
  ): Promise<ProductionVersionList> {
    return await this.productionVersionService.getProductionVersionList(
      runtimeSessionId,
      userType,
      query,
    );
  }
}
