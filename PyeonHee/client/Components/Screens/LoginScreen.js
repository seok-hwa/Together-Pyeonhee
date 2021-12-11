import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import LoginButton from '../Buttons/LoginButton';
import JoinButton from '../Buttons/JoinButton';
import { Root, Popup } from 'react-native-popup-confirm-toast';
import messaging from '@react-native-firebase/messaging';
import config from '../../config';
import { login } from '../api';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';

const LoginScreen = ({navigation}) => {
    const [userID, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    
    //파이어베이스 디바이스 토큰 저장
    const getFcmToken = async () => {
      let fcmToken = await messaging().getToken();
      return fcmToken;
    };

    const handleSubmitButton = () => {
      if(!userID){
        Popup.show({
          type: 'success',
          textBody: '아이디를 입력해주세요.',
          buttonText: '확인',
          okButtonStyle: {backgroundColor: '#0000CD'},
          iconEnabled: false,
          callback: () => Popup.hide()
        })
        return;
      }
      if(!userPassword){
        Popup.show({
          type: 'success',
          textBody: '비밀번호를 입력해주세요.',
          buttonText: '확인',
          okButtonStyle: {backgroundColor: '#0000CD'},
          iconEnabled: false,
          callback: () => Popup.hide()
        })
        return;
      }
      getFcmToken().then((fcmToken)=>{
        login(userID, userPassword, fcmToken)
        .then((responseJson)=>{
          console.log(responseJson);
          if(responseJson.status === 'success'){
            AsyncStorage.setItem('userID', userID);
            console.log(userID, '저장');
            if(responseJson.userMbti === null){
              navigation.replace('Survey');
            }else{
              navigation.replace('Main');
            }
          }else{
            Popup.show({
              type: 'success',
              textBody: '아이디 또는 비밀번호를 다시 확인해주세요.',
              buttonText: '확인',
              okButtonStyle: {backgroundColor: '#0000CD'},
              iconEnabled: false,
              callback: () => Popup.hide()
            })
            console.log('Check id or password');
          }
        })
        .catch((error)=>{
          console.error(error);
        })
      });
    }
    return(         //login view
      <Root>
      <KeyboardAvoidingView style={styles.appSize}>
        <View style={styles.appLogoHeaderDiv}>
          <View style={styles.appLogoDiv}>
            <Text style={styles.logoPyeon}>편히</Text>
            <Text style={styles.logoKa}>가계</Text> 
          </View>
        </View>
        <View style={styles.appBody}>
            <TextInput 
              style={styles.textInputDesign}
              placeholder='아이디'
              onChangeText={(userID) => setUserId(userID)}
              maxLength ={20}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.textInputDesign}
              placeholder='비밀번호'
              onChangeText={(userPassword) => setUserPassword(userPassword)}
              maxLength = {20}
            />
            <View style={styles.appInnerFooter}>
              <LoginButton onPress={handleSubmitButton}/>
              <JoinButton onPress={()=>navigation.navigate('Iamport')}/>
            </View>
            <View style={styles.checkPosition}>
              <TouchableOpacity onPress={()=>navigation.navigate('IamportID')}>
                <Text>아이디/</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('IamportPassword')}>
                <Text> 비밀번호 찾기</Text>
              </TouchableOpacity>
            </View>
        </View>
      </KeyboardAvoidingView>
      </Root>
    );
};
const styles = StyleSheet.create({
    appSize: {
        flex: 1,
    },
    appLogoHeaderDiv: {
        flex: 6,
        justifyContent: 'center',
        alignContent: 'center',
    },
    appLogoDiv: {
      alignContent: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
  },
    logoPyeon:{
        fontSize: 55,
        fontWeight: 'bold',
        color: '#0000CD',
    },
    logoKa:{
        marginTop: 5,
        fontSize: 50,
        fontWeight: 'bold',
        color: 'gray',
    },
    appBody: {
        flex: 7,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    checkPosition: {
        marginTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    appFooter: {
        marginTop: 10,
        flex: 3,
        alignItems: 'center',
        borderWidth: 1,
    },
    appInnerFooter: {
        justifyContent: 'flex-start',
        flex: 0.5,
    },
    textInputDesign: {
        marginTop: 5,
        marginBottom: 5,
        paddingHorizontal: 10,
        height: 40,
        width: 250,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: '#DCDCDC',
    },
    logoIcon: {
        marginTop: 25,
    }, 
});

export default LoginScreen;