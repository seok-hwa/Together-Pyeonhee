import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';

const InputBudget = (props) => {
    
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInputDesign}
                placeholder='0'
                onChangeText={text => props.setBudget(text)}
                maxLength = {20}
                keyboardType="numeric"
                textAlign="right"
            />
            <View><Text>원</Text></View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight:10,
    },
    textInputDesign: {
        marginLeft: 20,
        height: 40,
        width: 170,
        borderRadius: 10,
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
    },
})
export default InputBudget;
