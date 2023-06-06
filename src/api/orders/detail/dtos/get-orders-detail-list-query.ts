import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserQuery } from '@shared/dtos/user-query.dto';

export class GetOrdersDetailListQuery extends UserQuery {
  @IsBoolean()
  @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  itemCompleteDeliveryIsDefined: boolean;

  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // itemDeliveryStatus: boolean;

  @IsBoolean()
  @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  itemDeliveryBlockStatus: boolean;

  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // isCancelled: boolean;

  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // isMarkedForDeletion: boolean;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  orderId: number;
}
