import { Controller, Get, Inject, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RuntimeSessionId } from '@shared/decorators/runtime-sessionId.decorator';
import { GetDeliveryDocumentListParam, GetDeliveryDocumentListQuery } from './dtos';
import { DeliveryDocumentList } from '@shared/interfaces';
import { DeliveryDocumentService } from './delivery-document.service';
import { FileMetaInterceptor } from '@shared/utils/file-interceptor.utils';
import { RequestBody } from '@shared/decorators/request-body.decorator';
import { MethodTypes } from '@shared/enums/method-types';

@Controller()
export class DeliveryDocumentController {
  constructor(
    private readonly deliveryDocumentService: DeliveryDocumentService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create/csv')
  @UseInterceptors(new FileMetaInterceptor('csv', '/inputs/delivery-document/csv'))
  async create(
    @RuntimeSessionId() runtimeSessionId: string,
    @UploadedFile() file,
    @RequestBody() requestBody: any,
  ): Promise<Object> {
    return await this.deliveryDocumentService.createDeliveryDocumentCsv(
      runtimeSessionId,
      MethodTypes.Creates,
      'FUNCTION_DPFM_DELIVERY_DOCUMENT_CSV_READS',
      JSON.parse(requestBody.headerInfo),
      '/inputs/delivery-document/csv',
      'data-platform-api-delivery-document-csv-converter-queue',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('create/edi/csv')
  @UseInterceptors(new FileMetaInterceptor('csv', '/inputs/delivery-notice-edi-for-smes/csv'))
  async createNoticeEdi(
    @RuntimeSessionId() runtimeSessionId: string,
    @UploadedFile() file,
    @RequestBody() requestBody: any,
  ): Promise<Object> {
    return await this.deliveryDocumentService.createDeliveryDocumentCsv(
      runtimeSessionId,
      MethodTypes.Creates,
      'FUNCTION_DPFM_DELIVERY_NOTICE_EDI_FOR_SMES_CSV_READS',
      JSON.parse(requestBody.headerInfo),
      '/inputs/delivery-notice-edi-for-smes/csv',
      'data-platform-api-delivery-notice-edi-for-smes-csv-converter-queue',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('create/edi/voluntary-chain/csv')
  @UseInterceptors(new FileMetaInterceptor('csv', '/inputs/delivery-notice-edi-for-voluntary-chain-smes/csv'))
  async voluntaryChainCreate(
    @RuntimeSessionId() runtimeSessionId: string,
    @UploadedFile() file,
    @RequestBody() requestBody: any,
  ): Promise<Object> {
    return await this.deliveryDocumentService.createDeliveryDocumentCsv(
      runtimeSessionId,
      MethodTypes.Creates,
      'FUNCTION_DPFM_DELIVERY_NOTICE_EDI_FOR_VOLUNTARY_CHAIN_SMES_CSV_READS',
      JSON.parse(requestBody.headerInfo),
      '/inputs/delivery-notice-edi-for-voluntary-chain-smes/csv',
      'data-platform-api-delivery-notice-edi-for-voluntary-chain-smes-csv-converter-queue',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('create/edi/voluntary-chain/answer/csv')
  @UseInterceptors(new FileMetaInterceptor('csv', '/inputs/delivery-notice-edi-for-voluntary-chain-smes/csv'))
  async voluntaryChainAnswerCreate(
    @RuntimeSessionId() runtimeSessionId: string,
    @UploadedFile() file,
    @RequestBody() requestBody: any,
  ): Promise<Object> {
    return await this.deliveryDocumentService.createDeliveryDocumentCsv(
      runtimeSessionId,
      MethodTypes.Updates,
      'FUNCTION_DPFM_DELIVERY_NOTICE_EDI_FOR_VOLUNTARY_CHAIN_SMES_CSV_READS',
      JSON.parse(requestBody.headerInfo),
      '/inputs/delivery-notice-edi-for-voluntary-chain-smes/csv',
      'data-platform-api-delivery-notice-edi-for-voluntary-chain-smes-csv-converter-queue',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('list/:userType')
  async list(
    @RuntimeSessionId() runtimeSessionId: string,
    @Param() { userType }: GetDeliveryDocumentListParam,
    @Query() query: GetDeliveryDocumentListQuery,
  ): Promise<DeliveryDocumentList> {
    return await this.deliveryDocumentService.getDeliveryDocumentList(
      runtimeSessionId,
      userType,
      query,
    );
  }
}
