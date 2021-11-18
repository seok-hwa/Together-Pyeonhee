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
import AccountLink from './AssetsTab/accountLinkScreen';
import BankingProduct from './AssetsTab/bankingProduct';
import AssetCounseling from './AssetsTab/assetCounseling';

const AssetsScreen = ({navigation}) => {
  const [userID, setUserID] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(()=>{
    AsyncStorage.getItem('userID', (err, result) => {
      const tempID = result;
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

          {selectedIndex === 0 && <AccountLink navigation={navigation}/>}
          {selectedIndex === 1 && <BankingProduct navigation={navigation}/>}
          {selectedIndex === 2 && <AssetCounseling navigation={navigation}/>}
            
            <View style={styles.tapContainer}>
                <SegmentedControlTab
                    values={['계좌연동', '은행상품', '자산상담']}
                    selectedIndex={selectedIndex}
                    onTabPress={handleSingleIndexSelect}
                    tabStyle={styles.tabStyle}
                    tabTextStyle={{color: '#595959', }}
                    activeTabStyle={styles.activeTabStyle}
                    borderRadius={20}
                />
            </View>
        </View>
      </SafeAreaView>
  )
}

export default AssetsScreen;

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