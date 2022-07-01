// Packages
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import { HomeScreen } from '../screens';
import StackNavigator from './stack-navigator';

const { Navigator, Screen } = createBottomTabNavigator();

export type BottomTabParams = {
  'Home': undefined;
  'Cart': undefined;
}

const BottomTabNavigation = () => {
  return (
    <Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#10C9FF',
        tabBarInactiveTintColor: 'grey'
      }}
    >
      <Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} size={size} color={color} />
          },
        }}
      />
      <Screen
        name='Cart'
        component={StackNavigator}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return <Ionicons name={focused ? 'ios-cart' : 'ios-cart-outline'} size={size} color={color} />
          },
          headerShown: false
        }}
      />
    </Navigator>
  )
}

export default BottomTabNavigation