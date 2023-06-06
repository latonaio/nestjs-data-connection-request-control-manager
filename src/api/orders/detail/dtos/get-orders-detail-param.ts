import { IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserQuery } from '@shared/dtos/user-query.dto';
import { UserTypes } from '../../enums';

export class GetOrdersDetailParam {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  orderId: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  orderItem: number;

  @IsString()
  product: string;

  @IsString()
  @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1))
  userType: UserTypes;
}

export class GetOrdersDetailQuery extends UserQuery {
}
