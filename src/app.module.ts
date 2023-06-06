import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { ApiRoutes } from './api/api.route';
import { RouterModule } from 'nest-router';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RuntimeSessionIdModule } from '@shared/middleware/runtime-session-id.module';
import * as configurations from '@config/configuration';

const configuration = configurations.default();

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    RouterModule.forRoutes(ApiRoutes),
    ApiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', configuration.storage.imageStoragePath),
      serveStaticOptions: {
        redirect: false,
        index: false
      },
    }),
    RuntimeSessionIdModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
