import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
import { PrismaClient as DataPlatformAuthenticatorMysqlKube } from '@prisma/generated/dataPlatformAuthenticatorMysqlKube';

@Injectable()
export class PrismaService extends DataPlatformAuthenticatorMysqlKube
  implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    super(
      {
        datasources: {
          db: { url: configService.get('mysql').dataPlatformAuthenticatorMysqlKube.url },
        },
      },
    );
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.info(`Connected to database`, {
      name: 'dataPlatformAuthenticatorMysqlKube'
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.info(`Disconnected to database`, {
      name: 'dataPlatformAuthenticatorMysqlKube'
    });
  }
}
