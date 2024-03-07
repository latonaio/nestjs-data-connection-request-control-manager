import { Pagination } from '@shared/dtos/pagination.dto';
import { ProductImage } from '@shared/interfaces';

interface ProductionVersionImage extends ProductImage {}

interface ProductionVersionDetailListItem {
  ProductionVersion: number;
  ProductionVersionItem: number;
  Product: string;
  ProductDescription: string;
  OperationsText: string;
  Plant: string;
  BillOfMaterial: number;
  Operations: number;
  ValidityStartDate: string;
  IsMarkedForDeletion: boolean;
}

interface ProductionVersionDetailHeader {
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

class ProductionVersionDetailList extends Pagination {
  productionVersionDetailListItem: ProductionVersionDetailListItem[];
  productionVersionDetailListHeader: ProductionVersionDetailHeader;
}

export {
  ProductionVersionDetailList,
}
