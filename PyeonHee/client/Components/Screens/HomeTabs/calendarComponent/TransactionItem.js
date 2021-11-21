import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';

const TransactionItem = (props) => {

    return (
        <View>
                <View style ={styles.itemContainer}>
                    <Text>{props.name}</Text>
                    {props.inout === '입금' && <Text style={{color: 'blue'}}>+{props.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
                    {props.inout === '출금' && <Text style={{color: 'red'}}>{props.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
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