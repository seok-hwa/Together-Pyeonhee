import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';

const TransactionItem = (props) => {
    return (
        <View>
                <View style ={styles.itemContainer}>
                    <Text>{props.name}</Text>
                    {props.money > 0 && <Text style={{color: 'blue'}}>+{props.money}원</Text>}
                    {props.money < 0 && <Text style={{color: 'red'}}>{props.money}원</Text>}
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 3,
        padding: 3, 
    }
});

export default TransactionItem;