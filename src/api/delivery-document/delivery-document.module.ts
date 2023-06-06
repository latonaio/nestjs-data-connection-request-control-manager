import { Module } from '@nestjs/common';
import { DeliveryDocumentService } from './delivery-document.service';
import { ConfigModule } from '@config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import configuration from '@config/configuration';
import { DeliveryDocumentController } from './delivery-document.controller';
import { HttpModule } from '@nestjs/axios';
import { DetailModule } from './detail/detail.module';
import { RedisModule } from '@shared/services/redis/redis.module';
import { RabbitmqModule } from '@shared/services/rabbitmq/rabbitmq.module';
import { SmtpModule } from '@shared/services/smtp/smtp.module';
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
    SmtpModule,
  ],
  controllers: [DeliveryDocumentController],
  providers: [DeliveryDocumentService],
})
export class DeliveryDocumentModule {}
