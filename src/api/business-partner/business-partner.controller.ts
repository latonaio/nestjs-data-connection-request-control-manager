import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { BusinessPartnerService } from './business-partner.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import { GetBusinessPartnerListParam, GetBusinessPartnerListQuery } from './dtos';
import { BusinessPartnerList } from '@shared/interfaces';

@Controller()
export class BusinessPartnerController {
  constructor(
    private readonly businessPartnerService: BusinessPartnerService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list/:userType')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { userType }: GetBusinessPartnerListParam,
    @Query() query: GetBusinessPartnerListQuery,
  ): Promise<BusinessPartnerList> {
    return await this.businessPartnerService.getBusinessPartnerList(
      runtimeSessionId,
      userType,
      query,
    );
  }
}
