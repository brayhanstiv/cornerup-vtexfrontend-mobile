import { Product } from "../interfaces/product.model";

export const getProducts = async () => {
  try {
    const res = await fetch('https://cornerup.myvtex.com/api/catalog_system/pub/products/search');
    const data: Product[] = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}