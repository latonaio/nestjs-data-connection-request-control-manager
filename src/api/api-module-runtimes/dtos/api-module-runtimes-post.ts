import { IsString } from 'class-validator';

export class ApiModuleRuntimesPost {
  @IsString()
  aPIServiceName: string;

  @IsString()
  aPIType: string;
}
