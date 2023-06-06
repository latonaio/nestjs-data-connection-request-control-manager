import { Module } from '@nestjs/common';
import { DetailService } from './detail.service';
import { DetailController } from './detail.controller';
import { RedisModule } from '@shared/services/redis/redis.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from '@config/configuration';
import { RabbitmqModule } from '@shared/services/rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitmqModule, RedisModule, HttpModule, ConfigModule, NestConfigModule.forRoot({
    load: [configuration],
  })],
  controllers: [DetailController],
  providers: [DetailService],
})
export class DetailModule {}
