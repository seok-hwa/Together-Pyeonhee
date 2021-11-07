import React, { useState, useEffect } from 'react';
import JoinRequestButton from '../Buttons/JoinRequestButton';
import BackButton from '../Buttons/BackButton';
import AsyncStorage from '@react-native-community/async-storage'

import {
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';
const JoinScreen = ({route, navigation }) => {
    const [url, setUrl] = useState('');
    const [userID, setUserId] = useState('');
    const [userAge, setUserAge] = useState(0);
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordCheck, setUserPasswordCheck] = useState('');

    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    
    console.log('회원가입 데이터', route.params);

    useEffect(()=>{
        AsyncStorage.getItem('url', (err, result) => {
          let tempUrl = result;
          if(tempUrl!= null){
            setUrl(tempUrl);
          }
        });
        setUserName(route.params.data.name);
        setUserPhone(route.params.data.phone);
    },[]);

    const handleSubmitButton = () => {
        if(!userID){
          alert('아이디를 입력해주세요.');
          return;
        }
        var idCheck = /^[a-zA-z0-9]{8,20}$/;
        if(!idCheck.test(userID)){
            alert('아이디는 8~20자의 영문자, 숫자만 입력 가능합니다.');
            return;
        }
        if(!userAge){
            alert('나이를 입력해주세요.');
            return;
        }
        var ageCheck = /^[0-9]{1,10}$/;
        if(!ageCheck.test(userAge)){
            alert('나이 형식이 올바르지 않습니다.');
            return;
        }
        if(!userPassword){
          alert('비밀번호를 입력해주세요.');
          return;
        }
        var pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if(!pwCheck.test(userPassword)){
            alert('비밀번호는 8~25자의 영문자, 숫자, 특수문자의 조합으로 입력해야 합니다.');
            return;
        }
        if(!userPasswordCheck){
            alert('비밀번호 확인을 입력해주세요.');
            return;
        }
        if(userPassword != userPasswordCheck){
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        fetch(`${url}/signUp`, {
          method: 'POST',
          body: JSON.stringify({
            userID: userID,
            userAge: userAge,
            userName: userName,
            userPhone: userPhone,
            userPassword: userPassword,
            userPasswordCheck: userPasswordCheck,
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
            console.log(userID, userPassword, '회원가입 완료');
            alert('회원가입이 완료되었습니다.');
            navigation.replace('Login');
          }else{
            alert('이미 존재하는 아이디입니다.');
            console.log('fail to join. id is already exist.');
          }
        })
        .catch((error)=>{
          console.error(error);
        })
    }
    return(
        <View style={styles.appSize}>
            <View style={styles.appLogoHeaderDiv}>
                <Text style={styles.logoJoin}>회원가입</Text>
            </View>
            <View style={styles.appBody}>
                <View style={styles.appInnerBody}>
                    <View style={styles.innerTextAlign}>
                        <Text>아이디*</Text>
                    </View>
                    <TextInput 
                    style={styles.textInputDesign}
                    placeholder='8~20자(영문자+숫자만 사용)'
                    onChangeText={(userID) => setUserId(userID)}
                    maxLength ={20}
                    />
                    <View style={styles.innerTextAlign}>
                        <Text>나이*</Text>
                    </View>
                    <TextInput 
                    style={styles.textInputDesign}
                    placeholder='숫자만 입력'
                    onChangeText={(userAge) => setUserAge(userAge)}
                    maxLength ={50}
                    />
                    <View style={styles.innerTextAlign}>
                        <Text>비밀번호*</Text>
                    </View>
                    <TextInput
                    secureTextEntry={true}
                    style={styles.textInputDesign}
                    placeholder='8~25자(영문자+숫자+특수문자 조합)'
                    onChangeText={(userPassword) => setUserPassword(userPassword)}
                    maxLength = {25}
                    />
                    <View style={styles.innerTextAlign}>
                        <Text>비밀번호 확인*</Text>
                    </View>
                    <TextInput
                    secureTextEntry={true}
                    style={styles.textInputDesign}
                    onChangeText={(userPasswordCheck) => setUserPasswordCheck(userPasswordCheck)}
                    maxLength = {25}
                    />
                </View>
            </View>
            <View style={styles.appFooter}>
                <JoinRequestButton onPress={handleSubmitButton}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    appSize: {
        flex: 1, 
        backgroundColor: 'white',
    },
    appLogoHeaderDiv: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logoJoin:{
        marginTop: 10,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
    appInnerBody: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
    },
    innerTextAlign: {
        flexDirection: 'row',
        width: 240,
        marginTop: 5,
    },
    appBody: {
        flex: 8,
        borderTopWidth: 1,
        borderColor: 'gray',
    },
    textInputDesign: {
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        width: 250,
        borderRadius: 5,
        backgroundColor: '#DCDCDC',
    },
    appFooter: {
        flex: 5,
        alignItems: 'center',
    },
});
export default JoinScreen;