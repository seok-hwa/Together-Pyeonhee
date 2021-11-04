import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import NextToMbtiButton from '../Buttons/NextToMbtiButton';
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
const BasicSurveyScreen = ({navigation}) => {
  const [userID, setUserID] = useState('');
  const [userMonthlyIncome, setUserMonthlyIncome] = useState(0);
  const [userFixedExpense, setUserFixedExpense] = useState(0);
  const [userSavings, setUserSavings] = useState(0);

  const handleSubmitButton = () => {
    if(!userMonthlyIncome){
      alert('월수입을 입력해주세요.');
      return;
    }
    var numCheck = /^[0-9]{1,20}$/;
    if(!numCheck.test(userMonthlyIncome)){
        alert('숫자만 입력가능합니다.');
        return;
    }
    if(!userFixedExpense){
      alert('월 고정지출을 입력해주세요.');
      return;
    }
    if(!numCheck.test(userFixedExpense)){
      alert('숫자만 입력가능합니다.');
      return;
    }
    if(!userSavings){
      alert('월 저축액를 입력해주세요.');
      return;
    }
    if(!numCheck.test(userSavings)){
      alert('숫자만 입력가능합니다.');
      return;
    }
    navigation.navigate('Mbti1', {
      userMonthlyIncome: userMonthlyIncome,
      userFixedExpense: userFixedExpense,
      userSavings: userSavings,
    });
  }
  useEffect(()=>{
    AsyncStorage.getItem('userID', (err, result) => {
      const tempID = result;
      if(tempID!= null){
        setUserID(tempID);
      }
    });
  })
  return (
    <View style={styles.appSize}>
      <View style={styles.appLogoHeaderDiv}>
        <Text style={styles.logoText}>설문조사전 기본 정보</Text>
      </View>
      <View style={styles.appBody}>
        <View style={styles.appInnerBody}>
          <View style={styles.innerTextAlign}>
              <Text style={styles.questText}>월 수입</Text>
          </View>
          <View style={styles.textDiv}>
            <TextInput 
            style={styles.textInputDesign}
            placeholder='숫자만 입력'
            maxLength ={20}
            onChangeText={(userMonthlyIncome) => setUserMonthlyIncome(userMonthlyIncome)}
            />
            <Text style={styles.wonText}> 원</Text>
          </View>
          <View style={styles.innerTextAlign}>
              <Text style={styles.questText}>월 고정지출</Text>
          </View>
          <View style={styles.textDiv}>
            <TextInput 
            style={styles.textInputDesign}
            placeholder='숫자만 입력'
            maxLength ={20}
            onChangeText={(userFixedExpense) => setUserFixedExpense(userFixedExpense)}
            />
            <Text style={styles.wonText}> 원</Text>
          </View>
          <View style={styles.innerTextAlign}>
              <Text style={styles.questText}>월 저축액</Text>
          </View>
          <View style={styles.textDiv}>
            <TextInput 
            style={styles.textInputDesign}
            placeholder='숫자만 입력'
            maxLength ={20}
            onChangeText={(userSavings) => setUserSavings(userSavings)}
            />
            <Text style={styles.wonText}> 원</Text>
          </View>            
        </View>
      </View>
      <View style={styles.appFooter}>
        <NextToMbtiButton onPress={handleSubmitButton}/>  
      </View> 
    </View>
  )
}
const styles = StyleSheet.create({
  appSize: {
    flex: 1,
  },
  appLogoHeaderDiv: {
    flex: 1,
  },
  logoText: {
    marginTop: 50,
    marginLeft: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'gray',
  },
  questText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  wonText: {
    fontSize: 15,
    marginTop: 20,
  },
  appBody: {
    flex: 4,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  appInnerBody: {
    flex: 1,
    alignItems: 'center',
  },
  innerTextAlign: {
    flexDirection: 'row',
    width: 240,
    marginTop: 30,
  },
  textDiv:{
    flexDirection: 'row',
  },
  textInputDesign: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    width: 240,
    borderRadius: 3,
    backgroundColor: '#DCDCDC',
  },
  appFooter: {
    flex: 2,
    alignItems: 'center',
  },
});
export default BasicSurveyScreen;