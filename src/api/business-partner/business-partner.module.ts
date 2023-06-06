import { Module } from '@nestjs/common';
import { RedisModule } from '@shared/services/redis/redis.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import configuration from '@config/configuration';
import { BusinessPartnerController } from './business-partner.controller';
import { BusinessPartnerService } from './business-partner.service';
import { RabbitmqModule } from '@shared/services/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    RabbitmqModule,
    RedisModule,
    HttpModule,
    ConfigModule,
    NestConfigModule.forRoot({
    load: [configuration],
  }),
    // DetailModule,
  ],
  controllers: [BusinessPartnerController],
  providers: [BusinessPartnerService],
})
export class BusinessPartnerModule {}
