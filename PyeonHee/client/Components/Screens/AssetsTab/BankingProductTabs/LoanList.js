import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../../config';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import LoanItem from './LoanItem';
const url = config.url;
const LoanProduct = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [check, setCheck] = useState(false);
    const [read, setRead] = useState(false);
    const [allLoanList, setAllLoanList] = useState([]);
    const [myLoanList, setMyLoanList] = useState([]);

    //for test
    const tempAll = [
        {
            product_name: '아파트 담보대출',
            bank_name: '주식회사 케이뱅크',
            interest_type: '변동금리',
            repay_type: '원리금분할상환',
            interest: '2.61%',
            link: 'https://ib.kbanknow.com/ib20/mnu/FPMDPT010000',
        },
        {
            product_name: '씨티주택담보대출',
            bank_name: '한국씨티은행',
            interest_type: '변동금리',
            repay_type: '원리금분할상환',
            interest: '2.87%',
            link: 'https://www.citibank.co.kr/ComMainCnts0100.act?ref=http://finlife.fss.or.kr/',
        },
    ]
    const tempMy = [
        {
            product_name: '씨티주택담보대출',
            bank_name: '한국씨티은행',
            interest_type: '변동금리',
            repay_type: '원리금분할상환',
            interest: '2.87%',
            link: 'https://www.citibank.co.kr/ComMainCnts0100.act?ref=http://finlife.fss.or.kr/',
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
        /*
        .then(()=>{
            console.log(tempID);
            console.log(`${url}/allLoanList`);
            fetch(`${url}/allLoanList`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setAllLoanList(responseJson);
            })  
        })*/
    }, [])

    const checkHandler = () => {
        setCheck(!check);
        /*
        if(check === false && read === false) {
            setRead(true);
            fetch(`${url}/myLoanList?userID=${userID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setMyLoanList(responseJson);
            })
        }
        */
    }

    return (
        <View style={styles.appSize}>
            <View style={styles.wrapper}>
                    <CheckBox value={check} onChange={checkHandler} />
                    <Text style={styles.text}>
                        나에게 맞는 대출 찾기
                    </Text>
            </View>
            {
                check === false && 
                    tempAll.map((item, index) => {
                    return <LoanItem key={index} product_name={item.product_name} bank_name={item.bank_name} interest_type={item.interest_type}
                    repay_type={item.repay_type} interest={item.interest} link={item.link} navigation={navigation}
                    />;
                })}
                {check === true && 
                    tempMy.map((item, index) => {
                    return <LoanItem key={index} product_name={item.product_name} bank_name={item.bank_name} interest_type={item.interest_type}
                    repay_type={item.repay_type} interest={item.interest} link={item.link} navigation={navigation}
                    />;
                })
            }
        </View>
    )
}

export default LoanProduct;

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