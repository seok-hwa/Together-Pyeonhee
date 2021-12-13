import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../../config';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity ,ScrollView} from 'react-native';
import SavingItem from './SavingItem';
import { allSavingListApi, mySavingListApi } from '../../../api';
const url = config.url;
const SavingProduct = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [check, setCheck] = useState(false);
    const [read, setRead] = useState(false);
    const [allSavingList, setAllSavingList] = useState([]);
    const [mySavingList, setMySavingList] = useState([]);

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
            allSavingListApi()
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setAllSavingList(responseJson);
            })  
        })
    }, [])

    const checkHandler = () => {
        setCheck(!check);

        if(check === false && read === false) {
            setRead(true);
            mySavingListApi(userID)
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setMySavingList(responseJson);
            })
        }
    }

    return (
        <ScrollView style={styles.appSize}>
            <View style={styles.wrapper}>
                    <CheckBox value={check} onChange={checkHandler} />
                    <Text style={styles.text}>
                        나에게 맞는 적금 찾기
                    </Text>
            </View>
            {
                check === false && 
                    allSavingList.map((item, index) => {
                    return <SavingItem key={index} product_name={item.product_name} bank_name={item.bank_name} product_type={item.product_type}
                    max_interest={item.max_interest} interest={item.interest} link={item.link} navigation={navigation}
                    />;
                })}
                {check === true && 
                    mySavingList.map((item, index) => {
                    return <SavingItem key={index} product_name={item.product_name} bank_name={item.bank_name} product_type={item.product_type}
                    max_interest={item.max_interest} interest={item.interest} link={item.link} navigation={navigation}
                    />;
                })
            }
        </ScrollView>
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