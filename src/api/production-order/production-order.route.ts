import { Route } from 'nest-router';
import { ProductionOrderModule } from './production-order.module';
import { DetailRoute } from './detail/detail.route';

export const ProductionOrderRoute: Route = {
  path: '/production-order',
  children: [
    DetailRoute,
    {
      path: '/',
      module: ProductionOrderModule,
    }
  ],
};
