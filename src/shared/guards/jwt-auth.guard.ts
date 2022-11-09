import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { JwtAuthenticationException } from '@shared/filters/jwt-authentication-exception.filter';
import { HttpStatus } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    const jwtToken = headers?.authorization?.replace('Bearer ', '');
    const { url } = this.configService.get('authenticator');

    try {
      await firstValueFrom(this.httpService.post(
        `${url}/token/verify`,
        {},
        { headers: { 'Authorization': `Bearer ${jwtToken}` } },
      ));
    } catch (e) {
      if (!e.request?.res?.statusCode) {
        throw e;
      }

      // todo it must define to rules for authenticator server error pattern.
      if (e.request?.res?.statusCode !== HttpStatus.OK) {
        this.logger.error(`JWT Token is invalid`, {
          statusCode: e.request?.res?.statusCode,
          statusMessage: e.request?.res?.statusMessage,
        });
        throw new JwtAuthenticationException(`JWT Token is invalid`);
      }
    }

    return true;
  }
}
