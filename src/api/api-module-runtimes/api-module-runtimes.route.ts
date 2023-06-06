import { Route } from 'nest-router';
import { ApiModuleRuntimesModule } from './api-module-runtimes.module';

export const ApiModuleRuntimesRoute: Route = {
  path: '/',
  module: ApiModuleRuntimesModule,
};
