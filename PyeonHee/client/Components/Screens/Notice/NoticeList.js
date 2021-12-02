import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../config';
import NoticeItem from './NoticeItem';
import { SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';

const url = config.url;
const NoticeList = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [noticeList, setNoticeList] = useState([]);

     //for test
     const temp = [
        {
            boardID: 2,
            boardCate: '티어',
            boardTitle: '안녕하세요 관리자입니다. 다들 잘 지내시나요?',
            boardDate: '2021-12-01',
        },
        {
            boardID: 1,
            boardCate: '포인트',
            boardTitle: '포인트 관련 공지사항입니다.',
            boardDate: '2021-11-28',
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
            console.log(`${url}/noticeList`);
            fetch(`${url}/noticeList`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setNoticeList(responseJson);
            })  
        })
    }, [])

    return (
        <View style={styles.appSize}>
            <View style={styles.HeaderDiv}>
                <Text style={styles.HeaderFont}>공지사항</Text>
            </View>
            <View style={styles.graphTitle}>
                <View style={styles.boardNumberDiv}><Text style={styles.graphFont}>번호</Text></View>
                <View style={styles.cateDiv}><Text style={styles.graphFont}>분류</Text></View>
                <View style={styles.titleDiv}><Text style={styles.graphFont}>제목</Text></View>
                <View style={styles.dateDiv}><Text style={styles.graphFont}>날짜</Text></View>
            </View>
            <ScrollView style={styles.appSize}>
                {temp.map(item => {
                    return <NoticeItem key={item.boardID} boardID={item.boardID} boardCate={item.boardCate} boardTitle={item.boardTitle} 
                    boardDate={item.boardDate} navigation={navigation}
                    />})
                }
            </ScrollView>
        </View>
    )
}

export default NoticeList;

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


    graphTitle:{
        height: 25,
        backgroundColor: '#778899',
        flexDirection: 'row',
        borderColor: 'gray',
    },
    boardNumberDiv: {
        width: 50,
        alignContent: 'center',
        justifyContent: 'center',
    },
    cateDiv: {
        width: 70,
        alignContent: 'center',
        justifyContent: 'center',
    },
    titleDiv:{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    dateDiv:{
        width: 100,
        alignContent: 'center',
        justifyContent: 'center',
    },
    graphFont:{
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});