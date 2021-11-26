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
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import ReportWithLastScreen from './ReportWithLastScreen';
import ReportWithPlanScreen from './ReportWithPlanScreen';
import config from '../../../config';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast';
import MbtiSelectButton from '../../Buttons/MbtiSelectButton';
const url = config.url;

const MonthReportScreen = ({navigation}) => {
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('테스트');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userMbti, setUserMbti] = useState('ISOH');
  const [mbtiDescription, setMbtiDescription] = useState('이러이러한 소비 패턴을 가지고 있습니다.');
  const [loading, setLoading] = useState(false);
  const [didWrite, setDidWrite] = useState(false);

  var now = new Date();	// 현재 날짜 및 시간
  var month = now.getMonth();	// 이번달
  var preMonth =  now.getMonth() - 1 === 0 ? 12: now.getMonth() - 1;	// 지난달
  useEffect(()=>{
    let tempID;
    AsyncStorage.getItem('userID', (err, result) => {
      tempID = result;
      if(tempID!= null){
        setUserID(tempID);
      }
    })

    .then(()=>{
      /*
      fetch(`${url}/monthReportMbti?userID=${tempID}`)   //get
      .then((response)=>response.json())
      .then((responseJson)=>{
        if(responseJson.length != ''){
          setUserName(responseJson.userName);
          setUserMbti(responseJson.userMbti);
          setMbtiDescription(responseJson.mbtiDescription);
          setDidWrite(true);
        }
      })
      .then(()=>{
        setLoading(true);
      })*/

      //for test
      setDidWrite(true);
      setLoading(true);
    })
  })

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
    })
  }

  if(loading === true && didWrite === true){
  return (
    <Root>
    <SafeAreaView style={styles.container}>
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
          {selectedIndex === 0 && <ReportWithLastScreen navigation={navigation} month={month} preMonth={preMonth}/>}
          {selectedIndex === 1 && <ReportWithPlanScreen navigation={navigation} month={month} />}
          <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>{month}월 소비 패턴 분석 결과</Text>
                <View style={styles.resultDiv}>
                    <Text style={styles.nameHighlight}>{userName}</Text>
                    <Text>님의 소비 패턴 MBTI는 </Text>
                    <Text style={styles.mbtiHighlight}>{userMbti}</Text>
                    <Text>입니다.</Text>
                </View>
                <View style={styles.descriptionDiv}>
                    <Text>{mbtiDescription}</Text>
                </View> 
                <View style={styles.buttonDiv}>
                    <MbtiSelectButton onPress={handleSubmitButton}/>
                </View>
            </View>
        </View>
      </SafeAreaView>
      </Root>
  )
  }else if(loading === true && didWrite === false){
    return(
      <Root>
      <SafeAreaView style={styles.container}>
        <View style={styles.notSmallContainer}>
            <View style={styles.appTopBar}>
                <Text style={styles.topFont}>{month}월 소비 분석 리포트</Text>
            </View>
            <View style={styles.notThere}>
              <Text style={{fontSize: 18, fontWeight: 'bold',}}>작성된 예산 계획서가 없습니다.</Text>
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
    backgroundColor: '#8EB3EE',
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
},
notThere: {
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
},
});