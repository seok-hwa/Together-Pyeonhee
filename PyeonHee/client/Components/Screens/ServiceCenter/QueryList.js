import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../config';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';

const url = config.url;
const QueryList = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [noticeList, setNoticeList] = useState([]);

     //for test
     /*
     const tempAll = [
        {
            product_name: '연금저축신탁 안정형',
            bank_name: '신한은행',
            product_type: '안정형',
            disconnected: '가능',
            interest: '1.13%',
            link: 'https://bank.shinhan.com/index.jsp#020001000000',
        },
        {
            product_name: '연금신탁안정형',
            bank_name: '우리은행',
            product_type: '안정형',
            disconnected: '가능',
            interest: '1.04%',
            link: 'https://spot.wooribank.com/pot/Dream?withyou=PORMG0023',
        },
    ]
    const tempMy = [
        {
            product_name: '연금신탁안정형',
            bank_name: '우리은행',
            product_type: '안정형',
            disconnected: '가능',
            interest: '1.04%',
            link: 'https://spot.wooribank.com/pot/Dream?withyou=PORMG0023',
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
    }, [])

    return (
        <View>
            <View style={styles.HeaderDiv}>
                <Text style={styles.HeaderFont}>고객센터</Text>
            </View>
                <ScrollView style={styles.appSize}>
            </ScrollView>
        </View>
    )
}

export default QueryList;

const styles = StyleSheet.create({
    appSize: {
        flex: 1,
      },
    HeaderDiv: {
        backgroundColor: 'white',
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    HeaderFont: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});