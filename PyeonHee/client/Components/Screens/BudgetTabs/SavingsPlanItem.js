import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SavingPlanItem = (props) => {

  return (
    <TouchableOpacity
      onPress={() => {
        alert('Pressed!');
    }}>
      <View style={styles.itemContainer}>
        <Text style={styles.topicText}>{props.savingName}</Text>
        {/* <sumSavings/> */}
        <View >
          <Text>시작일: {props.startSavingDate}</Text>
          <Text>종료일: {props.endSavingDate}</Text>
          {/* <Text>기간: {props.period}개월</Text> */}
          <Text>적금 금액:   {props.savingMoney}원</Text>
          <Text>현재 누적액: {props.currentSavingMoney} 원</Text>
        </View>

        <Icon name={'chevron-forward-outline'} size={20} color={'gray'} />
      </View>
    </TouchableOpacity>  
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 8,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicText: {
    fontSize: 15,
    fontWeight: "bold",
    width: 120,
  },
});

export default SavingPlanItem;