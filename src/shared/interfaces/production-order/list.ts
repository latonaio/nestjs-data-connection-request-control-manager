interface ProductionOrderItem {
  ProductionOrder: number;
  MRPArea: number;
  Product: number;
  ProductName: number;
  OwnerProductionPlantBusinessPartner: number;
  OwnerProductionPlant: number;
  TotalQuantity: number;
  HeaderIsConfirmed: boolean;
  HeaderIsPartiallyConfirmed: boolean;
  HeaderIsReleased: boolean;
  IsCancelled: boolean;
  IsMarkedForDeletion: boolean;
}

class ProductionOrderList {
  productionOrders: ProductionOrderItem[];
}

export {
  ProductionOrderList,
}
