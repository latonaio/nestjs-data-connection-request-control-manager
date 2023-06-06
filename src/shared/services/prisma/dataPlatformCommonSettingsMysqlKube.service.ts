import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
import { PrismaClient as DataPlatformCommonSettingsMysqlKube } from '@prisma/generated/dataPlatformCommonSettingsMysqlKube';

@Injectable()
export class PrismaService extends DataPlatformCommonSettingsMysqlKube
  implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    super(
      {
        datasources: {
          db: { url: configService.get('mysql').dataPlatformCommonSettingsMysqlKube.url },
        },
      },
    );
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.info(`Connected to database`, {
      name: 'dataPlatformCommonSettingsMysqlKube'
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.info(`Connected to database`, {
      name: 'dataPlatformCommonSettingsMysqlKube'
    });
  }
}
