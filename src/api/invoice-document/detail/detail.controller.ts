import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { DetailService } from './detail.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import {
  GetInvoiceDocumentDetailListParam,
  GetInvoiceDocumentDetailListQuery,
} from './dtos';
import { InvoiceDocumentDetailList } from '@shared/interfaces';

@Controller()
export class DetailController {
  constructor(
    private readonly detailService: DetailService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list/:userType')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { userType }: GetInvoiceDocumentDetailListParam,
    @Query() query: GetInvoiceDocumentDetailListQuery,
  ): Promise<InvoiceDocumentDetailList> {
    return await this.detailService.getInvoiceDocumentDetailList(
      runtimeSessionId,
      userType,
      query,
    );
  }
}
