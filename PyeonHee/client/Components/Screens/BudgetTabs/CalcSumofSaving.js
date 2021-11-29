import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';

const SumOfSavings = (props) => {
    let savings = props.saving;

    if(savings.length > 0) {
        let tempSum = 0;
        console.log('여긴 온건가');

        savings.map(item => {
            tempSum = tempSum + item.savings_money;
            // return tempSum;
        })
        console.log('저금계획 합계');
        console.log(tempSum);
        props.setSumOfSavings(tempSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        return (<Text style={{fontSize: 18, fontWeight:'bold'}}> 총 {tempSum} 원</Text>)
    } else {
        props.setSumOfSavings("0");
        return (<Text style={{fontSize: 18, fontWeight:'bold'}}>총 0 원</Text>)
    }

}

export default SumOfSavings;