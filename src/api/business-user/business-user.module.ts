import { Module } from '@nestjs/common';
import { BusinessUserController} from './business-user.controller';
import { BusinessUserService } from './business-user.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import configuration from '@config/configuration';

@Module({
  imports: [HttpModule, ConfigModule, NestConfigModule.forRoot({
    load: [configuration],
  })],
  controllers: [BusinessUserController],
  providers: [BusinessUserService],
})
export class BusinessUserModule {}
