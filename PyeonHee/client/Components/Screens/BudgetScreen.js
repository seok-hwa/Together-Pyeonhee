import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, StyleSheet, Text, View} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
// import WriteBudgetScreen from './BudgetTabs/WriteBudgetScreen';
import BudgetList from './BudgetTabs/budgetList';
import BudgetCabinet from './BudgetTabs/budgetCabinet';

const BudgetScreen = ({navigation}) => {
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

          {selectedIndex === 0 && <View><Text>본인 계획서 보관함</Text></View>}
          {/* {selectedIndex === 0 && <WriteBudgetScreen navigation={navigation}/>} */}
          {selectedIndex === 1 && <BudgetList navigation={navigation}/>}
          {selectedIndex === 2 && <BudgetCabinet navigation={navigation}/>}
            
            <View style={styles.tapContainer}>
                <SegmentedControlTab
                    values={['본인', '타인', '보관함']}
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

export default BudgetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  //   justifyContent: 'center',
  //   alignItems:'center',
    padding: 5,
  },
  smallcontainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  pageContainer: {
    flex: 1,
    padding: 5,
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
    backgroundColor: '#2FB7AA',
    borderRadius: 20,
  },
});