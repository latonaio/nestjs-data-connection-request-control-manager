import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserQuery } from '@shared/dtos/user-query.dto';

export class GetProductionVersionDetailListQuery extends UserQuery {
  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // isMarkedForDeletion: boolean;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  productionVersion: number;
}
