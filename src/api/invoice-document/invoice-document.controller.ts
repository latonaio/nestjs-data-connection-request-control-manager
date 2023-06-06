import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { InvoiceDocumentService } from './invoice-document.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import { GetInvoiceDocumentListParam, GetInvoiceDocumentListQuery } from './dtos';
import { InvoiceDocumentList } from '@shared/interfaces';

@Controller()
export class InvoiceDocumentController {
  constructor(
    private readonly invoiceService: InvoiceDocumentService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list/:userType')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { userType }: GetInvoiceDocumentListParam,
    @Query() query: GetInvoiceDocumentListQuery,
  ): Promise<InvoiceDocumentList> {
    return await this.invoiceService.getInvoiceDocumentList(
      runtimeSessionId,
      userType,
      query,
    );
  }
}
