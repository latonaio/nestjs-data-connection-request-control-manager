import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserQuery } from '@shared/dtos/user-query.dto';
import { UserTypes } from '../../enums';

export class GetSupplyChainRelationshipDetailParam {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  supplyChainRelationshipDeliveryId: number;

  @IsString()
  @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1))
  userType: UserTypes;
}

export class GetSupplyChainRelationshipDetailQuery extends UserQuery {
  @IsOptional()
  @IsString()
  content: string;
}
