import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, ScrollView, TextInput} from 'react-native';
import QuerySubmitButton from '../../Buttons/QuerySubmitButton';
import RNPickerSelect from 'react-native-picker-select';
import { BOARDCATEGORY } from '../constants';
import { Root, Popup } from 'react-native-popup-confirm-toast';
import AsyncStorage from '@react-native-community/async-storage';
import BackButton from '../../Buttons/BackButton'
import { queryRegisterApi } from '../../api';

const QueryWrite = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [boardTitle, setBoardTitle] = useState('');
    const [boardCate, setBoardCate] = useState('');
    const [boardContent, setBoardContent] = useState('');
    
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
          Popup.show({
            type: 'success',
            textBody: '제목을 입력하세요.',
            buttonText: '확인',
            okButtonStyle: {backgroundColor: '#0000CD'},
            iconEnabled: false,
            callback: () => Popup.hide()
          })
          return;
        }
        if(!boardCate){
          Popup.show({
            type: 'success',
            textBody: '분류를 선택해주세요.',
            buttonText: '확인',
            okButtonStyle: {backgroundColor: '#0000CD'},
            iconEnabled: false,
            callback: () => Popup.hide()
          })
          return;
        }
        if(!boardContent){
            Popup.show({
              type: 'success',
              textBody: '내용을 입력해주세요.',
              buttonText: '확인',
              okButtonStyle: {backgroundColor: '#0000CD'},
              iconEnabled: false,
              callback: () => Popup.hide()
            })
            return;
        }
        queryRegisterApi(boardTitle, boardCate, boardContent, userID)
        .then((responseJson)=>{
        console.log(responseJson);
            if(responseJson.status === 'success'){
                Popup.show({
                    type: 'success',
                    textBody: '등록이 완료되었습니다.',
                    buttonText: '확인',
                    okButtonStyle: {backgroundColor: '#0000CD'},
                    iconEnabled: false,
                    callback: () => {
                        Popup.hide();
                        navigation.replace('ServiceCenter');
                    }
                })
            }else{
                console.log('등록 실패');
            }
        })
        .catch((error)=>{
            console.error(error);
        })
      }

    return (
        <Root>
            <View style={styles.appSize}>
                <View style={styles.appTopBar}>
                    <BackButton onPress={()=>{navigation.goBack()}}/>
                    <View style={styles.headerDiv}>
                    <Text style={styles.topFont}>문의게시판 등록</Text>
                    </View>
                    <View style={styles.headerRightDiv}></View>
                </View>
                <View style={styles.TopDiv}>
                    <View style={styles.TitleDiv}>
                        <Text style={styles.TitleLeft}>제목: </Text>
                        <TextInput 
                            style={styles.textInputDesign}
                            placeholder='제목'
                            onChangeText={(boardTitle) => setBoardTitle(boardTitle)}
                            maxLength ={45}
                        />
                    </View>
                    <View style={styles.CateDiv}>
                        <Text style={styles.CateLeft}>분류: </Text>
                        <View>
                        <RNPickerSelect
                            placeholder={{
                            label: '선택',
                            color: 'gray',
                            }}
                            style={pickerSelectStyles}
                                onValueChange={(value) => setBoardCate(value)}
                                items={BOARDCATEGORY}
                        />
                        </View>
                    </View>
                </View>
                    <TextInput 
                        style={styles.textInputBodyDesign}
                        placeholder='내용'
                        onChangeText={(boardContent) => setBoardContent(boardContent)}
                        maxLength ={1024}
                    />
                <View style={styles.ButtonDiv}>
                    <QuerySubmitButton onPress={handleSubmitButton}/>
                </View>
            </View>
        </Root>
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
});
const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        height: 30, 
        width: 200,
        backgroundColor: 'white', 
        borderRadius: 3,
        fontSize: 10,
    },
});
export default QueryWrite;