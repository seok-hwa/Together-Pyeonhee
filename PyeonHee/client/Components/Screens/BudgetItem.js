import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BudgetDetail from './RecommendedPlanningScreen';

const TierImage = (props) => {
  const userTier = props.userTier;
  if(userTier === 'Bronze'){
      return(
          <Image source={require('./assets/tier/Bronze_single.png')} style={styles.tierDesign}/>
      )
  }
  else if(userTier === 'Silver'){
      return(
          <Image source={require('./assets/tier/Silver_single.png')} style={styles.tierDesign}/>
      )
  }else if(userTier === 'Gold'){
      return(
          <Image source={require('./assets/tier/Gold_single.png')} style={styles.tierDesign}/>
      )
  }else if(userTier === 'Platinum'){
      return(
          <Image source={require('./assets/tier/Platinum_single.png')} style={styles.tierDesign}/>
      )
  }else if(userTier === 'Diamond'){
      return(
          <Image source={require('./assets/tier/Diamond_single.png')} style={styles.tierDesign}/>
      )
  }
}
const BudgetItem = (props) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => props.navigation.navigate('BudgetDetail', {budgetPlanningID: props.budgetPlanningID})} //데이터 어떻게 넘길 지 정해야 함
        >
            <View style={styles.itemContainer}>
                <View style={styles.item1}>
                    <TierImage userTier={props.userTier}/>
                    <Text>{props.userTier}</Text>
                </View>
                <View style={styles.item2}>
                    <Text>나이: {props.userAge}세</Text>
                    <Text>수입: {props.userIncome}원</Text>
                    <Text>고정지출: {props.userFixedExpense}원</Text>
                    <Text>변동지출: {props.userVariableExpense}원</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 100,
      borderTopWidth: 1,
      borderColor: 'gray',
    },
    item1: {
      width: 100,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRightWidth: 1,
      borderColor: 'gray',
    },
    item2: {
      marginLeft: 50,
      justifyContent: 'space-between',
    },
    tierDesign: {
      width: 50,
      height: 50,
    },
  });

export default BudgetItem;