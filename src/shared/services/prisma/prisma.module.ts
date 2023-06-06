import { Module } from '@nestjs/common';
import { PrismaService as DataPlatformCommonSettingsMysqlKube } from './dataPlatformCommonSettingsMysqlKube.service';
import { PrismaService as DataPlatformAuthenticatorMysqlKube } from './dataPlatformAuthenticatorMysqlKube.service';
import { ConfigModule } from '@config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import configuration from '@config/configuration';

@Module({
  imports: [ConfigModule, NestConfigModule.forRoot({
    load: [configuration],
  })],
  providers: [
    DataPlatformCommonSettingsMysqlKube,
    DataPlatformAuthenticatorMysqlKube,
  ],
  exports: [
    DataPlatformCommonSettingsMysqlKube,
    DataPlatformAuthenticatorMysqlKube
  ],
})
export class PrismaModule {}
