import { Route } from 'nest-router';
import { DetailModule } from './detail.module';

export const DetailRoute: Route = {
  path: '/detail',
  module: DetailModule,
};
