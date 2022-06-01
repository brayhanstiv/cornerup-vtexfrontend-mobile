// Packages
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './src/navigation/bottomTab';

// Screens
import { HomeScreen, CartScreen } from './src/screens';

// Types
import { rootStackParams } from './src/types/screens.type';

const { Navigator, Screen } = createNativeStackNavigator<rootStackParams>();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab></BottomTab>
    </NavigationContainer>
  );
}
