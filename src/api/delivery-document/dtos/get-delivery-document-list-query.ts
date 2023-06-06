import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserQuery } from '@shared/dtos/user-query.dto';

export class GetDeliveryDocumentListQuery extends UserQuery {
  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // headerCompleteDeliveryIsDefined: boolean;

  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // headerDeliveryStatus: boolean;

  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // headerBillingStatus: boolean;
  //
  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // headerDeliveryBlockStatus: boolean;
  //
  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // headerIssuingBlockStatus: boolean;
  //
  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // headerReceivingBlockStatus: boolean;
  //
  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // headerBillingBlockStatus: boolean;

  @IsString()
  headerBillingStatusException: string;

  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // isCancelled: boolean;

  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // isMarkedForDeletion: boolean;
}
