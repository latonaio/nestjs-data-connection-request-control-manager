import { IsNumber, IsString } from 'class-validator';

export class RegisterUserPost {
  @IsString()
  loginId: string;

  @IsString()
  password: string;

  @IsNumber()
  businessPartner: number
}
