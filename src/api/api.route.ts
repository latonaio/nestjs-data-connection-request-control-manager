import { Routes } from 'nest-router';
import { ApiModuleRuntimesRoute } from './api-module-runtimes/api-module-runtimes.route';
import { BusinessUserRoute } from './business-user/business-user.route';
import { AuthRoute } from './auth/auth.route';
import { OrdersRoute } from './orders/orders.route';
// import { OrdersRoute, OrdersFunctionRoute } from './orders/orders.route';
import { DeliveryDocumentRoute } from './delivery-document/delivery-document.route';
import { InvoiceDocumentRoute } from './invoice-document/invoice-document.route';
import { ProductionOrderRoute } from './production-order/production-order.route';
import { ProductRoute } from './product/product.route';
import { BusinessPartnerRoute } from './business-partner/business-partner.route';
import { EquipmentRoute } from './equipment/equipment.route';
import { PriceMasterRoute } from './price-master/price-master.route';
import { BillOfMaterialRoute } from './bill-of-material/bill-of-material.route';
import { OperationsRoute } from './operations/operations.route';
import { SupplyChainRelationshipRoute } from './supply-chain-relationship/supply-chain-relationship.route';
import { WorkCenterRoute } from './work-center/work-center.route';

export const ApiRoutes: Routes = [
  {
    path: '/',
    children: [
      ProductRoute,
      OrdersRoute,
      // OrdersFunctionRoute,
      BusinessPartnerRoute,
      DeliveryDocumentRoute,
      InvoiceDocumentRoute,
      ProductionOrderRoute,
      BusinessUserRoute,
      EquipmentRoute,
      PriceMasterRoute,
      BillOfMaterialRoute,
      OperationsRoute,
      SupplyChainRelationshipRoute,
      WorkCenterRoute,
      AuthRoute,
      ApiModuleRuntimesRoute,
    ],
  },
];

