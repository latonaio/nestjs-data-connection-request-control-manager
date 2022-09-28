import { Param, Controller, Get, Request } from '@nestjs/common';
import { OdataService } from './odata.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('odata')
export class OdataController {
  constructor(
    private readonly oDataService: OdataService,
  ) {}

  @Get(':api_service_name/:api_type')
  async getOdata(
    @Param('api_service_name') aPIServiceName: string,
    @Param('api_type') aPIType: string,
    @Request() req,
  ): Promise<Object> {
    const sequenceId = uuidv4();
    const jwtToken = req.headers.authorization.replace('Bearer ', '');
    return await this.oDataService.getOdata(aPIServiceName, aPIType, jwtToken, sequenceId);
  }
}
