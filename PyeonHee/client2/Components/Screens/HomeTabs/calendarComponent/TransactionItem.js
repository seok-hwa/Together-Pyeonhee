import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';

const TransactionItem = (props) => {
    console.log(props.type);
    return (
        <View style={{alignItems:'center',}}>
                <View style ={styles.itemContainer}>
                    <View style={styles.nameDiv}>
                        <Text >{props.name}</Text>
                        <Text style={styles.type}>({props.type})</Text>
                    </View>
                    {props.inout === '입금' && <Text style={{color: 'blue', }}>+{props.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
                    {props.inout === '출금' && <Text style={{color: 'red', }}>-{props.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        width: 350,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 3,
        padding: 3, 
    },
    type: {
        fontSize: 12,
        marginTop: 4,
    },
    nameDiv: {
        width: 160,
        flexDirection: 'row',
    },
});

export default TransactionItem;