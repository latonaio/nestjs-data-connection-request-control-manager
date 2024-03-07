import { ProductImage } from '@shared/interfaces';

interface SupplyChainRelationshipListItem {
  SupplyChainRelationshipID: number;
  Buyer: number;
  BuyerName: string;
  Seller: number;
  SellerName: string;
  Images: {
    Product: ProductImage;
  };
  IsMarkedForDeletion: boolean;
}

class SupplyChainRelationshipList {
  supplyChainRelationship: SupplyChainRelationshipListItem[];
}

export {
  SupplyChainRelationshipList,
  SupplyChainRelationshipListItem,
}
