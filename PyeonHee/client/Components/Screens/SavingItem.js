import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SavingItem = (props) => {

    return (
        <View style={styles.savingOuterDiv}>
            <View style={styles.textDiv} >
                <Text style={styles.savingText}>{props.savingName}</Text> 
            </View>
            <View style={styles.savingDiv}>
                <View style={styles.savingInnerDiv} >
                    <Text style={{marginBottom: 5,}}>모인금액: </Text>
                    <Text style={styles.textStyle}>{props.currentSavingMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> 
                </View>
                <View style={styles.savingInnerDiv} >
                    <Text style={styles.goalText}> 목표금액: </Text>
                    <Text style={styles.goalText}>{props.goalSavingMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text> 
                    <Text style={styles.goalText}>원</Text>
                </View>
                <View style={styles.savingBottomDiv}>
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
        fontWeight: 'bold',
        fontSize: 15,
    },
    savingDiv: {
        marginTop: 10,
        height: 100,
        width: 320,
        borderTopWidth: 1,
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
    },
  });

export default SavingItem;