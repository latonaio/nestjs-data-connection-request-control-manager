import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserTypes } from '../../enums';

export class GetOrdersDetailListParam {
  @IsString()
  @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1))
  userType: UserTypes;
}
