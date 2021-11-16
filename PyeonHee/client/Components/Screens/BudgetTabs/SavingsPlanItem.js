import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';

const SavingPlanItem = (props) => {
    return (
        <View style={styles.item2}>
            <Text>주제: {props.savingName}</Text>
            <Text>계획일: {props.plannedDate}</Text>
            <Text>기간: {props.duration}</Text>
            <Text>금액: {props.savingMoney}</Text>
            <Text>현재까지 모인 금액: {props.allSavingsMoney}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    item2: {
    marginRight: 20,
      justifyContent: 'space-between',
    },
  });

export default SavingPlanItem;