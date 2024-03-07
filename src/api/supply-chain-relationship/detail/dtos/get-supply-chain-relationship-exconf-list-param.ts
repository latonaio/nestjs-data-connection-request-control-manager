import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserTypes } from '../../enums';

export class GetSupplyChainRelationshipExconfListParam {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  supplyChainRelationshipDeliveryId: number;

  @IsString()
  @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1))
  userType: UserTypes;
}
