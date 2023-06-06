import { IsBoolean, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserQuery } from '@shared/dtos/user-query.dto';

export class GetInvoiceDocumentDetailListQuery extends UserQuery {
  @IsBoolean()
  @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  itemPaymentBlockStatus: boolean;

  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // isCancelled: boolean;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  invoiceDocument: number;
}
