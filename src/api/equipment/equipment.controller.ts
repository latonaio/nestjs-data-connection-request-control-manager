import { Controller, Get, Inject, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import { GetEquipmentListParam, GetEquipmentListQuery } from './dtos';
import { EquipmentList } from '@shared/interfaces';
import { EquipmentService } from './equipment.service';

@Controller()
export class EquipmentController {
  constructor(
    private readonly equipmentService: EquipmentService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list/:userType')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { userType }: GetEquipmentListParam,
    @Query() query: GetEquipmentListQuery,
  ): Promise<EquipmentList> {
    return await this.equipmentService.getEquipmentList(
      runtimeSessionId,
      userType,
      query,
    );
  }
}
