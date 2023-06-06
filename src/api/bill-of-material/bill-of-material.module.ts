import { Module } from '@nestjs/common';
import { BillOfMaterialService } from './bill-of-material.service';
import { ConfigModule } from '@config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import configuration from '@config/configuration';
import { BillOfMaterialController } from './bill-of-material.controller';
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
  controllers: [BillOfMaterialController],
  providers: [BillOfMaterialService],
})
export class BillOfMaterialModule {}
