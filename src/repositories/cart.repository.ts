import AsyncStorage from '@react-native-async-storage/async-storage';
import { OrderForm, ProductShopping } from '../interfaces/orderForm.model';

// Get url
export const _orderRequest = (route: string = '') => {
  const url = `https://cornerup.myvtex.com/api/checkout/pub/orderForm${route}`;
  return url;
}

// Make request
const _makeShoppingBagRequest = async (url: string, body: any) => {
  const encodedJson = JSON.stringify({
    'orderItems': [body]
  });

  const response = await fetch(
    url, {
    method: "POST",
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: encodedJson
  }
  );
  return response;
}

// Get Order Form Id
export const getOrderFormId = async () => {
  let orderFormId = await AsyncStorage.getItem('orderFormId');
  if (orderFormId === "null" || orderFormId === null) {
    orderFormId = await _getNewOrderFormId();
  }

  return orderFormId;
}

// Get New Order Form Id
export const _getNewOrderFormId = async () => {
  let orderFormId: string;
  try {
    const url = _orderRequest();
    const res = await fetch(url)
    const data: OrderForm = await res.json();
    orderFormId = data.orderFormId;
    await AsyncStorage.setItem('orderFormId', orderFormId);
    return orderFormId;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Get Order Form By Id
export const getOrderForm = async (ofid: string) => {
  try {
    const url = _orderRequest(`/${ofid}`);
    const res = await fetch(url);
    const orderForm: OrderForm = await res.json();
    return orderForm;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Add New Product to the cart
export const addShoppingBagItem = async (
  ofid: string,
  skuId: string,
  quantity: number,
) => {
  try {
    const url = _orderRequest(`/${ofid}/items`);
    const body = { 'id': skuId, 'quantity': quantity, 'seller': 1 };
    await _makeShoppingBagRequest(url, body);
  } catch (e) {
    console.error(e);
  }
}

// Modify Item Quantity
export const modifyShoppingBagItemQuantity = async (
  ofid: string,
  index: number,
  quantity: number
) => {
  try {
    const url = _orderRequest(`/${ofid}/items/update`);
    const body = { "quantity": quantity, "index": index };
    const res = await _makeShoppingBagRequest(url, body);
    const data: OrderForm = await res.json();
    const shoppingItem: ProductShopping = data.items[index];
    return shoppingItem.quantity;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Remove Item
export const removeShoppingBagItem = async (ofid: string, index: number) => {
  try {
    const url = _orderRequest(`/${ofid}/items/update`);
    const body = { 'quantity': 0, 'index': index };
    await applyCoupon(ofid, '');
    return await _makeShoppingBagRequest(url, body);
  } catch (e) {
    console.error(e);
  }
}

// Apply coupon
export const applyCoupon = async (
  ofid: string,
  coupon: string,
) => {
  const url = _orderRequest(`/${ofid}/coupons`)
  const encodedJson = JSON.stringify({
    'text': coupon,
  });

  await fetch(
    url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: encodedJson,
  }
  );
}