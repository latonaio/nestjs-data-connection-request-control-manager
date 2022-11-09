import { IsNumber, IsString } from 'class-validator';

export class UpdateUserPost {
  @IsString()
  loginId: string;

  @IsString()
  oldPassword: string;

  @IsString()
  password: string;

  @IsNumber()
  businessPartner: number;
}
