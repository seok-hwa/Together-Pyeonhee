import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Modal, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../../../config';
import { Root, Popup } from 'react-native-popup-confirm-toast';

const url = config.url;

const SavingPlan = (props) => {
    const [userID, setUserId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const[savingName, setSavingName] = useState("");        //프로젝트 제목
    const[savingMoney, setSavingMoney] = useState("");       //저금금액
    const[startDate, setStartDate] = useState(new Date());  //시작일
    const[savingsDay, setSavingsDay] = useState(0);         //매달 저금(출금)일
    const[period, setPeriod] = useState(0);                 //기간
    
    let now = new Date();
    let year = now.getFullYear();
    let todayMonth = now.getMonth()+1;
    let today = now.getDate()+1;
    
    const saveHandler = () => {
        let tempIncome = props.income;
        console.log('수입: ', tempIncome);

        
        if(parseInt(tempIncome.split(",").join("")) < parseInt(savingMoney.split(",").join(""))) {
            alert('수입보다 저축액이 더 큽니다.');
            return;
        }

        console.log('저축 제목: ', savingName);
        console.log('저축 제목 길이: ', savingName.length);
        if(savingName.length === 0) {
            alert('제목을 작성해주세요.');
            return;
            
        }
        
        console.log('저금일: ', savingsDay);
        if(savingsDay === 0 || savingsDay > 31) {
            alert('저금일을 1 ~ 31일 사이로 선택해주세요.');
            return;
        }

        console.log('기간: ', period);
        if(period < 1) {
            alert('기간은 최소 1개월 이상 설정해주세요.');
            return;
        }

        setModalVisible(!modalVisible);
        console.log(savingName);
        console.log(savingMoney);
        console.log(startDate);
        console.log(savingsDay);
        console.log(period);
        
        fetch(`${url}/saveSavingPlan`, {
            method: 'POST',
            body: JSON.stringify({
                userID: userID,
                savingName: savingName,
                savingMoney: parseInt(savingMoney.split(",").join("")),
                startDate: startDate,
                savingsDay: savingsDay,
                period: period,    //기간으로 변경함 
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
          console.log(responseJson);
        //   if(responseJson.status === true){
        //     console.log('제출 완료');
        //     // props.setAddSavingsPlan(true);
        //   }else{
        //     console.log('fail to submit.');
        //   }
        })
        // .catch((error)=>{
        //   console.error(error);
        // })
        props.setAddSavingsPlan(true);

    }

    const cancleHandler = () => {
        props.setAddSavingsPlan(false);
        setSavingName("");
        setSavingMoney("");
        setSavingsDay(0);
        setPeriod(0);

        setModalVisible(!modalVisible);
    }

    useEffect(()=>{
        AsyncStorage.getItem('userID', (err, result) => {
          let tempID = result;
          if(tempID!= null){
            setUserId(tempID);
          }
        })
    }, [])

    const handleSavingMoney = (text) => {
        let tempText = text.split(",").join("");

        if(parseInt(tempText) === 0){
            setSavingMoney("");
        } else if ( parseInt(tempText) > 0 && tempText.substring(0, 1) === "0") {
            setSavingMoney(tempText.substring(1).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        } else if ( parseInt(tempText) > 0) {
            setSavingMoney(tempText.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        } 
        else{
            setSavingMoney("");
        }
    }

    return (
        <View>
            <Modal
                animationType = {"slide"}
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                 alert('Modal has now been closed.');
                 setModalVisible(!modalVisible);
                }}
            >
                
                <View style={styles.centeredView}>
                
                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>저금 계획</Text>
                        
                        <View style={styles.rowContainer}>
                            <View style={styles.tagText} >
                                <Text>제목: </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.textInputDesign}
                                    onChangeText={text => setSavingName(text)}
                                    value={savingName}
                                    maxLength = {20}
                                    textAlign="right"
                                />
                            </View>
                        </View>

                        <View style={styles.rowContainer}>
                            <View style={styles.tagText} >
                                <Text>저금 금액: </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.textInputDesign}
                                    // placeholder='0'
                                    onChangeText={text => handleSavingMoney(text)}
                                    value={savingMoney}
                                    maxLength = {10}
                                    textAlign="right"
                                    keyboardType="numeric"
                                />
                                <Text>원</Text>
                            </View>
                        </View>

                        <View style={styles.rowContainer}>
                            <View style={styles.tagText} >
                                <Text>시작 날짜: </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text>{year}년 {todayMonth}월 {today}일</Text>
                            </View>
                        </View>

                        <View style={styles.rowContainer}>
                            <View style={styles.tagText} >
                                <Text>저금일: </Text>
                            </View>
                            <View style={[styles.inputContainer, {justifyContent: 'space-between'}]}>
                                <Text>매달</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <TextInput
                                        style={styles.textInputDesign}
                                        // placeholder='1~31일 중 선택하세요'
                                        onChangeText={text => setSavingsDay(text)}
                                        maxLength = {2}
                                        textAlign="right"
                                        keyboardType="numeric"
                                    />
                                <Text>일</Text>
                                </View>
                            </View>
                        </View> 

                        <View style={styles.rowContainer}>
                            <View style={styles.tagText} >
                                <Text>기간: </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.textInputDesign}
                                    // placeholder='0'
                                    onChangeText={text => setPeriod(text)}
                                    // value={period}
                                    maxLength = {3}
                                    textAlign="right"
                                    keyboardType="numeric"
                                />
                                <Text>개월</Text>
                            </View>
                        </View> 

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={saveHandler}>
                                <Text>추가</Text>
                            </TouchableOpacity> 
                            <TouchableOpacity
                                style={styles.button}
                                onPress={cancleHandler}>
                                <Text>취소</Text>
                            </TouchableOpacity> 
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
                {/* <Icon name={'add-circle-outline'} size={20} color={'gray'}/> */}
                {/* <View style={{backgroundColor: 'pink', justifyContent: 'flex-end',}}>
                    <Text style={styles.addButtonStyle}> 추가하기 </Text>
                </View> */}
                <Image source={require('../assets/add.png')} style={{width: 18, height: 18, tintColor: 'gray'}}/>
                {/* <Text style={styles.addButtonStyle}> 추가하기 </Text> */}
            </TouchableOpacity>  
        </View>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 10,
        width: 350,
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        borderWidth: 0.5,
        justifyContent: 'space-between',
    },
    modalText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    rowContainer: {
        padding: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tagText: {
        width: 80,
        height: 40, 
        // backgroundColor: 'pink',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        paddingLeft: 5,
        paddingRight: 5,
        width: 200, 
        height: 35,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-end',
        borderRadius: 10,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        // backgroundColor:'yellow'
    },
    textInputDesign: {
        height: 35,
        width: 100,
        marginRight: 5, 
        borderRadius: 10,
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
    },
    buttonContainer: {
        marginTop: 20, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: "center",
    },
    button: {
        backgroundColor: '#6090FA',
        color: 'black',
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10
      },
      addButtonStyle: {
        color: 'blue',
      }
})
export default SavingPlan;
