export interface Product {
  productId: string;
  productName: string;
  description: string;
  items: Item[];
}

interface Item {
  itemId: string;
  name: string;
  images: Image[];
  sellers: Seller[];
}

interface Image {
  imageId: string;
  imageTag: string;
  imageUrl: string;
  imageText: string;
}

interface Seller {
  sellerId: string;
  sellerName: string;
  commertialOffer: CommertialOffer;
}

interface CommertialOffer {
  Price: number;
  ListPrice: number;
  PriceWithoutDiscount: number;
  AvailableQuantity: number;
  IsAvailable: boolean;
  Tax: number;
}