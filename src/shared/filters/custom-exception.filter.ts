import {
  ArgumentsHost,
  Catch,
  ExceptionFilter, Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { statusCode, name, message, data } = this.extractExceptionData(exception);

    this.logger.error(`${ message }`, JSON.stringify({ name, message, ...data }));

    response.status(statusCode).json({
      statusCode,
      name,
      message: message,
      data: data,
    });
  }

  private extractExceptionData(exception: Error) {
    const { statusCode, name, message, data } = exception as any;
    return { statusCode, name, message, data };
  }
}
