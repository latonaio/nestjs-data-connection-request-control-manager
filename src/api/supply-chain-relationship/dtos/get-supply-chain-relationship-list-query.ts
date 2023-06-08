import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserQuery } from '@shared/dtos/user-query.dto';

export class GetSupplyChainRelationshipListQuery extends UserQuery {
  // @IsBoolean()
  // @Transform(({ value }) => value.toLowerCase() === 'true' || value === '1')
  // isMarkedForDeletion: boolean;
}
