import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, ScrollView, TextInput} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import QuerySubmitButton from '../../Buttons/QuerySubmitButton';
import RNPickerSelect from 'react-native-picker-select';
import { BOARDCATEGORY } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import BackButton from '../../Buttons/BackButton'
import { queryUpdateApi } from '../../api';

const QueryUpdate = ({navigation, route}) => {
    const [userID, setUserID] = useState('');
    const [boardTitle, setBoardTitle] = useState(route.params.boardTitle);
    const [boardCate, setBoardCate] = useState(route.params.boardCate);
    const [boardContent, setBoardContent] = useState(route.params.boardContent);
    
    useEffect(()=>{
        let tempID;
        AsyncStorage.getItem('userID', (err, result) => {
            tempID = result;
            if(tempID!= null){
                setUserID(tempID);
            }
        })
    }, [])

    const handleSubmitButton = () => {
        if(!boardTitle){
            alert('제목을 입력하세요.');
          return;
        }
        if(!boardCate){
            alert('분류를 선택해주세요.');
          return;
        }
        if(!boardContent){
            alert('내용을 입력해주세요.');
            return;
        }
        queryUpdateApi(boardTitle, boardCate, boardContent, route.params.boardID)
        .then((responseJson)=>{
            console.log(responseJson);
            if(responseJson.status === 'success'){
                alert('수정이 완료되었습니다.');
                navigation.replace('ServiceCenter');
            }else{
                console.log('수정 실패');
            }
        })
        .catch((error)=>{
            console.error(error);
        })
      }

    return (
        <View style={styles.appSize}>
            <View style={styles.appTopBar}>
                <BackButton onPress={()=>{navigation.goBack()}}/>
                <View style={styles.headerDiv}>
                <Text style={styles.topFont}>문의게시판 수정</Text>
                </View>
                <View style={styles.headerRightDiv}></View>
            </View>
            <View style={styles.TopDiv}>
                <View style={styles.TitleDiv}>
                    <Text style={styles.TitleLeft}>제목: </Text>
                    <TextInput 
                        style={styles.textInputDesign}
                        onChangeText={(boardTitle) => setBoardTitle(boardTitle)}
                        maxLength ={45}
                        value={boardTitle}
                    />
                </View>
                <View style={styles.CateDiv}>
                    <Text style={styles.CateLeft}>분류: </Text>
                    <View style={styles.pickerDiv}>
                        <RNPickerSelect
                            placeholder={{
                            label: '선택',
                            color: 'gray',
                            }}
                            onValueChange={(value) => setBoardCate(value)}
                            items={BOARDCATEGORY}
                            value={boardCate}
                        /> 
                    </View>
                </View>
            </View>
                <TextInput 
                    style={styles.textInputBodyDesign}
                    placeholder='내용'
                    onChangeText={(boardContent) => setBoardContent(boardContent)}
                    maxLength ={1024}
                    value={boardContent}
                />
            <View style={styles.ButtonDiv}>
                <QuerySubmitButton onPress={handleSubmitButton}/>
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
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    TitleLeft:{
        fontSize: 16,
    },
    TitleRight:{
        fontSize: 16,
        fontWeight: 'bold',
    },

    CateDiv: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        marginBottom: 15,
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
        flex: 5,
        margin: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 5,
    },
    ButtonDiv : {
        flex: 1,
        alignItems: 'center',
    },

    textInputDesign: {
        height: 50,
        width: '90%',
        borderRadius: 3,
        backgroundColor: 'white',
        fontSize: 15,
    },
    textInputBodyDesign: {
        borderRadius: 10,
        flex: 5,
        margin: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 5,
        textAlignVertical: "top",
        fontSize: 15,
    },
    pickerDiv: {
        backgroundColor: '#DCDCDC',
        marginTop: 10,
        paddingHorizontal: 10,
        height: 40,
        width: 240,
        borderRadius: 3,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
});
export default QueryUpdate;