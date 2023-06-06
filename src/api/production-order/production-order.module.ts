import { Module } from '@nestjs/common';
import { ProductionOrderService } from './production-order.service';
import { ConfigModule } from '@config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import configuration from '@config/configuration';
import { ProductionOrderController } from './production-order.controller';
import { HttpModule } from '@nestjs/axios';
import { DetailModule } from './detail/detail.module';
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
    DetailModule,
  ],
  controllers: [ProductionOrderController],
  providers: [ProductionOrderService],
})
export class ProductionOrderModule {}
