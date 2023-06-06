import { Route } from 'nest-router';
import { BillOfMaterialModule } from './bill-of-material.module';

export const BillOfMaterialRoute: Route = {
  path: '/bill-of-material',
  children: [
    {
      path: '/',
      module: BillOfMaterialModule,
    }
  ],
};
