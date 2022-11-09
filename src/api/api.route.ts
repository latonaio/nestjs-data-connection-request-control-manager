import { Routes } from 'nest-router';
import { ApiModule } from './api.module';
import { OdataModule } from './odata/odata.module';
import { UserModule } from './user/user.module';

export const ApiRoutes: Routes = [
  {
    path: '/',
    module: ApiModule,
    children: [
      { path: '/odata', module: OdataModule },
      { path: '/user', module: UserModule },
    ],
  },
];
