import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../config';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import QueryWriteButton from '../../Buttons/QueryWriteButton';
import QueryItem from './QueryItem';

const url = config.url;
const QueryList = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [queryList, setQueryList] = useState([]);

     //for test
     const temp = [
        {
            boardID: 2,
            boardCate: '티어',
            boardTitle: '안녕하세요 관리자입니다. 다들 잘 지내시나요?',
            boardDate: '2021-12-01',
            boardAnswer: false,
        },
        {
            boardID: 1,
            boardCate: '포인트',
            boardTitle: '포인트 관련 공지사항입니다.',
            boardDate: '2021-11-28',
            boardAnswer: true,
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
            console.log(`${url}/queryList`);
            fetch(`${url}/queryList`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setQueryList(responseJson);
            })  
        })*/
    }, [])

    return (
        <View style={styles.appSize}>
            <View style={styles.HeaderDiv}>
                <Text style={styles.HeaderFont}>고객센터</Text>
            </View>
            <View style={styles.ButtonDiv}>
                <QueryWriteButton />
            </View>
            <View style={styles.graphTitle}>
                <View style={styles.cateDiv}><Text style={styles.graphFont}>분류</Text></View>
                <View style={styles.titleDiv}><Text style={styles.graphFont}>제목</Text></View>
                <View style={styles.dateDiv}><Text style={styles.graphFont}>날짜</Text></View>
                <View style={styles.answerDiv}><Text style={styles.graphFont}>답변</Text></View>
            </View>
            <ScrollView style={styles.appSize}>
                {temp.map(item => {
                    return <QueryItem key={item.boardID} boardID={item.boardID} boardCate={item.boardCate} boardTitle={item.boardTitle} 
                    boardDate={item.boardDate} navigation={navigation} boardAnswer={item.boardAnswer}
                    />})
                }
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
    ButtonDiv: {
        height: 40,
        alignItems: 'flex-end',
    },

    graphTitle:{
        height: 25,
        backgroundColor: '#778899',
        flexDirection: 'row',
        borderColor: 'gray',
        marginTop: 10,
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
    answerDiv: {
        width: 40,
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