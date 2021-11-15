import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SavingItem = (props) => {
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
                        <Text>시작일: </Text>
                        <Text style={styles.textStyle}>{props.startSavingDate}일</Text> 
                    </View>
                    <View style={styles.savingInnerDiv} >
                        <Text style={styles.goalText}> 종료일: </Text>
                        <Text style={styles.goalText}>{props.endSavingDate}</Text> 
                        <Text style={styles.goalText}>일</Text>
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
        height: 85,
        borderWidth: 1,
        borderRadius: 5,
    },
    savingInnerDiv: {
        flexDirection: 'row',
    },
    savingOuterDiv: {
        margin: 20,
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