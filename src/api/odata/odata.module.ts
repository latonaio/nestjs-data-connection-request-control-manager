import { Module } from '@nestjs/common';
import { OdataController } from './odata.controller';
import { OdataService } from './odata.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@shared/services/prisma/prisma.module';
import { ConfigModule } from '@config/config.module';
import configuration from '@config/configuration';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { RabbitmqService} from '@shared/services/rabbitmq/rabbitmq.service';

@Module({
  imports: [PrismaModule, HttpModule, ConfigModule, NestConfigModule.forRoot({
    load: [configuration],
  })],
  controllers: [OdataController],
  providers: [OdataService, RabbitmqService],
})
export class OdataModule {}
