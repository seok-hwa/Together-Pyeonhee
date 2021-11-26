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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userMbti, setUserMbti] = useState('ISOH');
  const [mbtiDescription, setMbtiDescription] = useState('이러이러한 소비 패턴을 가지고 있습니다.');

  useEffect(()=>{
    let tempID;
    AsyncStorage.getItem('userID', (err, result) => {
      tempID = result;
      if(tempID!= null){
        setUserID(tempID);
      }
    })
  })

  const handleSingleIndexSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.smallcontainer}>
            <View style={styles.appTopBar}>
                <Text style={styles.topFont}>11월 소비 분석 리포트</Text>
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
          {selectedIndex === 0 && <ReportWithLastScreen navigation={navigation}/>}
          {selectedIndex === 1 && <ReportWithPlanScreen navigation={navigation}/>}
          <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>11월 소비 패턴 분석 결과</Text>
                <View style={styles.resultDiv}>
                    <Text style={styles.nameHighlight}>테스트</Text>
                    <Text>님의 소비 패턴 mbti는 </Text>
                    <Text style={styles.mbtiHighlight}>{userMbti}</Text>
                    <Text>입니다.</Text>
                </View>
                <View style={styles.descriptionDiv}>
                    <Text>{mbtiDescription}</Text>
                </View> 
                <View style={styles.buttonDiv}>
                    <MbtiSelectButton />
                </View>
            </View>
        </View>
      </SafeAreaView>
  )
}

export default MonthReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
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
});