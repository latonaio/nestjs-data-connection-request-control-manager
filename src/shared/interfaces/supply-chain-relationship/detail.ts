import { SupplyChainRelationshipListItem } from '@shared/interfaces';

interface SupplyChainRelationshipDetailItem {
  Content: string;
  Param: unknown[];
}

interface SupplyChainRelationshipDetailExconfListItem {
  Content: string;
  Exist: boolean;
  Param: unknown[];
}

class SupplyChainRelationshipDetailExconfList {
  supplyChainRelationshipDetailExconfListHeader: SupplyChainRelationshipListItem;
  supplyChainRelationshipDetailExconfList: {
    SupplyChainRelationshipID: number;
    Existences: SupplyChainRelationshipDetailExconfListItem[];
  };
}

class SupplyChainRelationshipDetail {
  supplyChainRelationshipDetailHeader: SupplyChainRelationshipListItem;
  supplyChainRelationshipDetail: {
    SupplyChainRelationshipID: number;
    Contents: SupplyChainRelationshipDetailItem[];
  }
}

export {
  SupplyChainRelationshipDetailExconfList,
  SupplyChainRelationshipDetail,
}
