/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './Components/Screens/MainScreen';
import LoginScreen from './Components/Screens/LoginScreen';
import JoinScreen from './Components/Screens/JoinScreen';
import SurveyScreen from './Components/Screens/SurveyScreen';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createNativeStackNavigator();
const url = 'http://ip주소:포트넘버'; //로컬서버 접속 url

function App(){         //navigation
  useEffect(()=>{
    AsyncStorage.setItem('url', url);
  },[]);
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
        }} 
        />
        <Stack.Screen
          name="Join"
          component={JoinScreen}
          options={{
            headerShown: false,
        }} 
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerShown: false,
        }} 
        />
        <Stack.Screen
          name="Survey"
          component={SurveyScreen}
          options={{
            headerShown: false,
        }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;