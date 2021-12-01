import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../../config';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import PensionItem from './PensionItem';

const url = config.url;
const PensionProduct = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [check, setCheck] = useState(false);
    const [read, setRead] = useState(false);
    const [allPensionList, setAllPensionList] = useState([]);
    const [myPensionList, setMyPensionList] = useState([]);

     //for test
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
            console.log(`${url}/allPensionList`);
            fetch(`${url}/allPensionList`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setAllPensionList(responseJson);
            })  
        })*/
    })

    const checkHandler = () => {
        setCheck(!check);
        /*
        if(check === false && read === false) {
            setRead(true);
            fetch(`${url}/myPensionList?userID=${userID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setMyPensionList(responseJson);
            })
        }*/
    }

    return (
        <View style={styles.appSize}>
            <View style={styles.wrapper}>
                    <CheckBox value={check} onChange={checkHandler} />
                    <Text style={styles.text}>
                        나에게 맞는 연금 찾기
                    </Text>
            </View>
            {
                check === false && 
                    tempAll.map((item, index) => {
                    return <PensionItem key={index} product_name={item.product_name} bank_name={item.bank_name} product_type={item.product_type}
                    disconnected={item.disconnected} interest={item.interest} link={item.link} navigation={navigation}
                    />;
                })}
                {check === true && 
                    tempMy.map((item, index) => {
                    return <PensionItem key={index} product_name={item.product_name} bank_name={item.bank_name} product_type={item.product_type}
                    disconnected={item.disconnected} interest={item.interest} link={item.link} navigation={navigation}
                    />;
                })
            }
        </View>
    )
}

export default PensionProduct;

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