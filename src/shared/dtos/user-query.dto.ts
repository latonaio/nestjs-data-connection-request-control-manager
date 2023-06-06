import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserQuery {
  @IsString()
  language?: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  businessPartner?: number;

  @IsString()
  userId?: string;

  @IsString()
  @IsOptional()
  responseReceiveQueue?: string;
}
