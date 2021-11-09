/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './Components/Screens/MainScreen';
import LoginScreen from './Components/Screens/LoginScreen';
import JoinScreen from './Components/Screens/JoinScreen';
import SurveyScreen from './Components/Screens/SurveyScreen';
import Iamport from './IamportComponents/App';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
} from 'react-native';
const Stack = createNativeStackNavigator();
const url = 'http://192.168.203.2:8000'; //로컬서버 접속 url

function App(){         //navigation
  const [userID, setUserID] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    AsyncStorage.setItem('url', url);
    async function getStorage(){
      if(await AsyncStorage.getItem("userID")){
        let tempUserID = await AsyncStorage.getItem("userID");
        console.log(tempUserID, '하하');
        setUserID(tempUserID);
      }
      setLoading(true);
    }
    getStorage();

  }, []);
  
  if(loading === false){
    return(
      <View style={{flex: 1,}}>
      </View>
    );
  }
  else if(userID === '' && loading === true){
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
            name="Survey"
            component={SurveyScreen}
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
            name="Iamport"
            component={Iamport}
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
        </Stack.Navigator>
      </NavigationContainer>
    ); 
  }else if(loading === true){
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{
              headerShown: false,
          }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;