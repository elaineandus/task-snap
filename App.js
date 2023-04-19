import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoadingScreen, TodoScreen } from './src/screens';

const Stack = createNativeStackNavigator();
const App = ()=>{
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{title:null}}/>
        <Stack.Screen name="TodoScreen" component={TodoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App