import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { AxiosError } from 'axios';
import { ApiProcessingResultException } from '@shared/filters/api-processing-result-error.filter';

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

    if (this.isAxiosError(exception)) {
      const name = 'http request exception';
      const statusCode = exception.response?.status || 500;
      const message = exception.response?.data?.message || 'Internal Server Error';

      return response.status(statusCode).json({
        statusCode,
        name,
        message,
        data: data,
      });
    }

    if (exception instanceof BadRequestException) {
      const name = 'Request validation exception';
      const statusCode = 400;
      const badRequestException = exception.getResponse() as any;
      const errors = badRequestException?.message?.map((error: any) => {
        return error.constraints
      })

      return response.status(statusCode).json({
        statusCode,
        name,
        message,
        errors,
      });
    }

    if (exception instanceof ApiProcessingResultException) {
      return response.status(statusCode).json({
        ...data,
      });
    }

    if (exception instanceof NotFoundException) {
      return response.status(400).json({
        statusCode: 400,
        name: exception.name,
        message: exception.message,
      });
    }

    if (!statusCode) {
      const name = 'unknown exception';
      const statusCode = 500;
      const message = 'Internal Server Error';

      return response.status(statusCode).json({
        statusCode,
        name,
        message,
        data: data,
      });
    }

    return response.status(statusCode).json({
      statusCode,
      name,
      message,
      data: data,
    });
  }

  private extractExceptionData(exception: Error) {
    const { statusCode, name, message, data } = exception as any;
    return { statusCode, name, message, data };
  }

  private isAxiosError(error: any): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
  }
}
