import { Route } from 'nest-router';
import { EquipmentModule } from './equipment.module';

export const EquipmentRoute: Route = {
  path: '/equipment',
  children: [
    {
      path: '/',
      module: EquipmentModule,
    }
  ],
};
