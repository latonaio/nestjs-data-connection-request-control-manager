import { Pagination } from '@shared/dtos/pagination.dto';
import {
  ProductImage,
  BarcodeImage,
} from '@shared/interfaces/product/product';

interface ProductionOrderDetailListItem {
  ProductionOrder: number;
  ProductionOrderItem: number;
  Product: string;
  ProductName: string;
  OrderItemTextBySeller: string;
  TotalQuantity: number;
  ConfirmedYieldQuantity: number;
  ItemIsConfirmed: boolean;
  ItemIsPartiallyConfirmed: boolean;
  ItemIsReleased: boolean;
  IsCancelled: boolean;
  MRPArea: string;
}

interface ProductionOrderDetailHeader {
  ProductionOrder: number;
  MRPArea: string;
  Product: string;
  ProductName: string;
  OwnerProductionPlantBusinessPartner: string;
  OwnerProductionPlant: string;
  TotalQuantity: number;
  HeaderIsConfirmed: boolean;
  HeaderIsPartiallyConfirmed: boolean;
  HeaderIsReleased: boolean;
  IsCancelled: boolean;
  IsMarkedForDeletion: boolean;
}

interface ProductionOrderItem {
  ProductionOrder: number;
  ProductionOrderItem: number;
  OrderItemText: string;
  Product: string;
  ProductName: string;
  MRPArea: string;
  ProductionVersion: number;
  MinimumLotSizeQuantity: number;
  MaximumLotSizeQuantity: number;
  LosSizeRoundingQuantity: number;
  ProductionOrderPlannedStartDate: string;
  ProductionOrderPlannedStartTime: string;
  ProductionOrderPlannedEndDate: string;
  ProductionOrderPlannedEndTime: string;
  ProductionOrderActualStartDate: string;
  ProductionOrderActualStartTime: string;
  ProductionOrderActualEndDate: string;
  ProductionOrderActualEndTime: string;
  TotalQuantity: string;
  PlannedScrapQuantity: string;
  ConfirmedYieldQuantity: string;
  ProductionPlant: string;
  ProductionPlantStorageLocation: string;
  BillOfMaterialItem: string;
  Components: ComponentItem[];
  Operations: OperationItem[];
  Images: {
    Product: ProductImage;
    Barcode: BarcodeImage;
  };
}

interface OperationItem {
  OperationText: string
  WorkCenter: number
  OperationPlannedTotalQuantity: number
  OperationTotalConfirmedYieldQuantity: number
  OperationErlstSchedldExecStrtDte: string
  OperationErlstSchedldExecStrtTme: string
  OperationErlstSchedldExecEndDate: string
  OperationErlstSchedldExecEndTime: any
  OperationActualExecutionStartDate: string
  OperationActualExecutionStartTime: string
  OperationActualExecutionEndDate: string
  OperationActualExecutionEndTime: string
}

interface ComponentItem {
  ComponentProduct: string;
  ComponentProductRequirementDate: string;
  ComponentProductRequirementTime: string;
  RequiredQuantity: number;
  WithdrawnQuantity: number;
  BaseUnit: string;
  CostingPolicy: string;
  StandardPrice: number;
  MovingAveragePrice: number;
}

interface ProductionOrderDetailPagination {
  Paginations: {
    ProductionOrder: number;
    ProductionOrderItem: number;
    Product: string;
  }[];
}

class ProductionOrderDetailList extends Pagination {
  productionOrderDetailList: ProductionOrderDetailListItem[];
  productionOrderDetailHeader: ProductionOrderDetailHeader;
}

class ProductionOrderPagination {
  productionOrderDetailPagination: ProductionOrderDetailPagination;
}

class ProductionOrderDetail extends Pagination {
  productionOrderDetail: ProductionOrderItem;
}

export {
  ProductionOrderDetailList,
  ProductionOrderDetail,
  ProductionOrderPagination,
}
