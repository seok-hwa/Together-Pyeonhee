import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../config';

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
  Linking,
} from 'react-native';
const url = config.url;
const openBankingURL = config.openBankingURL;

const AssetsScreen = ({navigation}) => {
  const [userID, setUserID] = useState('');
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    AsyncStorage.getItem('userID', (err, result) => {
      const tempID = result;
      if(tempID!= null){
        setUserID(tempID);
      }
    })
  })
  const submit=()=>{
    Linking.openURL(openBankingURL).catch(err => console.error('오류가 발생했습니다', err));
  }
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Assets: {userID}</Text>
      <Button title="오픈뱅킹 테스트" onPress={()=>navigation.navigate('test')}></Button>
    </View>
  )
  /*
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Assets: {userID}</Text>
      <Button title="오픈뱅킹 테스트" onPress={submit}></Button>
    </View>
  )*/
}

export default AssetsScreen;