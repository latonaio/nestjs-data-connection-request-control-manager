import { Body, Controller, Inject, Post, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  // @Post('pdf')
  // async pdf(
  //   @Request() req,
  //   @Body() order: Object,
  // ): Promise<Object> {
  //   const runtimeSessionId = uuidv4();
  //   this.logger.info(`Issuance of runtime session ID`, {
  //     runtimeSessionId,
  //   });
  //
  //   const jwtToken = req.headers.authorization.replace('Bearer ', '');
  //   return this.orderService.create(runtimeSessionId, jwtToken, order);
  // }
}
