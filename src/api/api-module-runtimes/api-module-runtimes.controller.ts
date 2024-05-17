import { Param, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiModuleRuntimesService } from './api-module-runtimes.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { ApiModuleRuntimesPost } from './dtos';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import { RequestBody } from '@shared/decorators/request-body.decorator';

@Controller()
export class ApiModuleRuntimesController {
  constructor(
    private readonly apiModuleRuntimesService: ApiModuleRuntimesService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Post(':aPIServiceName/:aPIType')
  async postApiModuleRuntimes(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { aPIServiceName, aPIType }: ApiModuleRuntimesPost,
    @RequestBody() requestBody: any,
  ): Promise<Object> {
    return await this.apiModuleRuntimesService.execute(aPIServiceName, aPIType, runtimeSessionId, requestBody);
  }
}
