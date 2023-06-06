import { Route } from 'nest-router';
import { ProductModule } from './product.module';
import { DetailRoute } from './detail/detail.route';

export const ProductRoute: Route = {
  path: '/product',
  children: [
    DetailRoute,
    {
      path: '/',
      module: ProductModule,
    }
  ],
};
