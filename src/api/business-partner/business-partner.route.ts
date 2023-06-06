import { Route } from 'nest-router';
import { BusinessPartnerModule } from './business-partner.module';

export const BusinessPartnerRoute: Route = {
  path: '/business-partner',
  children: [
    {
      path: '/',
      module: BusinessPartnerModule,
    }
  ],
}
