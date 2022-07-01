import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { CartScreen, OrderScreen, PaymentScreen, ShippingScreen } from "../screens";

const { Navigator, Screen } = createStackNavigator();

export type StackNavigationParams = {
  'Cart': undefined;
  'Order': undefined;
  'Shipping': undefined;
  'Payment Method': undefined;
}

const StackNavigator = () => {
  return (
    <Navigator initialRouteName='Cart'>
      <Screen name="Cart" component={CartScreen} />
      <Screen name='Order' component={OrderScreen} />
      <Screen name='Shipping' component={ShippingScreen} />
      <Screen name='Payment Method' component={PaymentScreen} />
    </Navigator>
  )
}

export default StackNavigator;