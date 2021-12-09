import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SavingItem = (props) => {
    let current = props.currentSavingMoney;
    let goal = props.goalSavingMoney;
    let rate = (current/goal*100).toFixed(1);

    return (
        <View style={styles.savingOuterDiv}>
            <View style={styles.textDiv} >
                <Text style={styles.savingText}>{props.savingName}</Text> 
                <View style={styles.savingBottomDiv}>
                    <View style={styles.savingInnerDiv} >
                        {/* <Text style={styles.goalText}> 시작일: </Text> */}
                        <Text style={styles.goalText}>{props.startSavingDate.substring(0,10)}</Text> 
                    </View>
                    <View style={styles.savingInnerDiv} >
                        {/* <Text style={styles.goalText}> ~종료일: </Text> */}
                        <Text style={styles.goalText}> ~ </Text>
                        <Text style={styles.goalText}>{props.endSavingDate.substring(0,10)}</Text> 
                    </View>
                </View>
            </View>
            <View style={styles.savingDiv}>
                <View>
                    <View style={styles.savingInnerDiv} >
                            <Text style={{fontSize: 13, color: 'black',}}>모인금액:</Text>
                            <View style={{alignItems: 'flex-end'}}>
                                <Text style={styles.textStyle}>{props.currentSavingMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> 
                                <Text style={{fontSize: 11,}}>({rate}%)</Text> 
                            </View>

                    </View>
                    <View style={styles.savingInnerDiv}>
                        <Text style={{fontSize: 13, color: 'black',}}>목표금액:</Text>
                        <Text style={{color: '#191970', fontWeight: 'bold',}}>{props.goalSavingMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> 
                        {/* <Text style={{fontSize: 12, color: '#191970',}}>원</Text> */}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    savingOuterDiv: {
        marginTop: 7,
    },
    textDiv: {
        flexDirection: 'row',
        paddingHorizontal: 5, 
        justifyContent:'space-between',
    },
    savingText: {
        color: '#191970',
        fontWeight: 'bold',
        fontSize: 15,
    },
    savingDiv: {
        height: 90,
        width: 320,
        paddingVertical: 8,
        paddingHorizontal: 13,
        borderTopWidth: 0.5,
        borderColor: '#203864'
    },
    savingInnerDiv: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        marginBottom: 2, 
    },
    savingOuterDiv: {
        margin: 10,
    },
    goalText: {
        fontSize: 12,
        color: 'black',
    },
    savingBottomDiv: {
        marginTop: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'yellow',
    },
    textStyle: {
        fontWeight: 'bold',
        color: '#191970',
    },
  });

export default SavingItem;