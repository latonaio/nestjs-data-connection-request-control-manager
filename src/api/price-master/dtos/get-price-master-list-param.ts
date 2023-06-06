import { IsString } from 'class-validator';
import { UserTypes } from '../enums';
import { Transform } from 'class-transformer';

export class GetPriceMasterListParam {
  @IsString()
  @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1))
  userType: UserTypes;
}
