import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as configurations from '@config/configuration';

@Injectable()
export class FileMetaInterceptor implements NestInterceptor {
  constructor(
    private readonly extension: string,
    private readonly fieldPath: string,
  ) {}

  intercept<T = ExecutionContext, R = CallHandler>(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<R> | Promise<Observable<R>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const runtimeSessionId = req.headers['runtime-session-id'];
    const configuration = configurations.default();
    const generateFileName = (req, file, cb) => {
      cb(null, `${runtimeSessionId}.${this.extension}`);
    }

    const fileInterceptor = FileInterceptor('file', {
      storage: diskStorage({
        destination: join(
          __dirname,
          '../../..',
          this.fieldPath,
        ),
        filename: generateFileName,
      })
    });

    const fileInt = new fileInterceptor();

    return fileInt.intercept(context, next);
  }
}
