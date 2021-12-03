import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { Root, Popup } from 'react-native-popup-confirm-toast';
import config from '../../../config';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';
const url=config.url;
const FindIDResult = ({route, navigation }) => {
    const [userID, setUserID] = useState('');

    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');

    const [isUserID, setIsUserID] = useState(false);
    const [loading, setLoading] = useState(false);
    
    console.log('아이디 찾기 데이터', route.params);

    useEffect(()=>{
        setUserName(route.params.data.name);
        setUserPhone(route.params.data.phone);

        fetch(`${url}/findID`, {
            method: 'POST',
            body: JSON.stringify({
              userName: userName,
              userPhone: userPhone,
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

    if(loading === true && isUserID === true){
    return(
        <View style={styles.appSize}>
            <View style={styles.appLogoHeaderDiv}>
                <Text style={styles.logoJoin}>아이디 찾기 결과</Text>
            </View>
            
        </View>
    )}
    else if(loading === false && isUserID === false){
        return(
            <View style={styles.appSize}>
            <View style={styles.appLogoHeaderDiv}>
                <Text style={styles.logoJoin}>아이디 찾기 결과</Text>
            </View>
            <View style={styles.appBody}>
                <View style={styles.appInnerBody}>
                    <View style={styles.innerTextAlign}>
                        <Text>아이디</Text>
                    </View>
                    <Text style={styles.idDiv}>아이디</Text>
                </View>
            </View>
        </View>
        )
    }else{
        return(
            <View style={styles.appSize}>
            <View style={styles.appLogoHeaderDiv}>
                <Text style={styles.logoJoin}>아이디 찾기 결과</Text>
            </View>  
            <View style={styles.appBody}>
                <View style={styles.appInnerBody}>
                    <View style={styles.innerTextAlign}>
                        <Text>등록된 아이디가 없습니다.</Text>
                    </View>
                </View>
            </View>   
        </View>
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
    },
});
export default FindIDResult;