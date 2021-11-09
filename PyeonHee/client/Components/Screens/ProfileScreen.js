import React, { Component, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import LogoutButton from '../Buttons/LogoutButton';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    Button,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
const ProfileScreen = ({navigation}) => {
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
    const logout = () => {
      Popup.show({
        type: 'confirm',
        title: '로그아웃',
        textBody: '로그아웃 하시겠습니까?',
        buttonText: 'yes',
        confirmText: 'no',
        okButtonStyle: {backgroundColor: '#0000CD'},
        iconEnabled: false,
        callback: () => {
          Popup.hide()
          AsyncStorage.removeItem('userID')
          .then(()=>{
            navigation.reset({routes: [{name: 'Login'}]})
          })
        }
      })
    }
    if(loading === true){
      return (
        <Root>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Profile: {userID}</Text>
            <LogoutButton onPress={logout}/>
        </View>
        </Root>
      )
    }else{
      return (
          <View style={{ flex: 1,}}>
          </View>
      )
    }
}

export default ProfileScreen;