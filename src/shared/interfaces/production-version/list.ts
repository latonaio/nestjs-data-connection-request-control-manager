import { ProductImage } from '@shared/interfaces';

interface ProductionVersionImage extends ProductImage {}

interface ProductionVersionListItem {
  Product: string;
  ProductionVersion: number;
  ProductDescription: string;
  OwnerPlant: string;
  BillOfMaterial: number;
  IsMarkedForDeletion: boolean;
  Images: {
    Product: ProductionVersionImage;
  };
}

class ProductionVersionList {
  productionVersions: ProductionVersionListItem[];
}

export {
  ProductionVersionList,
}
