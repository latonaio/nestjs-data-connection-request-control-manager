import {
  ProductDetail,
  Quantity,
} from '@shared/interfaces';
import { Pagination } from '@shared/dtos/pagination.dto';

interface DeliveryDocumentDetailListItem {
  DeliveryDocumentItem: number;
  Product: string;
  DeliveryDocumentItemText: string;
  OriginalQuantityInDeliveryUnit: number;
  DeliveryUnit: string;
  ActualGoodsIssueDate: string;
  ActualGoodsIssueTime: string;
  ActualGoodsReceiptDate: string;
  ActualGoodsReceiptTime: string;
  OrdersDetailJumpReq: {
    OrderID: number;
    OrderItem: number;
    Product: string;
  }
  IsCancelled: boolean;
}

interface DeliveryDocumentDetailHeader {
  DeliverFromParty: number
  DeliverFromPlantName: string
  DeliverToParty: number
  DeliverToPlantName: string
  DeliveryDocument: number
  HeaderBillingStatus: string
  HeaderDeliveryStatus: string
  PlannedGoodsReceiptDate: string
  PlannedGoodsReceiptTime: string
}

class DeliveryDocumentDetailList extends Pagination {
  deliveryDocumentDetailList: DeliveryDocumentDetailListItem[];
  deliveryDocumentDetailHeader: DeliveryDocumentDetailHeader[];
}

interface DeliveryDocumentDetail extends ProductDetail {
  DeliveryDocument: string;
  DeliveryDocumentItem: string;
  ActualGoodsIssueDate: string;
  ActualGoodsIssueTime: string;
  ActualGoodsReceiptDate: string;
  ActualGoodsReceiptTime: string;
  PlannedGoodsIssueDate: string;
  PlannedGoodsIssueTime: string;
  BestByDate: string;
  ExpirationDate: string;
  ShelfNumber: string;
  PlannedGoodsReceiptDate: string;
  PlannedGoodsReceiptTime: string;
  StorageLocationFullName: string;
  PlannedGoodsIssueQuantity: Quantity;
  PlannedGoodsReceiptQuantity: Quantity;
  PlannedGoodsIssueQtyInBaseUnit: Quantity;
  PlannedGoodsReceiptQtyInBaseUnit: Quantity;
  ActualGoodsIssueQuantity: Quantity;
  ActualGoodsReceiptQuantity: Quantity;
  ActualGoodsIssueQtyInBaseUnit: Quantity;
  ActualGoodsReceiptQtyInBaseUnit: Quantity;
  StorageBin: string;
  DeliverToPlantBatchValidityStartDate: string;
  DeliverToPlantBatchValidityStartTime: string;
  DeliverToPlantBatchValidityEndDate: string;
  DeliverToPlantBatchValidityEndTime: string;
  DeliverToPlantBatch: string;
  BatchMgmtPolicyInDeliverToPlant: string;
  DeliverFromPlantBatchValidityStartDate: string;
  DeliverFromPlantBatchValidityStartTime: string;
  DeliverFromPlantBatchValidityEndDate: string;
  DeliverFromPlantBatchValidityEndTime: string;
  DeliverFromPlantBatch: string;
  BatchMgmtPolicyInDeliverFromPlant: string;
}

interface DeliveryDocumentDetailPagination {
  Paginations: {
    DeliveryDocument: number;
    DeliveryDocumentItem: number;
    Product: string;
  }[];
}


class DeliveryDocumentDetail {
  deliveryDocumentDetail: DeliveryDocumentDetail;
}

class DeliveryDocumentPagination {
  deliveryDocumentDetailPagination: DeliveryDocumentDetailPagination;
}

export {
  DeliveryDocumentDetail,
  DeliveryDocumentDetailList,
  DeliveryDocumentPagination,
}
