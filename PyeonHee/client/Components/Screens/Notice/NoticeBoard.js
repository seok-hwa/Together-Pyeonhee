import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../config';
import BackButton from '../../Buttons/BackButton';

const url = config.url;

const NoticeBoard = ({navigation, route}) => {
    const [userID, setUserID] = useState('');
    const [boardTitle, setBoardTitle] = useState('');
    const [boardCate, setBoardCate] = useState('');
    const [boardDate, setBoardDate] = useState('');
    const [boardModifiedDate, setBoardModifiedDate] = useState('');
    const [boardContent, setBoardContent] = useState('');
    
    
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
            console.log(`${url}/noticeBoard?boardID=${route.params.boardID}`);
            fetch(`${url}/noticeBoard?boardID=${route.params.boardID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setBoardTitle(responseJson.boardTitle);
                setBoardCate(responseJson.boardCate);
                setBoardDate(responseJson.boardDate);
                setBoardModifiedDate(responseJson.boardModiDate);
                setBoardContent(responseJson.boardContent);
            })  
        })
    }, [])
    
    return (
        <View style={styles.appSize}>
            <View style={styles.appTopBar}>
                <BackButton onPress={()=>{navigation.goBack()}}/>
                <View style={styles.headerDiv}>
                  <Text style={styles.topFont}>공지글 확인</Text>
                </View>
                <View style={styles.headerRightDiv}></View>
            </View>
            <View style={styles.TopDiv}>
                <View style={styles.TitleDiv}>
                    <Text style={styles.TitleLeft}>제목: </Text>
                    <Text style={styles.TitleRight}>{boardTitle}</Text>
                </View>
                <View style={styles.CateDiv}>
                    <Text style={styles.CateLeft}>분류: </Text>
                    <Text style={styles.CateRight}>{boardCate}</Text>
                </View>
                {
                    boardDate === boardModifiedDate ?
                    <Text>등록일: {boardDate.substring(0,16).replace('T', ' ')}</Text>:
                    <View>
                        <Text>등록일: {boardDate.substring(0,16).replace('T', ' ')}</Text>
                        <Text>수정일: {boardModifiedDate.substring(0,16).replace('T', ' ')}</Text>
                    </View>
                }
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
        flex: 1,
        margin: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 5,
    }
});

export default NoticeBoard;