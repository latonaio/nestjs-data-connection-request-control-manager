import { Module } from '@nestjs/common';
import { WorkCenterService } from './work-center.service';
import { ConfigModule } from '@config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import configuration from '@config/configuration';
import { WorkCenterController } from './work-center.controller';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from '@shared/services/redis/redis.module';
import { RabbitmqModule } from '@shared/services/rabbitmq/rabbitmq.module';
import { PrismaModule } from '@shared/services/prisma/prisma.module';

@Module({
  imports: [
    RabbitmqModule,
    RedisModule,
    HttpModule,
    PrismaModule,
    ConfigModule,
    NestConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [WorkCenterController],
  providers: [WorkCenterService],
})
export class WorkCenterModule {}
