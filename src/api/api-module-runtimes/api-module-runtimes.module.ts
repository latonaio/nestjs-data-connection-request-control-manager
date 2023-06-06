import { Module } from '@nestjs/common';
import { ApiModuleRuntimesController } from './api-module-runtimes.controller';
import { ApiModuleRuntimesService } from './api-module-runtimes.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@shared/services/prisma/prisma.module';
import { RabbitmqModule } from '@shared/services/rabbitmq/rabbitmq.module';
import { ConfigModule } from '@config/config.module';
import configuration from '@config/configuration';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { RedisModule } from '@shared/services/redis/redis.module';

@Module({
  imports: [RabbitmqModule, RedisModule, RabbitmqModule, PrismaModule, HttpModule, ConfigModule, NestConfigModule.forRoot({
    load: [configuration],
  })],
  controllers: [ApiModuleRuntimesController],
  providers: [ApiModuleRuntimesService],
})
export class ApiModuleRuntimesModule {}
