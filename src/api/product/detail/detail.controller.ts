import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { DetailService } from './detail.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import {
  GetProductDetailExconfListParam,
  GetProductDetailExconfListQuery,
} from './dtos';
import {
  ProductDetailExconfList,
} from '@shared/interfaces';

@Controller()
export class DetailController {
  constructor(
    private readonly detailService: DetailService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get('exconf/list/:userType/:product')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { product, userType }: GetProductDetailExconfListParam,
    @Query() query: GetProductDetailExconfListQuery,
  ) : Promise<ProductDetailExconfList> {
    return await this.detailService.getProductDetailExconfList(
      runtimeSessionId,
      product,
      userType,
      query,
    );
  }
}
