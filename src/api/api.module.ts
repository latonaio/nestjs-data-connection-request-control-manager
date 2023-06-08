import { Module } from '@nestjs/common';
import { ApiModuleRuntimesModule } from './api-module-runtimes/api-module-runtimes.module';
import { BusinessUserModule } from './business-user/business-user.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { ProductionOrderModule } from './production-order/production-order.module';
import { DeliveryDocumentModule } from './delivery-document/delivery-document.module';
import { InvoiceDocumentModule } from './invoice-document/invoice-document.module';
import { ProductModule } from './product/product.module';
import { BusinessPartnerModule } from './business-partner/business-partner.module';
import { EquipmentModule } from './equipment/equipment.module';
import { PriceMasterModule } from './price-master/price-master.module';
import { BillOfMaterialModule } from './bill-of-material/bill-of-material.module';
import { OperationsModule } from './operations/operations.module';
import { SupplyChainRelationshipModule } from './supply-chain-relationship/supply-chain-relationship.module';
import { WorkCenterModule } from './work-center/work-center.module';

@Module({
  imports: [
    BusinessUserModule,
    AuthModule,
    ApiModuleRuntimesModule,
    OrdersModule,
    ProductionOrderModule,
    DeliveryDocumentModule,
    InvoiceDocumentModule,
    ProductModule,
    BusinessPartnerModule,
    EquipmentModule,
    PriceMasterModule,
    BillOfMaterialModule,
    OperationsModule,
    SupplyChainRelationshipModule,
    WorkCenterModule,
  ],
})
export class ApiModule {}
