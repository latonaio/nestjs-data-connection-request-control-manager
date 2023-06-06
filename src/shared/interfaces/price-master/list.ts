interface PriceMasterItem {
  SupplyChainRelationship: number;
  Buyer: String;
  BuyerName: String;
  Seller: String;
  SellerName: String;
  IsMarkedForDeletion: boolean;
}

class PriceMasterList {
  priceMasterList: PriceMasterItem[];
}

export {
  PriceMasterList,
}
