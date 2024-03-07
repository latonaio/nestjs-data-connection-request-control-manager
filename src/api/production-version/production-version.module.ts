import { Module } from '@nestjs/common';
import { ProductionVersionService } from './production-version.service';
import { ConfigModule } from '@config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import configuration from '@config/configuration';
import { ProductionVersionController } from './production-version.controller';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from '@shared/services/redis/redis.module';
import { RabbitmqModule } from '@shared/services/rabbitmq/rabbitmq.module';
import { PrismaModule } from '@shared/services/prisma/prisma.module';
import { DetailModule } from './detail/detail.module';

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
  controllers: [ProductionVersionController],
  providers: [ProductionVersionService],
})
export class ProductionVersionModule {}
