import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, StyleSheet, Text, View} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import LatestTransactionScreen from './TransactionalInfoComponent/LatestTransactionScreen';
import TotalTransactionScreen from './TransactionalInfoComponent/TotalTransactionScreen';

const TransactionalInfoScreen = ({navigation}) => {
  const [userID, setUserID] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(()=>{
    AsyncStorage.getItem('userID', (err, result) => {
      const tempID = result;
      if(tempID!= null){
        setUserID(tempID);
      }
    });
  })

  const handleSingleIndexSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.smallcontainer}>
        <View style={styles.tapContainer}>
                <SegmentedControlTab
                    values={['최근 거래 내역', '종합 거래 내역']}
                    selectedIndex={selectedIndex}
                    onTabPress={handleSingleIndexSelect}
                    tabStyle={styles.tabStyle}
                    tabTextStyle={{color: '#595959', }}
                    activeTabStyle={styles.activeTabStyle}
                    borderRadius={20}
                />
        </View>
          {selectedIndex === 0 && <LatestTransactionScreen navigation={navigation}/>}
          {selectedIndex === 1 && <TotalTransactionScreen navigation={navigation}/>}

        </View>
      </SafeAreaView>
  )
}

export default TransactionalInfoScreen;

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
    backgroundColor: '#203864',
    borderRadius: 20,
  },
});