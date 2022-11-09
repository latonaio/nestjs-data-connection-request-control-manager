import { Param, Controller, Inject, Request, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { OdataService } from './odata.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { PostOdataPost } from './dtos';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import { RequestBody } from '@shared/decorators/request-body.decorator';

@Controller()
export class OdataController {
  constructor(
    private readonly oDataService: OdataService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':aPIServiceName/:aPIType')
  async postOdata(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { aPIServiceName, aPIType }: PostOdataPost,
    @RequestBody() requestBody: any,
  ): Promise<Object> {
    this.logger.info(`Issuance of runtime session ID`, {
      runtimeSessionId,
      aPIServiceName,
      aPIType,
    });

    return await this.oDataService.execute(aPIServiceName, aPIType, runtimeSessionId, requestBody);
  }
}
