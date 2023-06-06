import { Route } from 'nest-router';
import { OperationsModule } from './operations.module';

export const OperationsRoute: Route = {
  path: '/operations',
  children: [
    {
      path: '/',
      module: OperationsModule,
    }
  ],
};
