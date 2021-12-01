import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../../config';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import SavingItem from './SavingItem';
const url = config.url;
const SavingProduct = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [check, setCheck] = useState(false);
    const [read, setRead] = useState(false);
    const [allSavingList, setAllSavingList] = useState([]);
    const [mySavingList, setMySavingList] = useState([]);

    //for test
    const tempAll = [
        {
            product_name: '스마트 정기적금',
            bank_name: '스마트저축은행',
            product_type: '정액정립식',
            max_interest: '4.0%',
            interest: '3.5%',
            link: 'https://www.smartbank.co.kr/HMA0001',
        },
        {
            product_name: '웰컴 첫거래우대 정기적금',
            bank_name: '웰컴저축은행',
            product_type: '정액적립식',
            max_interest: '4.2%',
            interest: '3.5%',
            link: 'https://www.welcomebank.co.kr/ib20/mnu/IBN000000000',
        },
    ]
    const tempMy = [
        {
            product_name: '스마트 정기적금',
            bank_name: '스마트저축은행',
            product_type: '정액정립식',
            max_interest: '4.0%',
            interest: '3.5%',
            link: 'https://www.smartbank.co.kr/HMA0001',
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
            console.log(`${url}/allSavingList`);
            fetch(`${url}/allSavingList`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setAllSavingList(responseJson);
            })  
        })
    })

    const checkHandler = () => {
        setCheck(!check);
        if(check === false && read === false) {
            setRead(true);
            fetch(`${url}/mySavingList?userID=${userID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setMySavingList(responseJson);
            })
        }
    }

    return (
        <View style={styles.appSize}>
            <View style={styles.wrapper}>
                    <CheckBox value={check} onChange={checkHandler} />
                    <Text style={styles.text}>
                        나에게 맞는 적금 찾기
                    </Text>
            </View>
            {
                check === false && 
                    tempAll.map((item, index) => {
                    return <SavingItem key={index} product_name={item.product_name} bank_name={item.bank_name} product_type={item.product_type}
                    max_interest={item.max_interest} interest={item.interest} link={item.link} navigation={navigation}
                    />;
                })}
                {check === true && 
                    tempMy.map((item, index) => {
                    return <SavingItem key={index} product_name={item.product_name} bank_name={item.bank_name} product_type={item.product_type}
                    max_interest={item.max_interest} interest={item.interest} link={item.link} navigation={navigation}
                    />;
                })
            }
        </View>
    )
}

export default SavingProduct;

const styles = StyleSheet.create({
    appSize: {
        flex: 1,
      },

        wrapper: {
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            paddingVertical: 5,
        },
        text: {
            lineHeight: 30,
            marginLeft: 10,
        },
});