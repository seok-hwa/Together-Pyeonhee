import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

import TransactionItem from './TransactionItem';
import config from '../../../../config';

const url = config.url;
const TransactionList = (props) => {
    const [userID, setUserID] = useState('');
    //const [todayTransaction, setTodayTransaction] = useState([]);
    const [loading, setLoading] = useState(false);


    let tempDay = props.pressedDay;
    console.log(`${url}/calendar/click?userID=${userID}&today=${tempDay}`);
        /*
    fetch(`${url}/calendar/click?userID=${userID}&today=${tempDay}`)   //get 오늘 날짜도 보내주기
    .then((response)=>response.json())
    .then((responseJson)=>{
        console.log('오늘의 거래 내역');
        console.log(responseJson);

        setTodayTransaction(responseJson);
        setLoading(true);
    })
*/
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
            // if(props.isChanged === true) {
            //     let tempDay = props.pressedDay;
            //     console.log(`${url}/calendar/click?userID=${tempID}&today=${tempDay}`);
        
            //     fetch(`${url}/calendar/click?userID=${tempID}&today=${tempDay}`)   //get 오늘 날짜도 보내주기
            //     .then((response)=>response.json())
            //     .then((responseJson)=>{
            //         console.log('오늘의 거래 내역');
            //         console.log(responseJson);

            //         setTodayTransaction(responseJson);
            //         props.closeChanged();
            //         setLoading(true);
            //     })
            // }


            // let tempDay = props.pressedDay;
            //     console.log(`${url}/calendar/click?userID=${tempID}&today=${tempDay}`);
        
            //     fetch(`${url}/calendar/click?userID=${tempID}&today=${tempDay}`)   //get 오늘 날짜도 보내주기
            //     .then((response)=>response.json())
            //     .then((responseJson)=>{
            //         console.log('오늘의 거래 내역');
            //         console.log(responseJson);

            //         setTodayTransaction(responseJson);
            //         props.closeChanged();
            //         setLoading(true);
            //     })
            
        })
    }, [])  //-> 랜더링 문제 해결 필요

    return (
        <View>
            <View style={styles.todayContiner}>
                <Text>{props.pressedDate}일  </Text>
            </View>

            <View>
                
                { props.todayTransaction.length === 0 ?
                    <Text>거래 내역이 없습니다.</Text> :
                    props.todayTransaction.map((item, index) => {
                        return <TransactionItem key={index} name={item.tran_type} inout={item.inout_type} money={item.tran_amt}/>;
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