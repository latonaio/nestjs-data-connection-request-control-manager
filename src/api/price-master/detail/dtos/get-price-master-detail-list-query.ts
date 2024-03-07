import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserQuery } from '@shared/dtos/user-query.dto';

export class GetPriceMasterDetailListQuery extends UserQuery {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  supplyChainRelationshipId: number;
}
