import { Param, Controller, Inject, Request, Post } from '@nestjs/common';
import { OdataService } from './odata.service';
import { v4 as uuidv4 } from 'uuid';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('odata')
export class OdataController {
  constructor(
    private readonly oDataService: OdataService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post(':api_service_name/:api_type')
  async postOdata(
    @Param('api_service_name') aPIServiceName: string,
    @Param('api_type') aPIType: string,
    @Request() req,
  ): Promise<Object> {
    const runtimeSessionId = uuidv4();
    this.logger.info(`Issuance of runtime session ID`, {
      runtimeSessionId,
      aPIServiceName,
      aPIType,
    });

    const jwtToken = req.headers.authorization.replace('Bearer ', '');
    return await this.oDataService.execute(aPIServiceName, aPIType, jwtToken, runtimeSessionId, req.body);
  }
}
