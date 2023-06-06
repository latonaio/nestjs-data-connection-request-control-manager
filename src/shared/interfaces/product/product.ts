interface AvailabilityStock {
  ProductStock: number;
  StorageLocation: string;
}

interface Stock {
  ProductStock: number;
  StorageLocation: string;
}

interface Allergen {
  AllergenName: string;
  AllergenIsContained: boolean;
}

interface ProductInfo {
  KeyName: string;
  Key: string;
  Value: string | Object;
}

interface ProductTag {
  Key: string;
  Doc_count: number;
}

interface ProductImage {
  BusinessPartnerID: number;
  DocID: string;
  FileExtension: string;
}

interface BarcodeImage {
  Id: string;
  Barcode: string;
  BarcodeType: string;
}

interface Quantity {
  Quantity: number;
  Unit: string;
}

interface ProductDetail {
  ProductName: string;
  ProductCode: string;
  ProductInfo: ProductInfo[];
  ProductTag: ProductTag[];
  Images: {
    Product: ProductImage;
    Barcode: BarcodeImage;
  }
  Stock: Stock;
  AvailabilityStock: AvailabilityStock;
  OrderQuantityInDelivery: Quantity;
  OrderQuantityInBase: Quantity;
  ConfirmedOrderQuantityByPDTAvailCheck: Quantity;
  Allergen: Allergen[];
}

export type {
  AvailabilityStock,
  Stock,
  Allergen,
  ProductInfo,
  Quantity,
  ProductTag,
  ProductImage,
  BarcodeImage,
  ProductDetail,
}
