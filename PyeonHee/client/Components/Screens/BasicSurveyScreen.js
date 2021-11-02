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
const BasicSurveyScreen = () => {
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
            />
            <Text style={styles.wonText}> 원</Text>
          </View>            
        </View>
      </View>
      <View style={styles.appFooter}>
        <NextToMbtiButton />  
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