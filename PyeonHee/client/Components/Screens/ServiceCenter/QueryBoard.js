import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, ScrollView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../config';

const url = config.url;

const QueryBoard = ({route}) => {
    const [userID, setUserID] = useState('');
    const [boardTitle, setBoardTitle] = useState('티어가 안 오르는 것 같습니다..');
    const [boardCate, setBoardCate] = useState('티어');
    const [boardDate, setBoardDate] = useState('2021-12-02');
    const [boardContent, setBoardContent] = useState('분명 스탬프 다 채웠는데 안 오르네요..');
    const [boardAnswer, setBoardAnswer] = useState(true);

    const [loading, setLoading] = useState(true);

    const [answerDate, setAnswerDate] = useState('2021-12-02');
    const [answerContent, setAnswerContent] = useState('확인해보겠습니다.');
    
    
    useEffect(()=>{
        let tempID;
        let tempBoardAnswer;
        AsyncStorage.getItem('userID', (err, result) => {
            tempID = result;
            if(tempID!= null){
                setUserID(tempID);
            }
        })
        .then(()=>{
            console.log(tempID);
            console.log(`${url}/queryBoard?boardID=${route.params.boardID}`);
            fetch(`${url}/queryBoard?boardID=${route.params.boardID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setBoardTitle(responseJson.boardTitle);
                setBoardCate(responseJson.boardCate);
                setBoardDate(responseJson.boardDate);
                setBoardContent(responseJson.boardContent);
                setBoardAnswer(responseJson.boardAnswer);
                tempBoardAnswer = responseJson.boardAnswer;
            })
            .then(()=>{
                if(tempBoardAnswer === true){
                    fetch(`${url}/queryReply?boardID=${route.params.boardID}`)   //get
                    .then((response)=>response.json())
                    .then((responseJson)=>{
                        console.log('response data');
                        console.log(responseJson);
                        setAnswerDate(responseJson.answerDate);
                        setAnswerContent(responseJson.answerContent);
                    })
                }
            })
            .then(()=>{
                setLoading(true);
            })
        })
    }, [])

   if(boardAnswer === true && loading === true){
    return (
        <View style={styles.appSize}>
            <View style={styles.HeaderDiv}>
                <Text style={styles.HeaderFont}>문의게시판 확인</Text>
            </View>
            <ScrollView style={styles.appSize}>
                <View style={styles.TopDiv}>
                    <View style={styles.TitleDiv}>
                        <Text style={styles.TitleLeft}>제목: </Text>
                        <Text style={styles.TitleRight}>{boardTitle}</Text>
                    </View>
                    <View style={styles.CateDiv}>
                        <Text style={styles.CateLeft}>분류: </Text>
                        <Text style={styles.CateRight}>{boardCate}</Text>
                    </View>
                    <Text>날짜: {boardDate}</Text>
                    <Text style={{color: 'blue',}}>답변이 있습니다.</Text>
                </View>
                <View style={styles.BodyDiv}>
                    <Text>{boardContent}</Text>
                </View>
                <View style={styles.TopDiv}>
                    <Text>답변 날짜: 2021-12-02</Text>
                </View>
                <View style={styles.BodyDiv}>
                    <Text>확인해보겠습니다.</Text>
                </View>
            </ScrollView>
        </View>
    );
   }
   else if(boardAnswer === false && loading === true){
       return(
        <View style={styles.appSize}>
            <View style={styles.HeaderDiv}>
                <Text style={styles.HeaderFont}>문의게시판 확인</Text>
            </View>
            <ScrollView style={styles.appSize}>
                <View style={styles.TopDiv}>
                    <View style={styles.TitleDiv}>
                        <Text style={styles.TitleLeft}>제목: </Text>
                        <Text style={styles.TitleRight}>{boardTitle}</Text>
                    </View>
                    <View style={styles.CateDiv}>
                        <Text style={styles.CateLeft}>분류: </Text>
                        <Text style={styles.CateRight}>{boardCate}</Text>
                    </View>
                    <Text>날짜: {boardDate}</Text>
                    <Text style={{color: 'red',}}>답변이 아직 없습니다.</Text>
                </View>
                <View style={styles.BodyDiv}>
                    <Text>{boardContent}</Text>
                </View>
            </ScrollView>
        </View>
       );
   }
   else if(loading === false){
    return(
     <View style={styles.appSize}>
         <View style={styles.HeaderDiv}>
             <Text style={styles.HeaderFont}>문의게시판 확인</Text>
         </View>
     </View>
    );
}
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
        height: 450,
        margin: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 5,
    }
});

export default QueryBoard;