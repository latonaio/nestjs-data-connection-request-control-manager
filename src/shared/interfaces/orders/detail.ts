import {
  ProductDetail,
} from '../product';
import { Pagination } from '@shared/dtos/pagination.dto';

interface OrdersDetailListItem {
  OrderID?: number;
  OrderItem: number;
  Product: string;
  OrderItemTextByBuyer: string;
  OrderItemTextBySeller: string;
  OrderQuantityInDeliveryUnit: string;
  DeliveryUnit: string;
  ConditionRateValue: string;
  RequestedDeliveryDate: string;
  NetAmount: string;
  IsCancelled: boolean;
  SupplyChainRelationshipID: number;
  PricingProcedureCounter: number;
}

interface OrdersDetailHeader {
  OrderID: number;
  SellerName: string;
  Seller: number;
  BuyerName: string;
  Buyer: number;
  DeliveryStatus: string;
  OrderDate: string;
  PaymentTerms: string;
  PaymentTermsName: string;
  PaymentMethod: string;
  PaymentMethodName: string;
  TransactionCurrency: string;
  OrderType: string;
}


interface OrdersProductDetail extends ProductDetail {
  Popup: {
    RequestedDeliveryDate: string;
    ConfirmedDeliveryDate: string;
    OrderQuantityInBaseUnit: number;
    BaseUnit: string;
    OrderQuantityInDeliveryUnit: number;
    DeliveryUnit: string;
    ConfirmedOrderQuantityByPDTAvailCheckInBaseUnit: number;
    DeliverToPlantBatch: string;
    BatchMgmtPolicyInDeliverToPlant: string;
    DeliverToPlantBatchValidityStartDate: string;
    DeliverToPlantBatchValidityStartTime: string;
    DeliverToPlantBatchValidityEndDate: string;
    DeliverToPlantBatchValidityEndTime: string;
    DeliverFromPlantBatch: string;
    BatchMgmtPolicyInDeliverFromPlant: string;
    DeliverFromPlantBatchValidityStartDate: string;
    DeliverFromPlantBatchValidityStartTime: string;
    DeliverFromPlantBatchValidityEndDate: string;
    DeliverFromPlantBatchValidityEndTime: string;
  }
}

interface OrdersDetailPagination {
  Paginations: {
    OrderID: number;
    OrderItem: number;
    Product: string;
  }[];
}

interface PaymentTerms {
  PaymentTerms: string;
  PaymentTermsName: string;
}

interface PaymentMethod {
  PaymentMethod: string;
  PaymentMethodName: string;
}

interface Currency {
  Currency: string;
  CurrencyName: string;
}

interface QuantityUnit {
  QuantityUnit: string;
  QuantityUnitName: string;
}

class OrdersDetail {
  ordersDetail: OrdersProductDetail;
}

class OrdersPagination {
  ordersDetailPagination: OrdersDetailPagination;
}

class OrdersDetailList extends Pagination {
  ordersDetailList: OrdersDetailListItem[];
  ordersDetailHeader: OrdersDetailHeader[] | undefined;
  paymentTerms: PaymentTerms[];
  paymentMethod: PaymentMethod[];
  currency: Currency[];
  quantityUnit: QuantityUnit[];
}

export {
  OrdersDetailList,
  OrdersDetail,
  OrdersPagination,
}
