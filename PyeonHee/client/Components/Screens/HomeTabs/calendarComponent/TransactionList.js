import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

import TransactionItem from './TransactionItem';

const TransactionList = (props) => {
    const [userID, setUserID] = useState('');
    //const [todayTransaction, setTodayTransaction] = useState([]);
    const [loading, setLoading] = useState(false);


    let tempDay = props.pressedDay;

    useEffect(()=>{
        let tempID;

        AsyncStorage.getItem('userID', (err, result) => {
            tempID = result;
            if(tempID!= null){
                setUserID(tempID);
            }
        })
        .then(()=>{
        })
    }, [])  //-> 랜더링 문제 해결 필요

    return (
        <View style={styles.bottomContainer}>
            <View style={styles.todayContiner}>
                <Text style={styles.todayText}>{props.pressedDate}일  </Text>
            </View>

            <View style={styles.listContainer}>
                { props.todayTransaction.length === 0 ?
                    <View style={{alignItems: 'center', }}><Text>거래 내역이 없습니다.</Text></View> :
                    props.todayTransaction.map((item, index) => {
                        return <TransactionItem key={index} name={item.print_content} type={item.tran_type} inout={item.inout_type} money={item.tran_amt}/>;
                })}
                { props.todayTransaction.length > 0 &&
                    <View style={styles.sumContainer}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.sumText}>입금 합계</Text>
                            <Text style={styles.plusText}>+ {props.plusSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.sumText}>출금 합계</Text>
                            <Text style={styles.minusText}>- {props.minusSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.resultText}>총계</Text>
                            <Text style={styles.resultText}>{(props.plusSum-props.minusSum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        </View>
                    </View>
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    bottomContainer: {
        flex: 1,
        backgroundColor: '#F0F4FA'
    },
    todayContiner: {
        margin: 8,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#203864',
    }, 
    todayText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    listContainer: {
        marginHorizontal: 7,
        paddingVertical: 7,
        paddingHorizontal: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    sumContainer: {
        marginHorizontal: 5,
        marginVertical: 10,
        paddingVertical: 7,
        alignItems: 'flex-end',
        borderTopWidth: 0.8,
        borderTopColor: '#203864',
    }, 
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        margin: 3,
    },
    sumText:{
        fontWeight: 'bold',
    } ,
    plusText: {
        color: 'blue',
        fontWeight: 'bold',
    },
    minusText: {
        color:'red',
        fontWeight: 'bold',
    },
    resultText: {
        color: '#203864',
        fontWeight: 'bold',
    }

});

export default TransactionList; 