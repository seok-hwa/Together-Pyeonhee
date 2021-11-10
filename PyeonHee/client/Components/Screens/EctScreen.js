import React, { Component, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import LogoutButton from '../Buttons/LogoutButton';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPageScreen from './MyPageScreen';
import EctSelectScreen from './EctSelectScreen';
import {
    View,
  } from 'react-native';
const Stack = createNativeStackNavigator();
const EctScreen = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
      AsyncStorage.getItem('userID', (err, result) => {
        const tempID = result;
        if(tempID!= null){
          setUserID(tempID);
          setLoading(true);
        }
      });
    })
    if(loading === true){
      return (
        <Stack.Navigator>
           <Stack.Screen
            name="Select"
            component={EctSelectScreen}
            options={{
                headerShown: false,
            }} 
            />
          <Stack.Screen
            name="MyPage"
            component={MyPageScreen}
            options={{
                headerShown: false,
            }} 
            />
      </Stack.Navigator>
      )
    }else{
      return (
          <View style={{ flex: 1,}}>
          </View>
      )
    }
}

export default EctScreen;