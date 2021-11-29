import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';

const InputBudget = (props) => {
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

        console.log(text);
    };
    
    return (
        <View style={styles.container}>
            {props.big === 'true' ? 
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <TextInput
                        style={styles.incomeInputDesign}
                        onChangeText={text => handleChange(text)}
                        value={tempNum}
                        maxLength = {20}
                        keyboardType="numeric"
                        textAlign="right"
                    />
                    <Text style={{fontSize: 18, fontWeight:'bold'}}> 원</Text> 
                </View>
            :
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <TextInput
                        style={styles.textInputDesign}
                        // placeholder='0'
                        // onChangeText={text => props.setBudget(text)}
                        onChangeText={text => handleChange(text)}
                        value={tempNum}

                        maxLength = {20}
                        keyboardType="numeric"
                        textAlign="right"
                    />
                    <Text>원</Text>
                </View>

            }
{/*             
            <View><Text>원</Text></View> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingRight: 20,
    },
    incomeInputDesign: {
        fontSize: 20,
        borderRadius: 20,
        paddingRight: 10,
        width: 180,
        fontWeight:'bold',
        backgroundColor: '#D4E2F8',
    },
    textInputDesign: {
        marginLeft: 20,
        height: 40,
        width: 150,
        borderRadius: 10,
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
    },
})
export default InputBudget;
