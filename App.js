import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreens from './src/components/ContactDetail';
import { Provider } from 'react-redux';
import {store} from './src/redux/store';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Contact">
          <Stack.Screen name="Contact" component={HomeScreen} />
          <Stack.Screen 
          name="DetailScreen" 
          component={DetailScreens} 
          options={({route}) => ({
            data: route.params,
          })} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
