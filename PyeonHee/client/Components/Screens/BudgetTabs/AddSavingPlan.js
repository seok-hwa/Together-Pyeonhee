import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../../../config';

const url = config.url;

const SavingPlan = (props) => {

    const [modalVisible, setModalVisible] = useState(false);

    const[savingName, setSavingName] = useState('');        //프로젝트 제목
    const[savingMoney, setSavingMoney] = useState(0);       //저금금액
    const[startDate, setStartDate] = useState(new Date());  //시작일
    const[savingsDay, setSavingsDay] = useState(0);         //매달 출금일
    const[period, setPeriod] = useState(0);                 //기간
    
    let now = new Date();
    let year = now.getFullYear();
    let todayMonth = now.getMonth()+1;
    let today = now.getDate()+1;
    
    const saveHandler = () => {

        if(parseInt(props.income) < parseInt(savingMoney)) {
            {
                alert('수입보다 저축액이 더 큽니다.');
                return;
            }
        }
        setModalVisible(!modalVisible);
        console.log(savingName);
        console.log(savingMoney);
        console.log(startDate);
        console.log(period);
        
        fetch(`${url}/saveSavingPlan`, {
            method: 'POST',
            body: JSON.stringify({
                savingName: savingName,
                insavingMoneycome: savingMoney,
                startDate: startDate,
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
          if(responseJson.status === true){
            console.log('제출 완료');
            // props.setAddSavingsPlan(true);
          }else{
            console.log('fail to submit.');
          }
        })
        .catch((error)=>{
          console.error(error);
        })
        props.setAddSavingsPlan(true);

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
                            <View style={{width: 80, height: 40, }} >
                                <Text>제목: </Text>
                            </View>
                            <View style={{width: 170, flexDirection: 'row', alignItems: 'center', }}>
                                <TextInput
                                    style={styles.textInputDesign}
                                    onChangeText={text => setSavingName(text)}
                                    maxLength = {20}
                                    textAlign="right"
                                />
                            </View>
                        </View>

                        <View style={styles.rowContainer}>
                            <View style={{width: 80, height: 40, }} >
                                <Text>저금 금액: </Text>
                            </View>
                            <View style={{width: 170, flexDirection: 'row', alignItems: 'center', }}>
                                <TextInput
                                    style={styles.textInputDesign}
                                    placeholder='0'
                                    onChangeText={text => setSavingMoney(text)}
                                    maxLength = {10}
                                    textAlign="right"
                                />
                                <Text>원</Text>
                            </View>
                        </View>

                        <View style={styles.rowContainer}>
                            <View style={{width: 80, height: 40, }} >
                                <Text>시작 날짜: </Text>
                            </View>
                            <View style={{width: 170, alignItems:'center'}}>
                                <Text>{year}년 {todayMonth}월 {today}일</Text>
                            </View>
                        </View>

                        <View style={styles.rowContainer}>
                            <View style={{width: 80, height: 40, }} >
                                <Text>출금일: </Text>
                            </View>
                            <View style={{width: 170, flexDirection: 'row', alignItems: 'center', }}>
                                <Text>매달</Text>
                                <TextInput
                                    style={styles.textInputDesign}
                                    onChangeText={text => setSavingsDay(text)}
                                    maxLength = {2}
                                    textAlign="right"
                                />
                                <Text>일</Text>
                            </View>
                        </View> 

                        <View style={styles.rowContainer}>
                            <View style={{width: 80, height: 40, }} >
                                <Text>기간: </Text>
                            </View>
                            <View style={{width: 170, flexDirection: 'row', alignItems: 'center', }}>
                                <TextInput
                                    style={styles.textInputDesign}
                                    onChangeText={text => setPeriod(text)}
                                    maxLength = {3}
                                    textAlign="right"
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
                                onPress={() => setModalVisible(!modalVisible)}>
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
                <Icon name={'add-circle-outline'} size={20} color={'gray'}/>
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
    },
    textInputDesign: {
        height: 35,
        width: 170,
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
})
export default SavingPlan;
