import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SavingItem = (props) => {
    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜

    let fullDate = year + '-' + month + '-' + date;

    return (
        <View style={styles.savingOuterDiv}>
            <View style={styles.textDiv} >
                <Text>- 저축계획: </Text>
                <Text style={styles.savingText}>{props.savingName}</Text> 
            </View>
            <View style={styles.savingDiv}>
                <View style={styles.savingInnerDiv} >
                    <Text>모인금액: </Text>
                    <Text style={styles.textStyle}>{props.currentSavingMoney}원</Text> 
                </View>
                <View style={styles.savingInnerDiv} >
                    <Text style={styles.goalText}> 목표금액: </Text>
                    <Text style={styles.goalText}>{props.goalSavingMoney}</Text> 
                    <Text style={styles.goalText}>원</Text>
                </View>
                <View style={styles.savingBottomDiv}>
                    <View style={styles.savingInnerDiv} >
                        <Text>현재날짜: </Text>
                        <Text style={styles.textStyle}>{fullDate}</Text> 
                    </View>
                    <View style={styles.savingInnerDiv} >
                        <Text style={styles.goalText}> 시작일: </Text>
                        <Text style={styles.goalText}>{props.startSavingDate.substring(0,10)}</Text> 
                    </View>
                    <View style={styles.savingInnerDiv} >
                        <Text style={styles.goalText}> 종료일: </Text>
                        <Text style={styles.goalText}>{props.endSavingDate.substring(0,10)}</Text> 
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    savingOuterDiv: {
        marginTop: 10,
    },
    textDiv: {
        flexDirection: 'row',
    },
    savingText: {
        color: '#191970',
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 15,
    },
    savingDiv: {
        marginTop: 10,
        height: 100,
        width: 250,
        borderWidth: 1,
        borderRadius: 5,
    },
    savingInnerDiv: {
        flexDirection: 'row',
    },
    savingOuterDiv: {
        margin: 10,
    },
    goalText: {
        fontSize: 12,
    },
    savingBottomDiv: {
        marginTop: 10,
    },
    textStyle: {
        marginLeft: 5,
        fontWeight: 'bold',
        width: 110,
    },
  });

export default SavingItem;