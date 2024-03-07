import { Route } from 'nest-router';
import { OperationsModule } from './operations.module';
import { DetailRoute } from './detail/detail.route';

export const OperationsRoute: Route = {
  path: '/operations',
  children: [
    DetailRoute,
    {
      path: '/',
      module: OperationsModule,
    }
  ],
};
