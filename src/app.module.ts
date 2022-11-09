import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { ApiRoutes } from './api/api.route';
import { RouterModule } from 'nest-router';

@Module({
  imports: [RouterModule.forRoutes(ApiRoutes), ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
