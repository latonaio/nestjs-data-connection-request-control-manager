import { IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserQuery } from '@shared/dtos/user-query.dto';
import { UserTypes } from '../../enums';

export class GetProductionOrderDetailParam {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  productionOrder: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  productionOrderItem: number;

  @IsString()
  product: string;

  @IsString()
  @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1))
  userType: UserTypes;
}

export class GetProductionOrderDetailQuery extends UserQuery {
}
