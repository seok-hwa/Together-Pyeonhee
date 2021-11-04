import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
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
const Mbti2Screen = ({navigation, route}) => {
  const [userID, setUserID] = useState('');

  useEffect(()=>{
    AsyncStorage.getItem('userID', (err, result) => {
      const tempID = result;
      if(tempID!= null){
        setUserID(tempID);
      }
    });
  })
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mbti2: {userID}</Text>
      <Text>Mbti1 점수: {route.params.mbti1Score}</Text>
      <Text>월수입: {route.params.userMonthlyIncome}</Text>
      <Text>고정지출: {route.params.userFixedExpense}</Text>
      <Text>저축액: {route.params.userSavings}</Text>
    </View>
  )
}

export default Mbti2Screen;