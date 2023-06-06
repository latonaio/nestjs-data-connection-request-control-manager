import { Route } from 'nest-router';
import { PriceMasterModule } from './price-master.module';

export const PriceMasterRoute: Route = {
  path: '/price-master',
  children: [
    {
      path: '/',
      module: PriceMasterModule,
    }
  ],
};
