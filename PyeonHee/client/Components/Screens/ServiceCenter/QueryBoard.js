import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, ScrollView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../config';
import QueryDeleteButton from '../../Buttons/QueryDeleteButton';
import QueryUpdateButton from '../../Buttons/QueryUpdateButton';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast';

const url = config.url;

const QueryBoard = ({navigation, route}) => {
    const [userID, setUserID] = useState('');
    const [boardTitle, setBoardTitle] = useState('');
    const [boardCate, setBoardCate] = useState('');
    const [boardDate, setBoardDate] = useState('');
    const [boardContent, setBoardContent] = useState('');
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
    const deleteButton = () => {
        Popup.show({
            type: 'confirm',
            title: '삭제',
            textBody: '문의글을 삭제 하시겠습니까?',
            buttonText: 'yes',
            confirmText: 'no',
            okButtonStyle: {backgroundColor: '#0000CD'},
            iconEnabled: false,
            callback: () => {
              fetch(`${url}/deleteQueryBoard?boardID=${route.params.boardID}`)  
                .then((response)=>response.json())
                .then((responseJson)=>{
                    console.log(responseJson);
                    if(responseJson.status === true){
                        console.log('삭제 완료');
                        Popup.show({
                            type: 'success',
                            textBody: '문의글이 삭제되었습니다.',
                            buttonText: '확인',
                            okButtonStyle: {backgroundColor: '#0000CD'},
                            iconEnabled: false,
                            callback: () => {
                                Popup.hide()
                                navigation.replace('ServiceCenter');
                            }
                        })
                    }else{
                        console.log('fail to save.');
                        alert('문의글 삭제 실패');
                    }
                })
                .catch((error)=>{
                    console.error(error);
                })
            }
        })
    }
   if(boardAnswer === true && loading === true){
    return (
    <Root>
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
                    <Text>작성자: {route.params.user_id}</Text>
                    <Text>날짜: {boardDate.substring(0,16).replace('T', ' ')}</Text>
                    <Text style={{color: 'blue',}}>답변이 있습니다.</Text>
                </View>
                <View style={styles.BodyDiv}>
                    <Text>{boardContent}</Text>
                </View>
                <View style={styles.TopDiv}>
                    <Text>답변 날짜: {answerDate.substring(0,16).replace('T', ' ')}</Text>
                </View>
                <View style={styles.BodyDiv}>
                    <Text>{answerContent}</Text>
                </View>
                {
                    userID === route.params.user_id ?
                    <View style={styles.buttonDiv}>
                        <QueryUpdateButton onPress={()=>{navigation.navigate('QueryUpdate', {boardTitle: boardTitle, boardCate: boardCate, boardContent: boardContent, boardID: route.params.boardID,})}}/>
                        <QueryDeleteButton onPress={deleteButton}/>
                    </View>:
                    <View></View>
                }
            </ScrollView>
        </View>
    </Root>
    );
   }
   else if(boardAnswer === false && loading === true){
       return(
        <Root>
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
                    <Text>작성자: {route.params.user_id}</Text>
                    <Text>날짜: {boardDate.substring(0,16).replace('T', ' ')}</Text>
                    <Text style={{color: 'red',}}>답변이 아직 없습니다.</Text>
                </View>
                <View style={styles.BodyDiv}>
                    <Text>{boardContent}</Text>
                </View>
                {
                    userID === route.params.user_id ?
                    <View style={styles.buttonDiv}>
                        <QueryUpdateButton onPress={()=>{navigation.navigate('QueryUpdate', {boardTitle: boardTitle, boardCate: boardCate, boardContent: boardContent, boardID: route.params.boardID,})}}/>
                        <QueryDeleteButton onPress={deleteButton}/>
                    </View>:
                    <View></View>
                }
            </ScrollView>
        </View>
        </Root>
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
    },
    buttonDiv :{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default QueryBoard;