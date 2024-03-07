import { Route } from 'nest-router';
import { BillOfMaterialModule } from './bill-of-material.module';
import { DetailRoute } from './detail/detail.route';

export const BillOfMaterialRoute: Route = {
  path: '/bill-of-material',
  children: [
    DetailRoute,
    {
      path: '/',
      module: BillOfMaterialModule,
    }
  ],
};
