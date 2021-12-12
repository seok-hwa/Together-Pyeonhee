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
  DeviceEventEmitter, 
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import ReportWithLastScreen from './ReportWithLastScreen';
import ReportWithPlanScreen from './ReportWithPlanScreen';
import MbtiSelectButton from '../../Buttons/MbtiSelectButton';
import MbtiDecideButton from '../../Buttons/MbtiDecideButton';
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from '../../Buttons/BackButton';
import { monthReportMbti, updateMbti } from '../../api';

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
      monthReportMbti(tempID)
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
    return () => {
      DeviceEventEmitter.emit('MonthReport');
    }
  }, [])

  const handleSingleIndexSelect = (index) => {
    setSelectedIndex(index);
  };

  const handleSubmitButton = () => {
    if(route.params.userCurrentMbti === userMbti){
      alert('이미 해당 유형으로 설정되어있습니다.');
    }else{
      updateMbti(userID, userMbti)
      .then((responseJson)=>{
        console.log(responseJson);
        if(responseJson.status === true){
          console.log('설정 완료');
          alert(`${userMbti}를 소비 성향으로 설정 했습니다.`);
          setUserMbti(userMbti);
          setMbtiModalVisible(false);     
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

  if(loading === true && route.params.isTransactionList === true && route.params.isPlan === true){
  return (
    <View style={styles.container}>
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
                  <View style={styles.buttonDiv}>
                    <MbtiDecideButton onPress={handleSubmitButton}/>
                  </View>
                  </View>
              </View>
          </View>
      </Modal>
        <View style={styles.smallcontainer}>
            <View style={styles.appTopBar}>
                <BackButton onPress={()=>{navigation.goBack()}}/>
                <View style={styles.headerDiv}>
                  <Text style={styles.topFont}>{month}월 소비 분석 리포트</Text>
                </View>
                <View style={styles.headerRightDiv}></View>
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
                <View style={{alignItems: 'center',}}>
                  <Text style={styles.cateFont}>{month}월 소비 패턴 분석 결과</Text>
                </View> 
                  <View style={styles.resultDiv}>
                    <Text>한달리포트 분석 결과,</Text>
                  </View>
                  <View style={styles.resultDiv}>
                      <Text style={styles.nameHighlight}>{route.params.userName}</Text>
                      <Text>님의 소비 패턴 유형은 </Text>
                      <Text style={styles.mbtiHighlight}>{userMbti}</Text>
                      <Text>입니다.</Text>
                  </View>
                <View style={styles.buttonDiv}>
                    <MbtiSelectButton onPress={()=>{setMbtiModalVisible(true)}}/>
                </View>
            </View>
        </View>
      </View>
  )}else if(loading === true && route.params.isTransactionList === false){
    return(
        <View style={styles.notSmallContainer}>
          <View style={styles.appTopBar}>
                <BackButton onPress={()=>{navigation.goBack()}}/>
                <View style={styles.headerDiv}>
                  <Text style={styles.topFont}>{month}월 소비 분석 리포트</Text>
                </View>
                <View style={styles.headerRightDiv}></View>
            </View>
            <View style={styles.notThere}>
              <Text style={{fontSize: 18, fontWeight: 'bold',}}>{month}월 소비 내역이 없습니다.</Text>
            </View>
        </View>
    )
  }else if(loading === true && route.params.isPlan === false){
    return(
        <View style={styles.notSmallContainer}>
          <View style={styles.appTopBar}>
                <BackButton onPress={()=>{navigation.goBack()}}/>
                <View style={styles.headerDiv}>
                  <Text style={styles.topFont}>{month}월 소비 분석 리포트</Text>
                </View>
                <View style={styles.headerRightDiv}></View>
            </View>
            <View style={styles.notThere}>
              <Text style={{fontSize: 18, fontWeight: 'bold',}}>작성된 예산 계획서가 없습니다.</Text>
            </View>
        </View>
    )
  }else{
    return(
      <View style={styles.container}>
        <View style={styles.smallcontainer}>
        </View>
      </View>
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


cateFont: {
  fontSize: 18,
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
  paddingLeft: 5,
  paddingRight: 5,
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
modalMbtiBodySize: {
  width: '80%',
  height: '50%',
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
  flex: 16,
  alignItems: 'center',
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
  marginTop: 5,
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
  padding: 15,
},
});