import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { Root, Popup } from 'react-native-popup-confirm-toast';
import config from '../../../config';
import UpdatePasswordButton from '../../Buttons/UpdatePasswordButton';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';
const url=config.url;
const FindPasswordResult = ({route, navigation }) => {
    const [userID, setUserID] = useState('');

    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');

    const [userPassword, setUserPassword] = useState('');
    const [userPasswordCheck, setUserPasswordCheck] = useState('');

    const [isUserID, setIsUserID] = useState(false);
    const [loading, setLoading] = useState(false);
    
    console.log('비밀번호 찾기 데이터', route.params);

    useEffect(()=>{
        //setUserName(route.params.data.name);
        //setUserPhone(route.params.data.phone);

        fetch(`${url}/access/findID`, {
            method: 'POST',
            body: JSON.stringify({
              userName: route.params.data.name,
              userPhone: route.params.data.phone,
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type':'application/json',
            },
          })
          .then((response)=>response.json())
          .then((responseJson)=>{
              if(responseJson.status === 'success'){
                setIsUserID(true);
                setUserID(responseJson.userID);
              }
          })
          .then(()=>{
              setLoading(true);
          })
    },[]);

    const handleSubmitButton = () => {
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
        var pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if(!pwCheck.test(userPassword)){
            Popup.show({
                type: 'success',
                textBody: '비밀번호는 8~25자의 영문자, 숫자, 특수문자의\n조합으로 입력해야 합니다.',
                buttonText: '확인',
                okButtonStyle: {backgroundColor: '#0000CD'},
                iconEnabled: false,
                callback: () => Popup.hide()
            })
            return;
        }
        if(!userPasswordCheck){
            Popup.show({
                type: 'success',
                textBody: '비밀번호 확인을 입력해주세요.',
                buttonText: '확인',
                okButtonStyle: {backgroundColor: '#0000CD'},
                iconEnabled: false,
                callback: () => Popup.hide()
            })
            return;
        }
        if(userPassword != userPasswordCheck){
            Popup.show({
                type: 'success',
                textBody: '비밀번호가 일치하지 않습니다.',
                buttonText: '확인',
                okButtonStyle: {backgroundColor: '#0000CD'},
                iconEnabled: false,
                callback: () => Popup.hide()
            })
            return;
        }

        fetch(`${url}/access/passwordUpdate`, {
          method: 'POST',
          body: JSON.stringify({
            userID: userID,
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
            Popup.show({
                type: 'success',
                textBody: '변경이 완료 되었습니다.',
                buttonText: '확인',
                okButtonStyle: {backgroundColor: '#0000CD'},
                iconEnabled: false,
                callback: () => Popup.hide()
            })
            console.log(userID, userPassword, '변경 완료');
            navigation.replace('Login');
          }else{
            alert('변경실패');
            console.log('fail to join. id is already exist.');
          }
        })
        .catch((error)=>{
          console.error(error);
        })
    }
    if(loading === true && isUserID === true){
    return(
        <Root>
        <View style={styles.appSize}>
            <View style={styles.appLogoHeaderDiv}>
                <Text style={styles.logoJoin}>비밀번호 변경</Text>
            </View>
            <View style={styles.appBody}>
                <View style={styles.appInnerBody}>
                    <View style={styles.innerTextAlign}>
                        <Text>아이디</Text>
                    </View>
                    <Text style={styles.idDiv}>{userID}</Text>
                    <View style={styles.innerTextAlign}>
                        <Text >비밀번호*</Text>
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
                <UpdatePasswordButton onPress={handleSubmitButton}/>
            </View>
        </View>
        </Root>
    )}
    else if (loading === true && isUserID === false){
        return(
            <Root>
            <View style={styles.appSize}>
                <View style={styles.appLogoHeaderDiv}>
                    <Text style={styles.logoJoin}>비밀번호 변경</Text>
                </View>
                <View style={styles.appBody}>
                    <Text>등록된 ID가 없습니다.</Text>
                </View>
            </View>
            </Root>
        )
    }else{
        return(
            <Root>
            <View style={styles.appSize}>
                <View style={styles.appLogoHeaderDiv}>
                    <Text style={styles.logoJoin}>비밀번호 변경</Text>
                </View>
            </View>
            </Root>
        )
    }
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
        marginTop: 100,
    },
    innerTextAlign: {
        flexDirection: 'row',
        width: 240,
        marginTop: 5,
        padding: 5,
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
    idDiv:{
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 25,
        width: 250,
        borderRadius: 5,
        backgroundColor: '#DCDCDC',
    }
});
export default FindPasswordResult;