import { Route } from 'nest-router';
import { BusinessUserModule } from './business-user.module';

export const BusinessUserRoute: Route = {
  path: '/DPFM_API_BUSINESS_USER_SRV',
  module: BusinessUserModule,
};
