import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserQuery } from '@shared/dtos/user-query.dto';

export class GetProductionOrderDetailListQuery extends UserQuery {
  @IsBoolean()
  @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  productionOrderIsReleased: boolean;

  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // isCancelled: boolean;

  @IsBoolean()
  @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  isMarkedForDeletion: boolean;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  productionOrder: number;
}
