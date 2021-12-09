import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Modal, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import EditInputBudget from './EditInputBudget';
import config from '../../../config';

const url = config.url;
const SavingPlanItem = (props) => {
  let startYear = props.startSavingDate.substring(0, 4);
  let startMonth = props.startSavingDate.substring(5, 7);
  let startDay = props.startSavingDate.substring(8, 10);

  let finishYear = props.endSavingDate.substring(0, 4);
  let finishMonth = props.endSavingDate.substring(5, 7);
  let finishDay = props.endSavingDate.substring(8, 10);

  let userIncome = props.userIncome;
  let availableSavings = props.userIncome - props.sumOfSavings + props.savingMoney - props.fixedExpenditure - props.plannedExpenditure;

  const [userID, setUserID] = useState('');
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [tempTitle, setTempTitle] = useState("");
  const [tempSavingMoney, setTempSavingMoney] = useState("");
  const [tempEndYear, setTempEndYear] = useState("");
  const [tempEndMonth, setTempEndMonth] = useState("");

  useEffect(()=>{
    let tempID;
    AsyncStorage.getItem('userID', (err, result) => {
      tempID = result;
      if(tempID!= null){
        setUserID(tempID);
      }
    })
  })

  const handlePress = () => {
    setTempTitle(props.savingName);
    setTempSavingMoney(props.savingMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    setTempEndYear(finishYear);
    setTempEndMonth(finishMonth);
    setModalVisible(true);
  }

  const handleOKButton = () => {
    console.log('/editSavingPlan');

    if(tempTitle.length === 0) {
      Alert.alert(' ','제목을 입력해주세요');
      return;
    }

    if(parseInt(tempSavingMoney.split(",").join("")) === 0) {
      Alert.alert(' ','저금 금액을 입력해주세요.');
      return;
    } else if(availableSavings < parseInt(tempSavingMoney.split(",").join(""))) {
      // let alertMessage = '저금액이 저금 가능 금액'+'을 초과했습니다.';
      Alert.alert(' ', '저금액이 저금 가능 금액을 초과했습니다.');
      return;
    }

    if(parseInt(tempEndMonth) > 12) {
      Alert.alert(' ','기간은 1 ~ 12 월 중에 선택해주세요.');
      return;      
    }

    if(parseInt(tempEndYear) < startYear) {
      Alert.alert(' ','기간은 최소 1개월 이상이어야 합니다.');
      return;
    }

    if(parseInt(tempEndYear) === startYear && parseInt(tempEndMonth) < startMonth) {
      Alert.alert(' ','기간은 최소 1개월 이상이어야 합니다.');
      return;
    }

    // fetch(`${url}/editSavingPlan`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //   userID: props.userID,
    //   savingID: props.savingID
    //   savingName: savingName,
    //   savingMoney: parseInt(savingMoney.split(",").join("")),
    //   // startDate: startDate,
    //   savingsDay: savingsDay,
    //   period: period,    //기간으로 변경함 
    //   }),
    //   headers: {
    //   'Accept': 'application/json',
    //   'Content-Type':'application/json',
    //   },
    // })
    // .then((response)=>response.json())
    // .then((responseJson)=>{
    //   console.log(responseJson);
    // })
    // .catch((e)=>{
    //     console.error(e);
    // })
    setModalVisible(!modalVisible);
    props.setAddSavingsPlan(true);
  }

  const handleRemoveButton = () => {
    Alert.alert(' ','해당 저금계획을 삭제하시겠습니까?', [
      {text: '취소', onPress:() => console.log('Cancel Pressed!'), style: 'cancel'},
      {text: '삭제', onPress:() => handleRemoveOKButton()}
    ]
    // ,{cancelable: false}
    );
  }

  const handleRemoveOKButton = () => {
    console.log('/removeSavingPlan');
    // fetch(`${url}/removeSavingPlan`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //   userID: props.userID,
    //   savingID: props.savingID
    //   }),
    //   headers: {
    //   'Accept': 'application/json',
    //   'Content-Type':'application/json',
    //   },
    // })
    // .then((response)=>response.json())
    // .then((responseJson)=>{
    //   console.log(responseJson);
    // })
    // .catch((e)=>{
    //     console.error(e);
    // })
    setModalVisible(!modalVisible);
    props.setAddSavingsPlan(true);
  }


  return (
    <View>
      <Modal
        animationType = {"slide"}
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          //  alert('Modal has now been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{width: 300, flexDirection: 'row', justifyContent: 'flex-end', }}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {setModalVisible(!modalVisible)}}
              >
                <Icon name={'close-outline'} size={23} color={'#203864'}/>
              </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
              <View style={styles.titleDiv}>
                <Text style={styles.modalText}>저금 계획</Text>
              </View>
              <View style={styles.titleInfoDiv}>
                <Text style={styles.titleInfoText}>수입: {props.userIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                <Text style={styles.titleInfoText}>저금가능금액: {availableSavings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                <Text style={[styles.titleInfoText, {fontSize: 8}]}>( 수입-(고정지출+계획지출+저금계획총합) )</Text>
              </View>
            </View>

            <KeyboardAvoidingView style={styles.modalContent}>

              <View style={styles.rowContainer}>
                <View style={styles.tagText} >
                  <Text style={styles.categoryText}>제목</Text>
                </View>
                {/* <EditInputBudget num={tempTitle} setBudget={setTempTitle}/> */}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInputDesign}
                    onChangeText={text => setTempTitle(text)}
                    value={tempTitle}
                    maxLength = {20}
                    textAlign="right"
                  />
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.tagText} >
                  <Text style={styles.categoryText}>저금 금액</Text>
                </View>
                <View style={styles.inputContainer}>
                  <EditInputBudget num={tempSavingMoney} setBudget={setTempSavingMoney}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', margin: 3, }}>
                  <Text style={{color: '#203864'}}>* 현재 누적액: {props.currentSavingMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.tagText} >
                  <Text style={styles.categoryText}>기간</Text>
                </View>

                <View style={styles.dateContainer}>
                  <Text style={{fontSize: 14, color: 'black'}}>{startYear}년 {startMonth}월 ~ </Text>
                  <View style={{flexDirection: 'row'}}>
                    <View style={[styles.dateInputContainer, {width: 90, marginRight: 10,}]}>
                      <TextInput
                        style={styles.textInputDesign}
                        onChangeText={text => setTempEndYear(text)}
                        value={tempEndYear}
                        maxLength = {4}
                        keyboardType="numeric"
                        textAlign="right"
                      />
                      <Text>년</Text>
                    </View>
                    <View style={[styles.dateInputContainer, {width: 60}]}>
                      <TextInput
                        style={styles.textInputDesign}
                        onChangeText={text => setTempEndMonth(text)}
                        value={tempEndMonth}
                        maxLength = {2}
                        keyboardType="numeric"
                        textAlign="right"
                      />
                      <Text>월</Text>
                    </View>
                  </View>
                </View>

              </View>

            </KeyboardAvoidingView>

            <View style={{flexDirection: 'row', marginTop: 20,}}>
              <TouchableOpacity
                style={styles.openButton}
                // onPress={() => {setModalVisible(!modalVisible)}}
                onPress={handleRemoveButton}
              >
              <Text style={{color: '#203864'}}>삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.openButton}
                onPress={handleOKButton}
              >
                <Text style={{color: '#203864'}}>수정</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={handlePress}
      //   onPress={() => {
      //     alert('Pressed!');
      // }}
      >
        <View style={styles.boxContainer}>
          <View style={styles.itemContainer}>
            
            <View>
              <Text style={styles.topicText}>" {props.savingName} "</Text>
              <Text>시작일: {startYear}년 {startMonth}월 {startDay}일</Text>
              <Text>종료일: {finishYear}년 {finishMonth}월 {finishDay}일</Text>
              <Text>적금 금액:   {props.savingMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
              <Text>현재 누적액: {props.currentSavingMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
            </View>

            <Icon name={'chevron-forward-outline'} size={20} color={'gray'} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    margin: 5,
    padding: 15,
    borderTopWidth: 0.5,
    borderColor: 'gray',
  },
  itemContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor:'#203864',
  },
  modalContent: {
    marginHorizontal: 35,
    paddingTop: 10,
    paddingBottom: 25,
    alignItems: 'center',
  },
  openButton: {
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    padding: 10,
  },
  closeButton: {
    borderRadius: 10,
    width: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  titleInfoDiv:{
    marginLeft: 10,
  },
  titleInfoText: {
    color: '#203864',
  },
  titleContainer: {
    // backgroundColor: 'yellow',
    width: 300, 
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    borderRadius: 10,
  },
  titleDiv: {
    backgroundColor: '#203864',
    width: 115, 
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  rowContainer: {
    padding: 3,
  },
  tagText: {
    width: 80,
    height: 40, 
    justifyContent: 'flex-end',
    paddingBottom: 5,
    marginLeft: 7,
  },
  categoryText: {
    fontSize: 15, 
    fontWeight: 'bold',
    color: '#203864'
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
  textInputDesign: {
    height: 45,
    width: 100,
    marginRight: 5, 
    borderRadius: 10,
  },
});

export default SavingPlanItem;