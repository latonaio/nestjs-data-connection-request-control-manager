import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { OdataService } from './odata/odata.service';
import { OdataController } from './odata/odata.controller';

@Module({
  imports: [PrismaModule, HttpModule, ConfigModule.forRoot()],
  controllers: [AppController, OdataController],
  providers: [AppService, OdataService],
})
export class AppModule {}
