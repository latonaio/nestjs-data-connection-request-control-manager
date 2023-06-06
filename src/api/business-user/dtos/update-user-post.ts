import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateUserPost {
  @IsEmail()
  emailAddress: string;

  @IsString()
  oldPassword: string;

  @IsString()
  password: string;

  @IsNumber()
  businessPartner: number;
}
