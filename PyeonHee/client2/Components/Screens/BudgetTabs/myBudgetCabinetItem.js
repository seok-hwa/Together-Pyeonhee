import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';

const MyBudgetCabinetItem = (props) => {
    let index = props.selectedIndex;
    let temp = props.planningID;
    let income = props.income;

    const handleSelected = () => {
        if(temp === index) {
            props.setSelectedIndex(0);
            props.setIsSelected(false);
        }
        else {
            props.setSelectedIndex(props.planningID);
            console.log(props.planningID);
            props.setIsSelected(true);
        }
    }

    let savingRate = (props.sumOfSavings/income*100).toFixed(1);
    let fixedRate = (props.fixedExpenditure/income*100).toFixed(1);
    let plannedRate = (props.plannedExpenditure/income*100).toFixed(1);

    return(
        <View >
        {temp === index ? 
            <View style={styles.selectedContainer}>
                <TouchableOpacity onPress={handleSelected}>
                    <View style={styles.rowContent}>
                        <Text style={styles.text}>수입</Text>
                        <Text style={styles.text}>{(props.income+'').replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>
                    <View style={styles.rowContent}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.text}>월 저금액 </Text>
                            <Text style={styles.rateText}>({savingRate}%)</Text>
                        </View>
                        <Text style={styles.text}>{(props.sumOfSavings+'').replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>
                    <View style={styles.rowContent}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.text}>고정지출 </Text>
                            <Text style={styles.rateText}>({fixedRate}%)</Text>
                        </View>
                        <Text style={styles.text}>{(props.fixedExpenditure+'').replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>
                    <View style={styles.rowContent}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.text}>계획지출 </Text>
                            <Text style={styles.rateText}>({plannedRate}%)</Text>
                        </View>
                        <Text style={styles.text}>{(props.plannedExpenditure+'').replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>
                    <View style={styles.rowContent}>
                        <Text style={styles.text}>하루 권장 금액</Text>
                        <Text style={styles.text}>{(props.dailyMoney+'').replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>
                </TouchableOpacity>
            </View>
            : 
            <View style={styles.container}>
                <TouchableOpacity onPress={handleSelected}>
                    <View style={styles.rowContent}>
                        <Text style={styles.text}>수입</Text>
                        <Text style={styles.text}>{(props.income+'').replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>
                    <View style={styles.rowContent}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.text}>월 저금액 </Text>
                            <Text style={styles.rateText}>({savingRate}%)</Text>
                        </View>
                        <Text style={styles.text}>{(props.sumOfSavings+'').replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>
                    <View style={styles.rowContent}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.text}>고정지출 </Text>
                            <Text style={styles.rateText}>({fixedRate}%)</Text>
                        </View>
                        <Text style={styles.text}>{(props.fixedExpenditure+'').replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>
                    <View style={styles.rowContent}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.text}>계획지출 </Text>
                            <Text style={styles.rateText}>({plannedRate}%)</Text>
                        </View>
                        <Text style={styles.text}>{(props.plannedExpenditure+'').replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>
                    <View style={styles.rowContent}>
                        <Text style={styles.text}>하루 권장 금액</Text>
                        <Text style={styles.text}>{(props.dailyMoney+'').replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>
                </TouchableOpacity>
            </View>
        }
        </View>
            
    )
}

const styles = StyleSheet.create({
    selectedContainer: {
        width: 330, 
        margin: 8,
        padding: 15,
        borderWidth: 2,
        borderColor: '#6090FA',
        borderRadius: 20,
        backgroundColor: '#F2F2F2',
    },
    rowContent: {
        marginVertical: 1, 
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    container: {
        width: 330, 
        margin: 8,
        padding: 15,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 15,
    },
    rateText: {
        fontSize: 12,
    }
})

export default MyBudgetCabinetItem;
