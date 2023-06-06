import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RuntimeSessionIdMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  use(req: Request, _res: Response, next: NextFunction) {
    const runtimeSessionId = uuidv4().replace(/-/gi, '');
    req.headers['runtime-session-id'] = runtimeSessionId;

    this.logger.info(`Issuance of runtime session ID`, {
      runtimeSessionId,
      method: req.method,
      url: req.originalUrl,
    });

    next();
  }
}
