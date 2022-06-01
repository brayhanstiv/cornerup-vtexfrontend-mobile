export interface OrderForm {
  orderFormId: string;
  loggedIn: boolean;
  isCheckedIn: boolean;
  storeId: string;
  items: ProductShopping[];
}

export interface ProductShopping {
  skuId: string;
  name: string;
  image: string;
  price: number;
  sellingPrice: number;
  quantity: number,
  imageUrl: string,
}