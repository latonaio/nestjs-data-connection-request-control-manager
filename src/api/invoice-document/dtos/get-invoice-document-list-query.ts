import { IsBoolean, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserQuery } from '@shared/dtos/user-query.dto';

export class GetInvoiceDocumentListQuery extends UserQuery {
  @IsBoolean()
  @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  headerPaymentBlockStatus: boolean;

  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // isCancelled: boolean;
}
