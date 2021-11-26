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
import config from '../../config';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast';

const url = config.url;

const MonthReportScreen = ({navigation}) => {
  const [userID, setUserID] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      borderRadius: 20,
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
});