import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

import TransactionItem from './TransactionItem';
import config from '../../../../config';

const url = config.url;
const TransactionList = (props) => {
    const [userID, setUserID] = useState('');
    const [todayTransaction, setTodayTransaction] = useState([]);
    // const [loading, setLoading] = useState(false);

    // let todayTransaction = [
    //     {
    //         name: '아침',
    //         money: 1000,
    //         id: 1,
    //     },
    //     {
    //         name: '점심',
    //         money: 5000,
    //         id: 2,
    //     },
    //     {
    //         name: '저녁',
    //         money: 10000,
    //         id: 3,
    //     },
    //     {
    //         name: '출금',
    //         money: -10000,
    //         id: 3,
    //     },
    // ]

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
            // console.log(`${url}/calendar/click?userID=${tempID}?today=${}`)/
            // let tempDay = props.pressedYear+props.pressedMonth+props.pressedDate;/
            let temp = 20211120;
            console.log(`${url}/calendar/click?userID=${tempID}&today=${temp}`);
            // console.log(tempDay);
            // console.log('tempDay');

            
            fetch(`${url}/calendar/click?userID=${tempID}&today=${temp}`)   //get 오늘 날짜도 보내주기
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);

                setTodayTransaction(responseJson);
                // setLoading(true);
            })  
            


        })
    }, [])

    return (
        <View>
            <View style={styles.todayContiner}>
                <Text>{props.pressedDate}일  </Text>
            </View>

            <View>
                {todayTransaction.length === 0 ?
                <Text>거래 내역이 없습니다.</Text> :
                todayTransaction.map(item => {
                    return <TransactionItem key={item.id} name={item.name} money={item.money}/>;
                })}
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    todayContiner: {
        margin: 8,
        // backgroundColor: 'yellow',
    }

});

export default TransactionList; 