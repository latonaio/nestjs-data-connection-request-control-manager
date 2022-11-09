import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { HttpStatus } from '@nestjs/common';

export interface Response<T> {
  statusCode: number,
  message: string,
  data: T;
}

@Injectable()
export class TransformationInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(response => ({
      statusCode: HttpStatus.OK,
      message: response.message,
      data: response.data,
    })));
  }
}
