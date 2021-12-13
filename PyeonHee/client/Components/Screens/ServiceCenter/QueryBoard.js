import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import QueryDeleteButton from '../../Buttons/QueryDeleteButton';
import QueryUpdateButton from '../../Buttons/QueryUpdateButton';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast';
import BackButton from '../../Buttons/BackButton';
import { queryBoardApi, queryReplyApi, deleteQueryBoardApi } from '../../api';

const QueryBoard = ({navigation, route}) => {
    const [userID, setUserID] = useState('');
    const [boardTitle, setBoardTitle] = useState('');
    const [boardCate, setBoardCate] = useState('');
    const [boardDate, setBoardDate] = useState('');
    const [boardContent, setBoardContent] = useState('');
    const [boardAnswer, setBoardAnswer] = useState(true);

    const [loading, setLoading] = useState(true);

    const [answerDate, setAnswerDate] = useState('');
    const [answerContent, setAnswerContent] = useState('');
    
    
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
            queryBoardApi(route.params.boardID)
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
                    queryReplyApi(route.params.boardID)
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
                deleteQueryBoardApi(route.params.boardID)
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
            <View style={styles.appTopBar}>
                <BackButton onPress={()=>{navigation.goBack()}}/>
                <View style={styles.headerDiv}>
                  <Text style={styles.topFont}>문의게시판 확인</Text>
                </View>
                <View style={styles.headerRightDiv}></View>
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
            <View style={styles.appTopBar}>
                <BackButton onPress={()=>{navigation.goBack()}}/>
                <View style={styles.headerDiv}>
                  <Text style={styles.topFont}>문의게시판 확인</Text>
                </View>
                <View style={styles.headerRightDiv}></View>
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
         <View style={styles.appTopBar}>
                <BackButton onPress={()=>{navigation.goBack()}}/>
                <View style={styles.headerDiv}>
                  <Text style={styles.topFont}>문의게시판 확인</Text>
                </View>
                <View style={styles.headerRightDiv}></View>
        </View>
     </View>
    );
}
};

const styles = StyleSheet.create({
    appSize: {
        flex: 1,
    },
    appTopBar: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      headerDiv: {
          height: 40,
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: 1,
      },
      headerRightDiv:{
        width: 30,
      },
      topFont: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
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