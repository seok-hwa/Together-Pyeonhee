import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginButton from '../Buttons/LoginButton';
import JoinButton from '../Buttons/JoinButton';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';

const CheckRemember = (props) => {          //remember id component
    const sendCheck=()=>{
        props.getCheck(!(props.check));
    }
    return(
        <TouchableOpacity onPress={sendCheck}>
            <Text>{props.check ? <Icon name="checkmark-circle-outline" size={20}></Icon> : <Icon name="ellipse-outline" size={20}></Icon>} 아이디 기억하기</Text>
        </TouchableOpacity>
    );
};

const LoginScreen = ({navigation}) => {
    const [check, setCheck] = useState(false);
    const getCheck=(check)=>{
      setCheck(check);
    }
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmitButton = () => {
      if(!id){
        alert('아이디를 입력해주세요.');
        return;
      }
      if(!password){
        alert('비밀번호를 입력해주세요.');
        return;
      }
      fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
          user_id: id,
          user_password: password,
          user_rememberCheck: check,
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json',
        },
      })
      .then((response)=>response.json())
      .then((responseJson)=>{
        console.log(responseJson);
        if(responseJson.status === 'success'){
          AsyncStorage.setItem('userID', id);
          console.log(id, '저장');
          navigation.replace('Main');
        }else{
          alert('아이디와 비밀번호를 다시 확인해주세요.');
          console.log('Check id or password');
        }
      })
      .catch((error)=>{
        console.error(error);
      })
    }
  
    return(         //login view
      <KeyboardAvoidingView style={styles.appSize}>
        <View style={styles.appLogoHeaderDiv}>
          <Text style={styles.logoPyeon}>편히</Text>
          <Text style={styles.logoKa}>가계</Text> 
        </View>
        <View style={styles.appBody}>
          <View style={styles.appInnerBody}>
            <TextInput 
              style={styles.textInputDesign}
              placeholder='아이디'
              onChangeText={(id) => setId(id)}
              maxLength ={20}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.textInputDesign}
              placeholder='비밀번호'
              onChangeText={(password) => setPassword(password)}
              maxLength = {20}
            />
            <View style={styles.checkPosition}>
              <CheckRemember check={check} getCheck={getCheck}/>
            </View>
          </View>
          <View style={styles.appFooter}>
            <View style={styles.appInnerFooter}>
              <LoginButton onPress={handleSubmitButton}/>
              <JoinButton onPress={()=>navigation.replace('Join')}/>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    appSize: {
        flex: 1,
    },
    appLogoHeaderDiv: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    },
    logoPyeon:{
        fontSize: 40,
        fontWeight: 'bold',
        color: '#0000CD',
    },
    logoKa:{
        fontSize: 40,
        fontWeight: 'bold',
        color: 'gray',
    },
    appInnerBody: {
        flex: 1,
        alignItems: 'center',
    },
    appBody: {
        flex: 2,
    },
    checkPosition: {
        flexDirection: 'row',
        width: 240,
        marginTop: 10,
    },
    appFooter: {
        marginTop: 30,
        flex: 2,
        alignItems: 'center',
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
});

export default LoginScreen;