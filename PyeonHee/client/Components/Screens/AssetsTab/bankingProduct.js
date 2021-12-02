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
import FundList from './BankingProductTabs/FundList';
import LoanList from './BankingProductTabs/LoanList';
import PensionList from './BankingProductTabs/PensionList';
import SavingList from './BankingProductTabs/SavingList';
import config from '../../../config';

import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast';

const url = config.url;

const bankingProduct = ({navigation}) => {
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
            <View style={styles.tapContainer}>
                <SegmentedControlTab
                    values={['펀드', '적금' ,'대출', '연금']}
                    selectedIndex={selectedIndex}
                    onTabPress={handleSingleIndexSelect}
                    tabStyle={styles.tabStyle}
                    tabTextStyle={{color: '#595959', }}
                    activeTabStyle={styles.activeTabStyle}
                    borderRadius={20}
                />
            </View>
          {selectedIndex === 0 && <FundList navigation={navigation}/>}
          {selectedIndex === 1 && <SavingList navigation={navigation}/>}
          {selectedIndex === 2 && <LoanList navigation={navigation}/>}
          {selectedIndex === 3 && <PensionList navigation={navigation}/>}
            
        </View>
      </SafeAreaView>
  )
}

export default bankingProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  smallcontainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tapContainer: {
      alignItems:'flex-end',
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
});