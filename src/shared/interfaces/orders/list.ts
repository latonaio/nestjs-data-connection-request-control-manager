interface OrdersItem {
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
  IsCancelled: boolean;
  IsMarkedForDeletion: boolean;
}

interface BuyerItem extends OrdersItem {
}

interface SellerItem extends OrdersItem {
}

class OrdersList {
  ordersList: BuyerItem[] | SellerItem[];
}

export {
  OrdersList,
}
