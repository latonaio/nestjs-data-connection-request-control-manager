import { Controller, UseInterceptors, UploadedFile, Get, Inject, Query, Param, UseGuards, Post } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import { GetOrdersListQuery, GetOrdersListParam } from './dtos';
import { OrdersList } from '@shared/interfaces';
import { FileMetaInterceptor } from '@shared/utils/file-interceptor.utils';
import { MethodTypes } from '@shared/enums/method-types';
import { RequestBody } from '@shared/decorators/request-body.decorator';

@Controller()
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create/csv')
  @UseInterceptors(new FileMetaInterceptor('csv', '/inputs/orders/csv'))
  async create(
    @RuntimeSessionId() runtimeSessionId: string,
    @UploadedFile() file,
    @RequestBody() requestBody: any,
  ): Promise<Object> {
    return await this.ordersService.createOrdersCsv(
      runtimeSessionId,
      MethodTypes.Creates,
      'FUNCTION_DPFM_ORDERS_CSV_READS',
      JSON.parse(requestBody.headerInfo),
      '/inputs/orders/csv',
      'data-platform-api-orders-csv-converter-queue',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('create/edi/csv')
  @UseInterceptors(new FileMetaInterceptor('csv', '/inputs/orders-edi-for-smes/csv'))
  async ediCreate(
    @RuntimeSessionId() runtimeSessionId: string,
    @UploadedFile() file,
    @RequestBody() requestBody: any,
  ): Promise<Object> {
    return await this.ordersService.createOrdersCsv(
      runtimeSessionId,
      MethodTypes.Creates,
      'FUNCTION_DPFM_ORDERS_EDI_FOR_SMES_CSV_READS',
      JSON.parse(requestBody.headerInfo),
      '/inputs/orders-edi-for-smes/csv',
      'data-platform-api-orders-edi-for-smes-csv-converter-queue',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('create/edi/voluntary-chain/csv')
  @UseInterceptors(new FileMetaInterceptor('csv', '/inputs/orders-edi-for-voluntary-chain-smes/csv'))
  async voluntaryChainCreate(
    @RuntimeSessionId() runtimeSessionId: string,
    @UploadedFile() file,
    @RequestBody() requestBody: any,
  ): Promise<Object> {
    return await this.ordersService.createOrdersCsv(
      runtimeSessionId,
      MethodTypes.Creates,
      'FUNCTION_DPFM_ORDERS_EDI_FOR_VOLUNTARY_CHAIN_SMES_CSV_READS',
      JSON.parse(requestBody.headerInfo),
      '/inputs/orders-edi-for-voluntary-chain-smes/csv',
      'data-platform-api-orders-edi-for-voluntary-chain-smes-csv-converter-queue',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('create/edi/voluntary-chain/answer/csv')
  @UseInterceptors(new FileMetaInterceptor('csv', '/inputs/orders-edi-for-voluntary-chain-smes/csv'))
  async voluntaryChainAnswerCreate(
    @RuntimeSessionId() runtimeSessionId: string,
    @UploadedFile() file,
    @RequestBody() requestBody: any,
  ): Promise<Object> {
    return await this.ordersService.createOrdersCsv(
      runtimeSessionId,
      MethodTypes.Updates,
      'FUNCTION_DPFM_ORDERS_EDI_FOR_VOLUNTARY_CHAIN_SMES_CSV_READS',
      JSON.parse(requestBody.headerInfo),
      '/inputs/orders-edi-for-voluntary-chain-smes/csv',
      'data-platform-api-orders-edi-for-voluntary-chain-smes-csv-converter-queue',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('list/:userType')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { userType }: GetOrdersListParam,
    @Query() query: GetOrdersListQuery,
  ): Promise<OrdersList> {
    return await this.ordersService.getOrdersList(
      runtimeSessionId,
      userType,
      query,
    );
  }
}
