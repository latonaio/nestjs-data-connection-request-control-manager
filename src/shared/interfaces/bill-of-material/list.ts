import { ProductImage } from '@shared/interfaces';

interface BillOfMaterialImage extends ProductImage {}

interface BillOfMaterialListItem {
  Product: string;
  BillOfMaterial: number;
  ProductDescription: string;
  OwnerProductionPlant: string;
  OwnerProductionPlantName: string;
  ValidityStartDate: string;
  IsMarkedForDeletion: boolean;
  Images: {
    Product: BillOfMaterialImage;
  };
}

class BillOfMaterialList {
  billOfMaterialList: BillOfMaterialListItem[];
}

export {
  BillOfMaterialList,
}
