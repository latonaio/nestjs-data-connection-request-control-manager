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
import { OrderController } from './api/order/order.controller';
import { OrderService } from './api/order/order.service';
import { OrderModule } from './api/order/order.module';

@Module({
  imports: [PrismaModule, HttpModule, ConfigModule, OdataModule, UserModule, OrderModule],
  controllers: [AppController, OdataController, UserController, OrderController],
  providers: [AppService, OdataService, UserService, OrderService],
})
export class AppModule {
}
