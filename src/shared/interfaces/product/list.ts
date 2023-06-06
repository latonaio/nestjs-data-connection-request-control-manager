import { ProductImage } from '@shared/interfaces';

type ProductItem = {
  Product: string;
  ProductDescription: string;
  ProductGroup: string;
  ProductGroupName: string;
  BaseUnit: string;
  ValidityStartDate: string;
  Images: ProductImage;
}

class ProductList {
  productLists: ProductItem[];
}

export {
  ProductList,
  ProductItem,
}
