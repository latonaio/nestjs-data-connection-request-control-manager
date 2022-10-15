import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@config/config.module';
import { OdataService } from './api/odata/odata.service';
import { OdataController } from './api/odata/odata.controller';
import { OdataModule } from './api/odata/odata.module';
import { UserController } from './api/user/user.controller';
import { UserService } from './api/user/user.service';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [PrismaModule, HttpModule, ConfigModule, OdataModule, UserModule],
  controllers: [AppController, OdataController, UserController],
  providers: [AppService, OdataService, UserService],
})
export class AppModule {
}
