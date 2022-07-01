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

// Add Client Profile
export const addClientProfile = async (ofid: string, body: any) => {
  const url = _orderRequest(`/${ofid}/attachments/clientProfileData`);
  const encodedJson = JSON.stringify({
    'email': body.email,
    'firstName': body.firstName,
    'lastName': body.lastName,
    'documentType': body.documentType,
    'document': body.document,
    'phone': body.phone,
  });

  await fetch(
    url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: encodedJson,
  }
  );
}

// Add Shipping Address
export const addShippingAddress = async (ofid: string, body: any) => {
  const url = _orderRequest(`/${ofid}/attachments/shippingData`);
  const encodedJson = JSON.stringify({
    'paymentSysytem': body.paymentSystem,
    'city': body.city,
    'state': body.state,
    'country': body.country,
    'complement': body.complement,
  });

  await fetch(
    url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: encodedJson,
  }
  );
}

// Add Payment Data
export const addPaymentData = async (ofid: string, body: any) => {
  const url = _orderRequest(`/${ofid}/attachments/paymentData`);
  const encodedJson = JSON.stringify({
    "payments": [
      {
        "hasDefaultBillingAddress": true,
        "installmentsInterestRate": null,
        "referenceValue": 8106000,
        "bin": null,
        "accountId": null,
        "value": 8106000,
        "tokenId": null,
        "paymentSystem": "2",
        "installments": null
      }
    ],
    "giftCards": [
      {
        "id": "_1867",
        "redemptionCode": "WBKY-WDHH-FBKE-VLBE",
        "value": 4893000,
        "balance": 4893000,
        "name": null,
        "inUse": true,
        "isSpecialCard": false,
        "provider": "VtexGiftCard"
      }
    ],
    "expectedOrderFormSections": [
      "items",
      "totalizers",
      "clientProfileData",
      "shippingData",
      "paymentData",
      "sellers",
      "messages",
      "marketingData",
      "clientPreferencesData",
      "storePreferencesData",
      "giftRegistryData",
      "ratesAndBenefitsData",
      "openTextField",
      "commercialConditionData",
      "customData"
    ]
  });

  await fetch(
    url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: encodedJson,
  }
  );
}

// Place order from an existing cart
export const createOrder = async (ofid: string, body: any) => {
  const url = _orderRequest(`/${ofid}/transaction`);
  const encodedJson = JSON.stringify({
    "referenceId": ofid,
    "savePersonalData": false,
    "optinNewsLetter": false,
    "value": 6800,
    "referenceValue": 6800,
    "interestValue": 0
  });

  await fetch(
    url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: encodedJson,
  }
  );
}

// Add Payment Transaction
export const addPaymentTransaction = async (transactionId: string) => {
  const url = `https://cornerup.myvtex.com/api/pub/transactions/${transactionId}/payments`;
  const encodedJson = JSON.stringify({
    "paymentSystem": "201",
    "paymentSystemName": "Pago contra entrega",
    "group": "custom201PaymentGroupPaymentGroup",
    "installments": 1,
    "installmentsInterestRate": 0,
    "installmentsValue": 11000000,
    "value": 11000000,
    "referenceValue": 11000000,
    "fields": {
      "holderName": "Andres Ramirez",
      "cardNumber": "4111 1111 1111 1111",
      "validationCode": "231",
      "dueDate": "12/22",
      "addressId": "1620245085681"
    },
    "transaction": {
      "id": "AAFF95C0345E4349A44AFC9AEA5D1D01",
      "merchantName": "EXPERIMENTALITY"
    },
    "currencyCode": "COP"
  });

  await fetch(
    url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: encodedJson,
  }
  );
}

// Process order
export const processOrder = async (orderGroup: string) => {
  const url = `https://cornerup.myvtex.com/api/checkout/pub/gatewayCallback/${orderGroup}`;

  await fetch(
    url, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  }
  );
}