import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class OrderService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
  }

  async create(runtimeSessionId: string, jwtToken: string, bodyParams: Object): Promise<Object> {
    await this.verifyToken(jwtToken);

    await this.send(runtimeSessionId, bodyParams);

    this.logger.debug(`Sent pdf data`, {
      runtimeSessionId,
    });

    return {
      statusCode: 200,
      message: 'Order created successfully',
      data: {
        runtimeSessionId,
      },
    };
  }

  private async send(runtimeSessionId: string, bodyParams: any) {
    const url = `http://${process.env.DATA_PLATFORM_API_ORDERS_CREATES_PDF_HOST}:${process.env.DATA_PLATFORM_API_ORDERS_CREATES_PDF_PORT}/order/pdf`;
    await firstValueFrom(this.httpService.post(
      url,
      {
        runtime_session_id: runtimeSessionId,
        pdf_data: bodyParams.pdf_data,
        queue_message: JSON.stringify(bodyParams),
        order_id: bodyParams.order_id,
      },
    ));
  }

  private async verifyToken(jwtToken: string): Promise<{ status: string, loginId: String }> {
    const url = `http://${process.env.AUTHENTICATOR_HOST}:${process.env.AUTHENTICATOR_PORT}/token/verify`;
    const result: any = await firstValueFrom(this.httpService.post(
      url,
      {},
      { headers: { 'Authorization': `Bearer ${jwtToken}` } },
    ));

    return {
      status: String(result.request.res.statusCode),
      loginId: result.data,
    };
  }
}
