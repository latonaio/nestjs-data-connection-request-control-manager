import { Controller, Get, Inject, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import { GetWorkCenterListParam, GetWorkCenterListQuery } from './dtos';
import { WorkCenterList } from '@shared/interfaces';
import { WorkCenterService } from './work-center.service';

@Controller()
export class WorkCenterController {
  constructor(
    private readonly workCenterService: WorkCenterService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list/:userType')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { userType }: GetWorkCenterListParam,
    @Query() query: GetWorkCenterListQuery,
  ): Promise<WorkCenterList> {
    return await this.workCenterService.getWorkCenterList(
      runtimeSessionId,
      userType,
      query,
    );
  }
}
