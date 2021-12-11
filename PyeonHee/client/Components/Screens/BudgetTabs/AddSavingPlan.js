import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Modal, Image, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Root, Popup } from 'react-native-popup-confirm-toast';
import { saveSavingPlan } from '../../api';

const SavingPlan = (props) => {
    const [userID, setUserId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const[savingName, setSavingName] = useState("");        //프로젝트 제목
    const[savingMoney, setSavingMoney] = useState("");      //저금금액
    const[startDate, setStartDate] = useState(new Date());  //시작일
    const[endYear, setEndYear] = useState("");              //마감 연도
    const[endMonth, setEndMonth] = useState("");            //마감 월

    // const[savingsDay, setSavingsDay] = useState(0);         //매달 저금(출금)일
    // const[period, setPeriod] = useState(0);                 //기간
    
    let now = new Date();
    let year = now.getFullYear();
    let todayMonth = now.getMonth()+1;
    // let today = now.getDate()+1;
    
    const saveHandler = () => {
        let tempIncome = props.income;
        console.log('수입: ', tempIncome);

        
        if(parseInt(tempIncome.split(",").join("")) < parseInt(savingMoney.split(",").join(""))) {
            Alert.alert(' ','수입보다 저축액이 더 큽니다.');
            return;
        }

        console.log('저축 제목: ', savingName);
        console.log('저축 제목 길이: ', savingName.length);
        if(savingName.length === 0) {
            Alert.alert(' ','제목을 작성해주세요.');
            return;
            
        }

        if(parseInt(endMonth) > 12) {
            Alert.alert(' ','기간은 1 ~ 12 월 중에 선택해주세요.');
            return;      
        }
      
        if(parseInt(endYear) < year) {
            Alert.alert(' ','기간은 최소 1개월 이상이어야 합니다.');
            return;
        }
      
        if(parseInt(endYear) === year && parseInt(endMonth) < todayMonth) {
            Alert.alert(' ','기간은 최소 1개월 이상이어야 합니다.');
            return;
        }

        setModalVisible(!modalVisible);
        console.log(savingName);
        console.log(savingMoney);
        console.log(startDate);
        
        saveSavingPlan(userID, savingName, parseInt(savingMoney.split(",").join("")), startDate, parseInt(endYear), parseInt(endMonth))
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
        setEndMonth("");
        setEndYear("");

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
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                //  alert('Modal has now been closed.');
                 setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>

                    {/* <View style={styles.titleContainer}>
                        <Text style={styles.modalText}>저금 계획</Text>
                    </View> */}
                
                    <View style={styles.modalView}>

                        <View style={styles.titleContainer}>
                            <Text style={styles.modalText}>저금 계획</Text>
                        </View>
                        
                        <View style={styles.rowContainer}>
                            <View style={styles.tagText} >
                                <Text style={styles.categoryText}>제목</Text>
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
                                <Text style={styles.categoryText}>저금금액</Text>
                            </View>
                            <View style={[styles.inputContainer, {justifyContent: 'space-between'}]}>
                                <Text>매달</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <TextInput
                                        style={styles.textInputDesign}
                                        // placeholder='1~31일 중 선택하세요'
                                        onChangeText={text => handleSavingMoney(text)}
                                        maxLength = {10}
                                        textAlign="right"
                                        keyboardType="numeric"
                                    />
                                <Text>일</Text>
                                </View>
                            </View>
                        </View> 

                        <View style={styles.rowContainer}>
                            <View style={styles.tagText} >
                                <Text style={styles.categoryText}>기간</Text>
                            </View>
                            <View style={styles.dateContainer}>
                                <Text style={{fontSize: 14, color: 'black'}}>{year}년 {todayMonth}월 ~ </Text>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={[styles.dateInputContainer, {width: 90, marginRight: 10,}]}>
                                    <TextInput
                                        style={styles.yearInputDesign}
                                        onChangeText={text => setEndYear(text)}
                                        value={endYear}
                                        maxLength = {4}
                                        keyboardType="numeric"
                                        textAlign="right"
                                    />
                                    <Text>년</Text>
                                    </View>
                                    <View style={[styles.dateInputContainer, {width: 60}]}>
                                    <TextInput
                                        style={styles.monthInputDesign}
                                        onChangeText={text => setEndMonth(text)}
                                        value={endMonth}
                                        maxLength = {2}
                                        keyboardType="numeric"
                                        textAlign="right"
                                    />
                                    <Text>월</Text>
                                    </View>
                                </View>
                                </View>
                        </View> 

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={cancleHandler}>
                                <Text style={{color: '#203864'}}>취소</Text>
                            </TouchableOpacity> 
                            <TouchableOpacity
                                style={styles.button}
                                onPress={saveHandler}>
                                <Text style={{color: '#203864'}}>추가</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    modalView: {
        borderRadius: 20,
        paddingVertical: 50,
        paddingHorizontal: 37,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor:'#203864',
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    rowContainer: {
        padding: 3,
        // backgroundColor: 'pink'
    },
    tagText: {
        width: 80,
        height: 40, 
        justifyContent: 'flex-end',
        paddingBottom: 5,
        marginLeft: 7,
    },
    inputContainer: {
        paddingLeft: 5,
        paddingRight: 5,
        width: 300, 
        height: 40,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-end',
        borderRadius: 10,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        backgroundColor:'white'
    },
    textInputDesign: {
        height: 45,
        width: 100,
        marginRight: 5, 
        borderRadius: 10,
        // borderBottomColor: '#DCDCDC',
        // borderBottomWidth: 1,
    },
    buttonContainer: {
        marginTop: 50, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: "center",
    },
    button: {
        // backgroundColor: '#203864',
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
    },
    categoryText: {
        fontSize: 15, 
        fontWeight: 'bold',
        color: '#203864'
    },
    titleContainer: {
          backgroundColor: '#203864',
          width: 200, 
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        width: 295,
        justifyContent: 'space-around',
    },
    dateInputContainer: {
        paddingLeft: 5,
        paddingRight: 5,
        height: 40,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-end',
        borderRadius: 10,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        backgroundColor:'white'
    },
    yearInputDesign: {
        height: 45,
        width: 50,
        marginRight: 5, 
    },
    monthInputDesign: {
        height: 45,
        width: 35,
        marginRight: 5, 
    }
})
export default SavingPlan;
