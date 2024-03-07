import { Route } from 'nest-router';
import { PriceMasterModule } from './price-master.module';
import { DetailRoute } from './detail/detail.route';

export const PriceMasterRoute: Route = {
  path: '/price-master',
  children: [
    DetailRoute,
    {
      path: '/',
      module: PriceMasterModule,
    }
  ],
};
