import { Route } from 'nest-router';
import { ProductionVersionModule } from './production-version.module';
import { DetailRoute } from './detail/detail.route';

export const ProductionVersionRoute: Route = {
  path: '/production-version',
  children: [
    DetailRoute,
    {
      path: '/',
      module: ProductionVersionModule,
    }
  ],
};
