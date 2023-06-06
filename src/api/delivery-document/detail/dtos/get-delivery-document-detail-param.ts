import { IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserQuery } from '@shared/dtos/user-query.dto';
import { UserTypes } from '../../enums';

export class GetDeliveryDocumentDetailParam {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  deliveryDocument: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  deliveryDocumentItem: number;

  @IsString()
  product: string;

  @IsString()
  @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1))
  userType: UserTypes;
}

export class GetDeliveryDocumentDetailQuery extends UserQuery {
}
