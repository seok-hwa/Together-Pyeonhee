import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  Linking,
  Modal, 
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import ReportWithLastScreen from './ReportWithLastScreen';
import ReportWithPlanScreen from './ReportWithPlanScreen';
import config from '../../../config';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast';
import MbtiSelectButton from '../../Buttons/MbtiSelectButton';
import Icon from 'react-native-vector-icons/Ionicons';
const url = config.url;

const MonthReportScreen = ({navigation, route}) => {
  const [userID, setUserID] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userMbti, setUserMbti] = useState('');
  const [mbtiDescription, setMbtiDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [mbtiModalVisible, setMbtiModalVisible] = useState(false);

  var now = new Date();	// 현재 날짜 및 시간
  var year = now.getFullYear();
  var month = now.getMonth();	// 이번달
  var preMonth =  now.getMonth() - 1 === 0 ? 12: now.getMonth() - 1;	// 지난달
  const date = new Date(year,month,0).getDate();

  useEffect(()=>{
    console.log(date);
    console.log('지난달과 비교', route.params.withLast);
    console.log('계획과 비교', route.params.withPlan);
    let tempID;
    AsyncStorage.getItem('userID', (err, result) => {
      tempID = result;
      if(tempID!= null){
        setUserID(tempID);
      }
    })

    .then(()=>{
      fetch(`${url}/monthReportMbti?userID=${tempID}`)   //get
      .then((response)=>response.json())
      .then((responseJson)=>{
        console.log('응답: ',responseJson);
        if(responseJson.length != ''){
          setUserMbti(responseJson.userMbti);
          setMbtiDescription(responseJson.description);

        }
      })
      .then(()=>{
        setLoading(true);
      })
    })
  }, [])

  const handleSingleIndexSelect = (index) => {
    setSelectedIndex(index);
  };

  const handleSubmitButton = () => {
    Popup.show({
      type: 'confirm',
      title: 'MBTI 설정',
      textBody: `${userMbti}를 소비 성향 MBTI로 설정 하시겠습니까?`,
      buttonText: 'yes',
      confirmText: 'no',
      okButtonStyle: {backgroundColor: '#0000CD'},
      iconEnabled: false,
      callback: () => {
        if(route.params.userCurrentMbti === userMbti){
          Popup.show({
            type: 'success',
            textBody: `이미 해당 mbti로 설정되어있습니다.`,
            buttonText: '확인',
            okButtonStyle: {backgroundColor: '#0000CD'},
            iconEnabled: false,
            callback: () => Popup.hide()
          })
        }
        else{
          fetch(`${url}/updateMbti`, {
            method: 'POST',
            body: JSON.stringify({
              userID: userID,
              userMbti: userMbti,
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
                    console.log('설정 완료');
                    setUserMbti(userMbti);
                    Popup.show({
                        type: 'success',
                        textBody: `${userMbti}를 소비 성향 MBTI로 설정 했습니다.`,
                        buttonText: '확인',
                        okButtonStyle: {backgroundColor: '#0000CD'},
                        iconEnabled: false,
                        callback: () => Popup.hide()
                    })
                }else{
                    alert('설정 실패');
                    console.log('fail to save.');
                }
            })
            .catch((error)=>{
                console.error(error);
            })
          }
      }
    })
  }

  if(loading === true && route.params.isTransactionList === true){
  return (
    <Root>
    <SafeAreaView style={styles.container}>
      <Modal
          animationType="fade"
          transparent={true} // 배경 투명 하게 
          visible={mbtiModalVisible}

          onRequestClose={() => {
              setMbtiModalVisible(false);
      }}>
          <View style={styles.modalSize}>
              <View style={styles.modalMbtiBodySize}>
              <View style={styles.exDiv}>
                      <TouchableOpacity onPress={()=>{setMbtiModalVisible(false)}}>
                          <Icon name="close-outline" size={25}/>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.modalTopBar}>
                      <Text>소비 성향</Text>
                  </View>
                  <View style={styles.modalContent}>
                  <View style={styles.resultDiv}>
                      <Text style={styles.nameHighlight}>{route.params.userName}</Text>
                      <Text>님의 소비 패턴 유형은 </Text>
                      <Text style={styles.mbtiHighlight}>{userMbti}</Text>
                      <Text>입니다.</Text>
                  </View>
                  <View style={styles.modalMbtiDescription}>
                    <Text>{mbtiDescription}</Text>
                  </View>
                  </View>
              </View>
          </View>
      </Modal>
        <View style={styles.smallcontainer}>
            <View style={styles.appTopBar}>
                <Text style={styles.topFont}>{month}월 소비 분석 리포트</Text>
            </View>
            <View style={styles.tapContainer}>
                <SegmentedControlTab
                    values={['지난달 소비 내역과 비교', '예산 계획서와 비교']}
                    selectedIndex={selectedIndex}
                    onTabPress={handleSingleIndexSelect}
                    tabStyle={styles.tabStyle}
                    tabTextStyle={{color: '#595959', }}
                    activeTabStyle={styles.activeTabStyle}
                    borderRadius={20}
                />
            </View>
          {selectedIndex === 0 && <ReportWithLastScreen navigation={navigation} route={route} month={month} preMonth={preMonth} withLast={route.params.withLast}/>}
          {selectedIndex === 1 && <ReportWithPlanScreen navigation={navigation} route={route} month={month} withPlan={route.params.withPlan} daily_count={route.params.daily_count} date={date}/>}
          <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>{month}월 소비 패턴 분석 결과</Text>
                <TouchableOpacity onPress={()=>{setMbtiModalVisible(true)}}>
                  <View style={styles.resultDiv}>
                      <Text style={styles.nameHighlight}>{route.params.userName}</Text>
                      <Text>님의 소비 패턴 유형은 </Text>
                      <Text style={styles.mbtiHighlight}>{userMbti}</Text>
                      <Text>입니다.</Text>
                  </View>
                </TouchableOpacity>
                {/*
                <View style={styles.descriptionDiv}>
                    <Text style={{fontSize: 13,}}>{mbtiDescription}</Text>
                </View>*/
                } 
                <View style={styles.buttonDiv}>
                    <MbtiSelectButton onPress={handleSubmitButton}/>
                </View>
            </View>
        </View>
      </SafeAreaView>
      </Root>
  )}else if(loading === true && route.params.isTransactionList === false){
    return(
      <Root>
      <SafeAreaView style={styles.container}>
        <View style={styles.notSmallContainer}>
            <View style={styles.appTopBar}>
                <Text style={styles.topFont}>{month}월 소비 분석 리포트</Text>
            </View>
            <View style={styles.notThere}>
              <Text style={{fontSize: 18, fontWeight: 'bold',}}>{month}월 소비 내역이 없습니다.</Text>
            </View>
        </View>
      </SafeAreaView>
      </Root>
    )
  }else{
    return(
      <Root>
      <SafeAreaView style={styles.container}>
        <View style={styles.smallcontainer}>
        </View>
      </SafeAreaView>
      </Root>
    )
  }
}

