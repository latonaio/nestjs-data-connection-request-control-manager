import { Pagination } from '@shared/dtos/pagination.dto';
import { ProductImage } from '@shared/interfaces';

interface BillOfMaterialDetailListItem {
  BillOfMaterialItem: number;
  ComponentProduct: string;
  BillOfMaterialItemText: string;
  StockConfirmationPlantName: string;
  StockConfirmationPlant: string;
  ComponentProductStandardQuantityInBaseUnuit: number;
  ComponentProductBaseUnit: string;
  ValidityStartDate: string;
  IsMarkedForDeletion: boolean;
}

interface BillOfMaterialDetailHeader {
  Product: string;
  BillOfMaterial: number;
  ProductDescription: string;
  OwnerProductionPlant: string;
  OwnerProductionPlantName: string;
  ValidityStartDate: string;
  IsMarkedForDeletion: boolean;
  Images: {
    Product: ProductImage;
  };
}

class BillOfMaterialDetailList extends Pagination {
  billOfMaterialDetailList: BillOfMaterialDetailListItem[];
  billOfMaterialDetailListHeader: BillOfMaterialDetailHeader;
}

export {
  BillOfMaterialDetailList,
  BillOfMaterialDetailHeader,
}
