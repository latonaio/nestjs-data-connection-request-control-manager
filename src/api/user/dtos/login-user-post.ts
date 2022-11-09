import { IsNumber, IsString } from 'class-validator';

export class LoginUserPost {
  @IsString()
  loginId: string;

  @IsString()
  password: string;

  @IsNumber()
  businessPartner: number;
}
