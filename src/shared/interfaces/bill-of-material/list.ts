import { ProductImage } from '@shared/interfaces';

interface BillOfMaterialImage extends ProductImage {}

interface BillOfMaterialListItem {
  Product: string;
  BillOfMaterial: number;
  ProductDescription: string;
  OwnerPlant: string;
  IsMarkedForDeletion: boolean;
  Images: {
    BillOfMaterial: BillOfMaterialImage;
  };
}

class BillOfMaterialList {
  billOfMaterialList: BillOfMaterialListItem[];
}

export {
  BillOfMaterialList,
}
