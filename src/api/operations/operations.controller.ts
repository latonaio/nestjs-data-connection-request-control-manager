import { Controller, Get, Inject, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import { GetOperationsListParam, GetOperationsListQuery } from './dtos';
import { OperationsList } from '@shared/interfaces';
import { OperationsService } from './operations.service';

@Controller()
export class OperationsController {
  constructor(
    private readonly operationsService: OperationsService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list/:userType')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { userType }: GetOperationsListParam,
    @Query() query: GetOperationsListQuery,
  ): Promise<OperationsList> {
    return await this.operationsService.getOperationsList(
      runtimeSessionId,
      userType,
      query,
    );
  }
}
