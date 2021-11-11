import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BudgetDetail from './RecommendedPlanningScreen';

const BudgetItem = ({ BudgetData, }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            // onPress={() => navigation.navigate('BudgetDetail', { MbtiData: MbtiData.planning_number })} //데이터 어떻게 넘길 지 정해야 함
        >
            <View style={styles.itemContainer}>
                <View style={styles.item1}>
                    {/* <View>  //해당 user의 티어 이미지 삽입 예정
                        <Image
                        />
                    </View> */}
                    <Text>Image</Text>
                </View>
                <View style={styles.item2}>
                    <Text>나이: {BudgetData.age}세</Text>
                    <Text>성별: {BudgetData.gender}</Text>
                    <Text>수입: {BudgetData.userIncome}</Text>
                    <Text>고정지출: {BudgetData.userFixedExpense}</Text>
                    <Text>변동지출: {BudgetData.userVariableExpense}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 120,
      paddingHorizontal: 50,
      borderTopWidth: 1,
      borderColor: 'gray',
    },
    item1: {
      flex: 0.3,
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 50,
      borderRightWidth: 1,
      borderColor: 'gray',
    },
    item2: {
      justifyContent: 'space-between',
      alignItems: 'center',
    }
  });

export default MbtiItem;