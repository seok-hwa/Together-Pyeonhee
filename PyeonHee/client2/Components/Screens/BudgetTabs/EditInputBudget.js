import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';

const EditInputBudget = (props) => {
    let tempNum = props.num;
    
    const handleChange = (text) => {
        let tempText = text.split(",").join("");

        if(parseInt(tempText) === 0){
            props.setBudget("0");
        } else if ( parseInt(tempText) > 0 && tempText.substring(0, 1) === "0") {
            props.setBudget(tempText.substring(1).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        } else if ( parseInt(tempText) > 0) {
            props.setBudget(tempText.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        } 
        else{
            props.setBudget("0");
        }

        // console.log(text);
    };
    
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInputDesign}
                onChangeText={text => handleChange(text)}
                value={tempNum}
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
export default EditInputBudget;
