import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import NextToMbtiButton from '../../Buttons/NextToMbtiButton';
import { JOBS, INCOMES } from '../constants';
import RNPickerSelect from 'react-native-picker-select';
import { Root, Popup } from 'react-native-popup-confirm-toast';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
const BasicSurveyScreen = ({navigation}) => {
  const [userMonthlyIncome, setUserMonthlyIncome] = useState('');
  const [userAge, setUserAge] = useState(0);
  const [userJob, setUserJob] = useState('');

  const placeholder = '선택';
  const handleSubmitButton = () => {
    if(!userAge){
      Popup.show({
        type: 'success',
        textBody: '나이를 입력해주세요.',
        buttonText: '확인',
        okButtonStyle: {backgroundColor: '#0000CD'},
        iconEnabled: false,
        callback: () => Popup.hide()
      })
      return;
    }
    var ageCheck = /^[0-9]{1,3}$/;
    if(!ageCheck.test(userAge)){
        Popup.show({
          type: 'success',
          textBody: '숫자만 입력가능합니다.',
          buttonText: '확인',
          okButtonStyle: {backgroundColor: '#0000CD'},
          iconEnabled: false,
          callback: () => Popup.hide()
        })
        return;
    }
    if(!userJob){
      Popup.show({
        type: 'success',
        textBody: '직업군을 선택해주세요.',
        buttonText: '확인',
        okButtonStyle: {backgroundColor: '#0000CD'},
        iconEnabled: false,
        callback: () => Popup.hide()
      })
      return;
    }
    if(!userMonthlyIncome){
      Popup.show({
        type: 'success',
        textBody: '월 수입을 선택해주세요.',
        buttonText: '확인',
        okButtonStyle: {backgroundColor: '#0000CD'},
        iconEnabled: false,
        callback: () => Popup.hide()
      })
      return;
    }
    navigation.navigate('Mbti1', {
      userAge: userAge,
      userMonthlyIncome: userMonthlyIncome,
      userJob: userJob,
    });
  }
  return (
    <Root>
    <View style={styles.appSize}>
      <View style={styles.appLogoHeaderDiv}>
        <Text style={styles.logoText}>설문조사전 기본 정보</Text>
      </View>
      <View style={styles.appBody}>
        <View style={styles.appInnerBody}>
          <View style={styles.innerTextAlign}>
              <Text style={styles.questText}>나이</Text>
          </View>
          <View style={styles.textDiv}>
            <TextInput 
            style={styles.textInputDesign}
            placeholder='숫자만 입력'
            maxLength ={3}
            onChangeText={(userAge) => setUserAge(userAge)}
            />
            <Text style={styles.wonText}>세</Text>
          </View>
          <View style={styles.innerTextAlign}>
              <Text style={styles.questText}>직업</Text>
          </View>
          <View style={styles.pickerDiv}>
             <RNPickerSelect
              placeholder={{
                label: placeholder,
                color: 'gray',
              }}
              onValueChange={(value) => setUserJob(value)}
              items={JOBS}
            />    
          </View>
          <View style={styles.innerTextAlign}>
              <Text style={styles.questText}>월 수입</Text>
          </View>
          <View style={styles.pickerDiv}>
            <RNPickerSelect
              placeholder={{
                label: placeholder,
                color: 'gray',
              }}
              onValueChange={(value) => setUserMonthlyIncome(value)}
              items={INCOMES}
            /> 
          </View>
        </View>
      </View>
      <View style={styles.appFooter}>
        <NextToMbtiButton onPress={handleSubmitButton}/>  
      </View> 
    </View>
    </Root>
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
    width: 220,
    borderRadius: 3,
    backgroundColor: '#DCDCDC',
  },
  appFooter: {
    flex: 2,
    alignItems: 'center',
  },

  pickerDiv: {
    backgroundColor: '#DCDCDC',
    marginTop: 10,
    paddingHorizontal: 10,
    height: 40,
    width: 240,
    borderRadius: 3,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
      height: 40, 
      width: 240, 
      backgroundColor: '#DCDCDC',
      borderColor: '#000000',  
      borderRadius: 3,
      padding: 10,
  },
});
export default BasicSurveyScreen;