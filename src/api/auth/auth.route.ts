import { Route } from 'nest-router';
import { AuthModule } from './auth.module';

export const AuthRoute: Route = {
  path: '/DPFM_AUTH_AUTHENTICATOR_SRV',
  module: AuthModule,
};
