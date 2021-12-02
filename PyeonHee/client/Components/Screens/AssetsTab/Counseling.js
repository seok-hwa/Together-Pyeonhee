import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import FinancialCounselingList from './CounselingTab/FinancialCounselingList';
import AssetCounselingList from './CounselingTab/AssetCounselingList';
import config from '../../../config';

const url = config.url;

const Counseling = ({navigation}) => {
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
            values={['금융', '자산']}
            selectedIndex={selectedIndex}
            onTabPress={handleSingleIndexSelect}
            tabStyle={styles.tabStyle}
            tabTextStyle={{color: '#595959', }}
            activeTabStyle={styles.activeTabStyle}
            borderRadius={20}
          />
        </View>
        
        {/* <View style={styles.itemContainer}>
          <Text>상담분야</Text>
          <Text>소속</Text>
          <Text>상담사</Text>
        </View> */}

        {selectedIndex === 0 && <FinancialCounselingList navigation={navigation}/>}
        {selectedIndex === 1 && <AssetCounselingList navigation={navigation}/>}
            
      </View>
    </SafeAreaView>
  )
}

export default Counseling;

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
    backgroundColor: 'pink',
    borderRadius: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    height: 90,
  },
});