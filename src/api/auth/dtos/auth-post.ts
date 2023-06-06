import { IsEmail, IsNumber, IsString } from 'class-validator';

export class AuthPost {
  @IsEmail()
  emailAddress: string;

  @IsString()
  password: string;
}
