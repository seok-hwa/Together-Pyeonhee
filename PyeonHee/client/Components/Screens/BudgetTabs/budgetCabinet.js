import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

import BudgetItem from '../BudgetItem';
import config from '../../../config';

const url = config.url;
const BudgetCabinet = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [otherBudgetData, setOtherBudgetData] = useState([]);

    useEffect(()=>{
        let tempID;
        AsyncStorage.getItem("userID")
        .then(
            (value) => {
                if (value !== null){
                    tempID=value
                    setUserID(tempID);
                }
            }
        )
        .then(()=>{
            console.log(tempID);
            console.log(`${url}/BudgetPlanCabinet?userID=${tempID}`);
            fetch(`${url}/BudgetPlanCabinet?userID=${tempID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setOtherBudgetData(responseJson);
            })  
        })
    }, [])
    
    
    return (
        <View style={styles.appSize}>
            <ScrollView>
                <View>
                    {
                        otherBudgetData.map(item => {
                        return <BudgetItem userAge={item.user_age} key={item.planning_number} budgetPlanningID={item.planning_number} navigation={navigation} userIncome={item.user_income} 
                        userTier={item.tier} userJob={item.job} userMbti={item.user_mbti}
                        />;
                    })
                    }
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    appSize: {
        flex: 1,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        paddingVertical: 5,
    },
    text: {
        lineHeight: 30,
        marginLeft: 10,
    },
})
export default BudgetCabinet;