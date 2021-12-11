import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';

import BackButton from '../../Buttons/BackButton';
import MonthReportItem from './MonthReportItem';
import config from '../../../config';

const url = config.url;
const MonthReportCabinet = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [monthReportData, setMonthReportData] = useState([]);

    // let monthReportData = [
    //     {
    //         reportID: 1,
    //         year: 2021,
    //         month: 6,
    //         user_mbti: 'PHSE',
    //         income: 3000000,
    //         totalSavings: 1800000,
    //         daily_count: 20,

    //     },
    //     {
    //         reportID: 2,
    //         year: 2021,
    //         month: 7,
    //         user_mbti: 'PHSE',
    //         income: 4000000,
    //         totalSavings: 1900000,
    //         daily_count: 15,
    //     },
    //     {
    //         reportID: 3,
    //         year: 2021,
    //         month: 8,
    //         user_mbti: 'PHSE',
    //         income: 5000000,
    //         totalSavings: 1950000,
    //         daily_count: 11,
    //     },
    // ]

    useEffect(()=>{
        let tempID;
        AsyncStorage.getItem("userID")
        .then(
            (value) => {
                if (value !== null){
                    tempID=value
                    setUserID(tempID);
                }
            }
        )
        .then(()=>{
            console.log(tempID);
            console.log(`${url}/MonthReportCabinet?userID=${tempID}`);

            fetch(`${url}/MonthReportCabinet`, {
                    method: 'POST',
                    body: JSON.stringify({
                    userID: tempID,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json',
                },
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setMonthReportData(responseJson);
            })
            .then(()=>{
                setLoading(true);
            })  
        })
        // setLoading(true); //for test
    }, [])

    const loadCabinet = () => {
        setRefresh(true);

        fetch(`${url}/MonthReportCabinet`, {
            method: 'POST',
            body: JSON.stringify({
                userID: tempID,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log('response data');
            console.log(responseJson);
            setMonthReportData(responseJson);
        })
        .then(()=>{
            setRefresh(false);
        }) 
        // setRefresh(false);  //for test
    }

    if(loading === true){
        return (
            <View style={styles.appSize}>
                <View style={styles.appTopBar}>
                    <BackButton onPress={()=>{navigation.goBack()}}/>
                    <Text style={styles.appTopBarText}>한달 리포트 보관함</Text>
                </View>
                <View>
                    <FlatList
                        keyExtractor={item => item.reportID}
                        data={monthReportData}
                        renderItem={({item}) => <MonthReportItem userID={userID} /*reportID={item.reportID}*/ month={item.report_month.substring(4,6)} year={item.report_month.substring(0,4)}
                            navigation={navigation} userMbti={item.mbti} userIncome={item.income} totalSavings={item.savings} 
                            daily_count={item.progress_days} /*year={item.year}*/
                        />}
                        refreshing={refresh}
                        onRefresh={loadCabinet}
                    />
                </View>
            </View>
        )}
    else{
        return(
            <View style={styles.appSize}>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    appSize: {
        flex: 1,
        backgroundColor: '#F0F4FA'
    },
    appTopBar: {
        height: 50,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    }, 
    appTopBarText: {
        fontSize: 18,
        marginLeft: 10,
    }
})
export default MonthReportCabinet;