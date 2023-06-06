import { Route } from 'nest-router';
import { InvoiceDocumentModule } from './invoice-document.module';
import { DetailRoute } from './detail/detail.route';

export const InvoiceDocumentRoute: Route = {
  path: '/invoice-document',
  children: [
    DetailRoute,
    {
      path: '/',
      module: InvoiceDocumentModule,
    }
  ],
}
