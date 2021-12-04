import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import BudgetItem from '../BudgetItem';
import config from '../../../config';

const url = config.url;
const BudgetList = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [otherBudgetData, setOtherBudgetData] = useState([]);
    const [recommendedBudgetData, setRecommendedBudgetData] = useState([]);
    const [check, setCheck] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [read, setRead] = useState(false);

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
            console.log(`${url}/saveSelectBudgetPlan?userID=${tempID}`);
            fetch(`${url}/saveSelectBudgetPlan?userID=${tempID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setOtherBudgetData(responseJson);
            })  
        })
    }, [])
    
    const checkHandler = () => {
        setCheck(!check);
        
        if(check === false && read === false) {
            setRead(true);
            fetch(`${url}/viewBudgetPlan?userID=${userID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('나와 유사한 계획서 찾기');
                console.log(responseJson);
                setRecommendedBudgetData(responseJson);
            })
        }
    }

    return (
            <ScrollView style={styles.appSize}>
        
                <View style={styles.wrapper}>
                    <CheckBox value={check} onChange={checkHandler} />
                    <Text style={styles.text}>
                        나와 유사한 계획서 찾기
                    </Text>
                </View>

                {
                check === false && 
                otherBudgetData.map(item => {
                    return <BudgetItem key={item.planning_number} userAge={item.user_age} budgetPlanningID={item.planning_number} navigation={navigation} 
                    userIncome={item.user_income} userTier={item.tier} userJob={item.job} userMbti={item.user_mbti} budgetCabinet={false}
                    />;
                })}
                {check === true && 
                    recommendedBudgetData.map(item => {
                    return <BudgetItem key={item.planning_number} userAge={item.user_age} budgetPlanningID={item.planning_number} navigation={navigation} 
                    userIncome={item.user_income} userTier={item.tier} userJob={item.job} userMbti={item.user_mbti} budgetCabinet={false}
                    />;
                })
            }

            </ScrollView>
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
export default BudgetList;