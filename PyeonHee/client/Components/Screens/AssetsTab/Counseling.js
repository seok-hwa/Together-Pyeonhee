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
        <View style={{alignItems:'center', justifyContent: 'center',}}>
          <View style={styles.tapContainer}>
            <SegmentedControlTab
              values={['금융상품', '자산관리']}
              selectedIndex={selectedIndex}
              onTabPress={handleSingleIndexSelect}
              tabStyle={styles.tabStyle}
              tabTextStyle={{color: '#595959', }}
              activeTabStyle={styles.activeTabStyle}
              borderRadius={20}
            />
          </View>
        </View>
        
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
  },
  tapContainer: {
      alignItems:'center',
      justifyContent: 'center',
      borderRadius: 20,
      width: 250, 
      backgroundColor: 'white',
      padding: 3,
  },
  tabStyle: {
    borderColor: 'white',
    backgroundColor: 'white',
    alignItems:'center',
    justifyContent: 'center',
  },
  activeTabStyle: {
    backgroundColor: '#203864',
    borderRadius: 20,
  },
});