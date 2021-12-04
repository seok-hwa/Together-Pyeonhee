import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import LinkAccountButton from '../../Buttons/LinkAccountButton';
import AccountItem from '../AccountItem';
import TerminateAccountButton from '../../Buttons/TerminateAccountButton';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast'

import config from '../../../config';
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
    FlatList,
} from 'react-native';

const url = config.url;
const accountLinkScreen = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [accountList, setAccountList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    //for test
    /*
    let tempData = [
        {
            accountCate: '농협',
            accountNum: 2123232,
            accountBalance: 200000,
            accountId: 1,
        },
        {
            accountCate: 'IBK',
            accountNum: 212312332232,
            accountBalance: 20000000,
            accountId: 2,
        },
        {
            accountCate: '우리',
            accountNum: 2123222222,
            accountBalance: 1000000,
            accountId: 3,
        },
    ]*/
    useEffect(()=>{
        let tempID;

        AsyncStorage.getItem('userID', (err, result) => {
            tempID = result;
            if(tempID!= null){
                setUserID(tempID);
            }
        })
        .then(()=>{
            console.log(tempID);
            //for test
            console.log(`${url}/accountList?userID=${tempID}`);
            
            fetch(`${url}/accountList?userID=${tempID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);

                setAccountList(responseJson);
                setLoading(true);
            })
        })
    },[])
    const loadAccount = () => {
        setRefresh(true);
        fetch(`${url}/accountList?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log('response data');
            console.log(responseJson);

            setAccountList(responseJson);
        })
        .then(()=>{
            setRefresh(false);
        })
    }
    const terminateAccount = () => {
        Popup.show({
            type: 'confirm',
            title: '계좌 연동 취소',
            textBody: '모든 계좌 연동을 취소하시겠습니까?',
            buttonText: 'yes',
            confirmText: 'no',
            okButtonStyle: {backgroundColor: '#0000CD'},
            iconEnabled: false,
            callback: () => {
                fetch(`${url}/close?userID=${userID}`)   //get
                .then((response)=>response.json())
                .then((responseJson)=>{
                    console.log(responseJson);
                    if(responseJson.status === true){
                        console.log('연동 취소 완료');
                        Popup.show({
                            type: 'success',
                            textBody: '계좌 연동이 해지되었습니다.',
                            buttonText: '확인',
                            okButtonStyle: {backgroundColor: '#0000CD'},
                            iconEnabled: false,
                            callback: () => Popup.hide()
                        })
                    }else{
                        Popup.show({
                            type: 'success',
                            textBody: '해지에 실패했습니다.',
                            buttonText: '확인',
                            okButtonStyle: {backgroundColor: '#0000CD'},
                            iconEnabled: false,
                            callback: () => Popup.hide()
                        })
                        console.log('fail to terminate.');
                    }
                })
                .catch((e)=>{
                    console.error(e);
                })
            }
        })
    }
    if(loading === true){
        return (
            <View style={styles.appSize}>
                <View style={styles.appTop}>
                    <LinkAccountButton onPress={()=>navigation.navigate('accountLink')} />
                    <TerminateAccountButton onPress={terminateAccount}/>
                </View>
                <View style={styles.appListTitle}>
                    <Text style={styles.appListTitleText}>등록된 계좌 목록</Text>
                </View>
                {
                    accountList.length === 0?
                    <View style={styles.noDiv}>
                        <Text style={styles.noText}>아직 등록된 계좌가 없습니다.</Text>
                    </View> :
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={accountList}
                    renderItem={({item}) => <AccountItem accountAlias={item.account_alias} navigation={navigation} accountBalance={item.accountBalance}
                    accountCate={item.bank_name} accountNum={item.account_num_masked} fintech_use_num={item.fintech_use_num} />}
                    refreshing={refresh}
                    onRefresh={loadAccount}
                />
                }
                
            </View>
        )}
        else{
        return (
            <View style={styles.appSize}>
                <View style={styles.appTop}>
                </View>
                <View style={styles.appListTitle}>
                    <Text style={styles.appListTitleText}>등록된 계좌 목록</Text>
                </View>
                <ScrollView style={styles.appBody}>
                    <View></View>
                </ScrollView>
            </View>
        )
        }
}

export default accountLinkScreen;

const styles = StyleSheet.create({
    appSize:{
        flex: 1,
    },
    appTop: {
        height: 50,
        flexDirection:'row-reverse',
    },
    appListTitle: {
        height: 50,
        marginTop: 20,
        alignItems: 'center',
    },
    appListTitleText:{
        fontSize: 22,
        fontWeight: 'bold',
    },
    appBody: {
        flex: 1,
    },
    noDiv :{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    noText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
    },
});