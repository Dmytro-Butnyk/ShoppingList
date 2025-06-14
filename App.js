import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ShoppingListProvider } from './context/ShoppingListContext';
import ListsScreen from './screens/ListsScreen';
import ListDetailScreen from './screens/ListDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ShoppingListProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ListsScreen">
            <Stack.Screen name="ListsScreen" component={ListsScreen} options={{ title: 'Списки покупок' }} />
            <Stack.Screen name="ListDetailScreen" component={ListDetailScreen} options={{ title: 'Деталі списку' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ShoppingListProvider>
  );
}
