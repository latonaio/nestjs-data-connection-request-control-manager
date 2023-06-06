import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule } from '@config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import configuration from '@config/configuration';
import { RabbitmqModule } from '@shared/services/rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitmqModule, ConfigModule, NestConfigModule.forRoot({
    load: [configuration],
  })],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
