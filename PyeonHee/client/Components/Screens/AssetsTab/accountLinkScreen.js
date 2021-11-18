import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import LinkAccountButton from '../../Buttons/LinkAccountButton';
import AccountItem from '../AccountItem';

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
} from 'react-native';

const url = config.url;
const accountLinkScreen = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [accountList, setAccountList] = useState([]);
    const [loading, setLoading] = useState(true);

    //for test
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
    ]
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
            /*
            fetch(`${url}/accountList?userID=${tempID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);

                setAccountList(responseJson);
                setLoading(true);
            })*/
        })
    })

    return (
        <View style={styles.appSize}>
            <View style={styles.appTop}>
                <LinkAccountButton onPress={()=>navigation.navigate('test')} />
            </View>
            <View style={styles.appListTitle}>
                <Text style={styles.appListTitleText}>등록된 계좌 목록</Text>
            </View>
            <ScrollView style={styles.appBody}>
                {tempData.length === 0 ?
                <Text>등록된 계좌가 없습니다.</Text> :
                tempData.map(item => {
                    return <AccountItem key={item.accountId} accountId={item.accountId} accountBalance={item.accountBalance}
                    accountCate={item.accountCate} accountNum={item.accountNum}/>;
                })}
            </ScrollView>
        </View>
    )
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
        alignItems: 'center',
    },
    appListTitleText:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    appBody: {
        flex: 1,
    },
});