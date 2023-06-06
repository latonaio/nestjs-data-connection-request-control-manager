import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { RuntimeSessionIdMiddleware } from './runtime-session-id.middleware';

@Module({
})
export class RuntimeSessionIdModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RuntimeSessionIdMiddleware).forRoutes('*');
  }
}
