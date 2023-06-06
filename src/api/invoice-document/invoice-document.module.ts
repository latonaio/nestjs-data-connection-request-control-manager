import { Module } from '@nestjs/common';
import { RedisModule } from '@shared/services/redis/redis.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import configuration from '@config/configuration';
import { InvoiceDocumentController } from './invoice-document.controller';
import { InvoiceDocumentService } from './invoice-document.service';
import { RabbitmqModule } from '@shared/services/rabbitmq/rabbitmq.module';
import { DetailModule } from './detail/detail.module';

@Module({
  imports: [
    RabbitmqModule,
    RedisModule,
    HttpModule,
    ConfigModule,
    NestConfigModule.forRoot({
    load: [configuration],
  }),
    DetailModule,
  ],
  controllers: [InvoiceDocumentController],
  providers: [InvoiceDocumentService],
})
export class InvoiceDocumentModule {}
