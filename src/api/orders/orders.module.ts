import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from '@config/configuration';
import { OrdersController } from './orders.controller';
import { HttpModule } from '@nestjs/axios';
import { DetailModule } from './detail/detail.module';
import { RedisModule } from '@shared/services/redis/redis.module';
import { RabbitmqModule } from '@shared/services/rabbitmq/rabbitmq.module';
import { PrismaModule } from '@shared/services/prisma/prisma.module';
import { SmtpModule } from '@shared/services/smtp/smtp.module';

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
    DetailModule,
    SmtpModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