export default MonthReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  notSmallContainer:{
    flex: 1,
  },
  smallcontainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tapContainer: {
      alignItems:'flex-start',
      backgroundColor: 'white',
      padding: 3,
  },
  headerText: {
    flex: 1,
    padding: 8,
    fontSize: 14,
    color: '#444444',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  tabStyle: {
    borderColor: 'white',
    backgroundColor: 'white',
  },
  activeTabStyle: {
    backgroundColor: '#203864',
    borderRadius: 20,
  },
  appTopBar: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
},
topFont: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
},
cateFont: {
  fontSize: 17,
  fontWeight: 'bold',
  margin: 10,
},
tempRow: {
  alignItems: 'center',
},
fixDiv: {
  margin: 10,
  padding: 5,
  backgroundColor: 'white',
  borderRadius: 5,
},
monthRow: {
  flexDirection: 'row',
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
},
monthFont: {
  width: 90,
},
priceFont:{
  width: 140,
  fontSize: 14,
  fontWeight: 'bold',
  textAlign: 'right',
},
upFont:{
  color: 'red',
  fontSize: 14,
  fontWeight: 'bold',
  width: 130,
  textAlign: 'right',
},
downFont:{
  color: 'blue',
  fontSize: 14,
  fontWeight: 'bold',
  width: 130,
  textAlign: 'right',
},
resultDiv: {
  flexDirection: 'row',
  padding: 5,
},
nameHighlight: {
  fontWeight: 'bold',
},
mbtiHighlight:{
  fontWeight: 'bold',
  color: 'blue',
},
realProgressFont: {
  fontWeight: 'bold',
  color: 'blue',
},
progressDiv: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 10,
},
buttonDiv: {
  alignItems: 'center',
},
descriptionDiv:{
  paddingLeft: 10,
  paddingRight: 10,
  fontSize: 11,
},
notThere: {
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
},

modalSize: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.50)',
},
modalTierBodySize: {
  width: '75%',
  height: '40%',
  backgroundColor: 'white',
  borderRadius: 10,
},
modalMbtiBodySize: {
  width: '80%',
  height: '45%',
  backgroundColor: 'white',
  borderRadius: 10,
},
modalStampointBodySize: {
  width: '75%',
  height: '40%',
  backgroundColor: 'white',
  borderRadius: 10,
},

modalTopBar: {
  flex: 1,
  padding: 5,
  borderBottomWidth: 1,
  borderBottomColor: 'gray',
  alignItems: 'center',
  justifyContent: 'center',
},
modalContent:{
  flex: 12,
  alignItems: 'center',
  justifyContent: 'center',
},
tierRow: {
  flexDirection: 'row',
  alignItems: 'flex-end',
  margin: 5,
},
myTierRow: {
  flexDirection: 'row',
  alignItems: 'flex-end',
  borderWidth: 2,
  borderColor: 'blue',
  borderRadius: 5,
  margin: 5,
},
tierText2: {
  width: 70,
  textAlign: 'right',
},
tierDescription: {
  width: 150,
  textAlign: 'right',
  fontSize: 11,
},
resultDiv: {
  flexDirection: 'row',
  padding: 5,
},
nameHighlight: {
  fontWeight: 'bold',
},
mbtiHighlight:{
  fontWeight: 'bold',
  color: 'blue',
},
exDiv: {
  alignItems: 'flex-end',
},
modalMbtiDescription: {
  padding: 10,
},
});