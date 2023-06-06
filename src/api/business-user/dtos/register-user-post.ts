import { IsEmail, IsNumber, IsString } from 'class-validator';

export class RegisterUserPost {
  @IsEmail()
  emailAddress: string;

  @IsString()
  password: string;

  @IsNumber()
  businessPartner: number;

  @IsString()
  businessPartnerName: string;

  @IsString()
  businessUserFirstName: string;

  @IsString()
  businessUserLastName: string;

  @IsString()
  businessUserFullName: string;

  @IsString()
  language: string;
}
