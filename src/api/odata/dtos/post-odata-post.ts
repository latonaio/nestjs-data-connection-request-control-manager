import { IsString } from 'class-validator';

export class PostOdataPost {
  @IsString()
  aPIServiceName: string;

  @IsString()
  aPIType: string;
}
