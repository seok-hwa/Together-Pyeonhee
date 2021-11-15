import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../../../config';

const url = config.url;

const SavingPlan = (props) => {

    const [modalVisible, setModalVisible] = useState(false);

    const[savingName, setSavingName] = useState('');
    const[savingMoney, setSavingMoney] = useState(0);
    const[startDate, setStartDate] = useState(new Date());
    // const[finishDate, setFinishDate] = useState('');
    const[duration, setDuration] = useState(0);

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
        console.log(duration);
        
        fetch(`${url}/saveBudgetPlan`, {
            method: 'POST',
            body: JSON.stringify({
                savingName: savingName,
                insavingMoneycome: savingMoney,
                startDate: startDate,
                duration: duration,    //기간으로 변경함 
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
          }else{
            console.log('fail to submit.');
          }
        })
        .catch((error)=>{
          console.error(error);
        })

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
                        
                        <View style={styles.container}>
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

                        <View style={styles.container}>
                            <View style={{width: 80, height: 40, }} >
                                <Text>저금 금액: </Text>
                            </View>
                            <View style={{width: 170, flexDirection: 'row', alignItems: 'center', }}>
                                <TextInput
                                    style={styles.textInputDesign}
                                    placeholder='0'
                                    onChangeText={text => setSavingMoney(text)}
                                    maxLength = {20}
                                    textAlign="right"
                                />
                                <Text>원</Text>
                            </View>
                        </View>

                        <View style={styles.container}>
                            <View style={{width: 80, height: 40, }} >
                                <Text>시작 날짜: </Text>
                            </View>
                            <View style={{width: 170, alignItems:'center'}}>
                                <Text>{year}년 {todayMonth}월 {today}일</Text>
                            </View>
                        </View>

                        <View style={styles.container}>
                            <View style={{width: 80, height: 40, }} >
                                <Text>기간: </Text>
                            </View>
                            <View style={{width: 170, flexDirection: 'row', alignItems: 'center', }}>
                                <TextInput
                                    style={styles.textInputDesign}
                                    onChangeText={text => setDuration(text)}
                                    maxLength = {20}
                                    textAlign="right"
                                />
                                <Text>개월</Text>
                            </View>
                        </View> 

                        <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: "center",}}>
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
    container: {
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
