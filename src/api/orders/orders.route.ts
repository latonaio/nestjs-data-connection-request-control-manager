import { Route } from 'nest-router';
import { OrdersModule } from './orders.module';
import { DetailRoute } from './detail/detail.route';

export const OrdersRoute: Route = {
  path: '/orders',
  children: [
    DetailRoute,
    {
      path: '/',
      module: OrdersModule,
    }
  ],
};

// export const OrdersFunctionRoute: Route = {
//   path: '/FUNCTION_DPFM_ORDERS_CSV_READS',
//   children: [
//     DetailRoute,
//     {
//       path: '/',
//       module: OrdersModule,
//     }
//   ],
// };

