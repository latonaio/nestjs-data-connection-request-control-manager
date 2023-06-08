import { Route } from 'nest-router';
import { WorkCenterModule } from './work-center.module';

export const WorkCenterRoute: Route = {
  path: '/work-center',
  children: [
    {
      path: '/',
      module: WorkCenterModule,
    }
  ],
};
