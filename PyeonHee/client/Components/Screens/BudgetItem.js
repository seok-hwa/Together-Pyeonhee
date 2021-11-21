import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BudgetDetail from './RecommendedPlanningScreen';

const TierImage = (props) => {
  const userTier = props.userTier;
  if(userTier === 'BRONZE'){
      return(
          <Image source={require('./assets/tier/Bronze_single.png')} style={styles.tierDesign}/>
      )
  }
  else if(userTier === 'SILVER'){
      return(
          <Image source={require('./assets/tier/Silver_single.png')} style={styles.tierDesign}/>
      )
  }else if(userTier === 'GOLD'){
      return(
          <Image source={require('./assets/tier/Gold_single.png')} style={styles.tierDesign}/>
      )
  }else if(userTier === 'PLATINUM'){
      return(
          <Image source={require('./assets/tier/Platinum_single.png')} style={styles.tierDesign}/>
      )
  }else if(userTier === 'DIAMOND'){
      return(
          <Image source={require('./assets/tier/Diamond_single.png')} style={styles.tierDesign}/>
      )
  }else{
        return(
            <View style={styles.tierDesign} />
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

                <View style={styles.mbtiContainer}>
                    <Text style={{fontSize: 10}}>소비성향 MBTI</Text>
                    <View style={styles.mbtiInnerContainer}>
                        <Text style={styles.mbtiText}>{props.userMbti}</Text>
                    </View>
                </View>

                <View style={styles.item2}>
                    <Text>나이: {props.userAge}세</Text>
                    <Text>수입: {props.userIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    <Text>직업: {props.userJob}</Text>
                    {/* <Text>고정지출: {props.userFixedExpense}원</Text>
                    <Text>변동지출: {props.userVariableExpense}원</Text> */}
                </View>

                <View style={styles.nextCotainer}>
                    <Text style={styles.nextText}> {'>'} </Text>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      margin: 10,
      borderRadius: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 100,
    },
    item1: {
      width: 100,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRightWidth: 1,
      borderRightColor: 'gray',
    },
    item2: {
    marginRight: 20,
      justifyContent: 'space-between',
    },
    tierDesign: {
      width: 50,
      height: 50,
    },
    mbtiContainer: {
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    mbtiInnerContainer: {
        backgroundColor: 'pink',
        padding: 3,
        borderRadius: 5,
    },
    mbtiText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
    nextCotainer: {
        marginRight: 15,
    },
    nextText: {
        fontSize: 20,
        color: '#A7A3A3'
    },
  });

export default BudgetItem;