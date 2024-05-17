import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { JwtAuthenticationException } from '@shared/filters/jwt-authentication-exception.filter';
import { HttpStatus } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { RedisService } from '@shared/services/redis/redis.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
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
      // todo token の有効期限が切れてから redis の cache が削除されるまでの時間が有効になってしまうので後で検討する
      // そもそも browser 側でも1時間で token を削除するため処理が必要か要検討
      if (await this.redisService.getTokenCacheSync(jwtToken)) {
        return true;
      }

      await firstValueFrom(this.httpService.post(
        `${url}/token/verify`,
        {},
        { headers: { 'Authorization': `Bearer ${jwtToken}` } },
      ));

      await this.redisService.setTokenCacheSync(
        jwtToken,
        { token: jwtToken }
      );
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
