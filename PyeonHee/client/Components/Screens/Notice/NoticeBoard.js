import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const NoticeBoard = ({route}) => {
    const [boardTitle, setBoardTitle] = useState('안녕하세요!!!');
    const [boardCate, setBoardCate] = useState('티어');
    const [boardDate, setBoardDate] = useState('2021-12-02');
    const [boardContent, setBoardContent] = useState('안녕하세요 관리자입니다.ㄴㅇㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ');
    
    /*
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
            fetch(`${url}/noticeBoard/boardID=${route.params.boardID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setBoardTitle(responseJson.boardTitle);
                setBoardCate(responseJson.boardCate);
                setBoardDate(responseJson.boardDate);
                setBoardContent(responseJson.boardContent);
            })  
        })
    }, [])
    */
    return (
        <View style={styles.appSize}>
            <View style={styles.TopDiv}>
                <View style={styles.HeaderDiv}>
                    <Text style={styles.HeaderFont}>공지글 확인</Text>
                </View>
                <View style={styles.TitleDiv}>
                    <Text style={styles.TitleLeft}>제목: </Text>
                    <Text style={styles.TitleRight}>{boardTitle}</Text>
                </View>
                <View style={styles.CateDiv}>
                    <Text style={styles.CateLeft}>분류: </Text>
                    <Text style={styles.CateRight}>{boardCate}</Text>
                </View>
                <Text>날짜: {boardDate}</Text>
            </View>
            <View style={styles.BodyDiv}>
                <Text>{boardContent}</Text>
            </View>
        </View>
    );
};

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


    TitleDiv:{
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    TitleLeft:{
        fontSize: 16,
    },
    TitleRight:{
        fontSize: 16,
        fontWeight: 'bold',
    },

    CateDiv: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    CateLeft: {
        fontSize: 15,
    },
    CateRight:{
        fontSize: 15,
        fontWeight: 'bold',
    },

    TopDiv: {
        margin: 5,
    },
    BodyDiv: {
        borderRadius: 10,
        flex: 1,
        margin: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 5,
    }
});

export default NoticeBoard;