import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import { HttpModule } from '@nestjs/axios';
import configuration from '@config/configuration';

@Module({
  imports: [HttpModule, ConfigModule, NestConfigModule.forRoot({
    load: [configuration],
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
