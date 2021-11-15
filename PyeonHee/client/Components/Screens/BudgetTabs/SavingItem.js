import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';

const SavingItem = (props) => {
    return (
        <View style={styles.item2}>
            <Text>주제: {props.topic}</Text>
            <Text>기간: {props.startDate} ~ {props.dueDate}</Text>
            <Text>금액: {props.savings}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    item2: {
    marginRight: 20,
      justifyContent: 'space-between',
    },
  });

export default SavingItem;