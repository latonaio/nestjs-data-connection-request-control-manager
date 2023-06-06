import { Route } from 'nest-router';
import { DeliveryDocumentModule } from './delivery-document.module';
import { DetailRoute } from './detail/detail.route';

export const DeliveryDocumentRoute: Route = {
  path: '/delivery-document',
  children: [
    DetailRoute,
    {
      path: '/',
      module: DeliveryDocumentModule,
    }
  ],
};
