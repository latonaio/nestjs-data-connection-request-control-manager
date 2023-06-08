import { Controller, Get, Inject, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import { GetSupplyChainRelationshipListParam, GetSupplyChainRelationshipListQuery } from './dtos';
import { SupplyChainRelationshipList } from '@shared/interfaces';
import { SupplyChainRelationshipService } from './supply-chain-relationship.service';

@Controller()
export class SupplyChainRelationshipController {
  constructor(
    private readonly supplyChainRelationshipService: SupplyChainRelationshipService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list/:userType')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { userType }: GetSupplyChainRelationshipListParam,
    @Query() query: GetSupplyChainRelationshipListQuery,
  ): Promise<SupplyChainRelationshipList> {
    return await this.supplyChainRelationshipService.getSupplyChainRelationshipList(
      runtimeSessionId,
      userType,
      query,
    );
  }
}
