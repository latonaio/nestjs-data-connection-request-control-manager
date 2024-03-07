import { ProductItem } from './list';

interface ProductDetailExconfListItem {
  Content: string;
  Exist: boolean;
  Param: unknown[];
}

class ProductDetailExconfList {
  productDetailExconfListHeader: ProductItem;
  productDetailExconfList: {
    Product: string;
    Existences: ProductDetailExconfListItem[];
  };
}

export {
  ProductDetailExconfList,
}
