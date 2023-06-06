import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ConfigModule } from '@config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import configuration from '@config/configuration';

@Module({
  imports: [ConfigModule, NestConfigModule.forRoot({
    load: [configuration],
  })],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
