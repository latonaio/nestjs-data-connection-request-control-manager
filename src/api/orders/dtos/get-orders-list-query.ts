import { IsBoolean, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserQuery } from '@shared/dtos/user-query.dto';

export class GetOrdersListQuery extends UserQuery {
  @IsBoolean()
  @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  headerCompleteDeliveryIsDefined: boolean;

  @IsString()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  headerDeliveryStatus: string;

  @IsBoolean()
  @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  headerDeliveryBlockStatus: boolean;

  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // isCancelled: boolean;

  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // isMarkedForDeletion: boolean;
}
