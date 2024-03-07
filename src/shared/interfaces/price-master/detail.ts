import { Pagination } from '@shared/dtos/pagination.dto';

interface PriceMasterDetailListItem {
  SupplyChainRelationshipID: number;
  Buyer: number;
  Seller: number;
  ConditionRecord: number;
  ConditionSequentialNumber: number;
  ConditionValidityEndDate: string;
  ConditionValidityStartDate: string;
  Product: string;
  ConditionType: string;
  CreationDate: string;
  LastChangeDate: string;
  ConditionRateValue: number;
  ConditionRateValueUnit: string;
  ConditionScaleQuantity: number;
  ConditionRateRatio: number;
  ConditionRateRatioUnit: string;
  ConditionCurrency: string;
  BaseUnit: string;
  ConditionIsDeleted: boolean;
}

interface PriceMasterDetailHeader {
  SupplyChainRelationshipID: number;
  Buyer: number;
  BuyerName: string;
  Seller: number;
  SellerName: string;
}

class PriceMasterDetailList extends Pagination {
  priceMasterDetailList: PriceMasterDetailListItem[];
  priceMasterDetailListHeader: PriceMasterDetailHeader;
}

export {
  PriceMasterDetailList,
}
