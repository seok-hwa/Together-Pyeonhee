import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import BudgetItem from '../BudgetItem';
import config from '../../../config';

const url = config.url;
const BudgetList = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [otherBudgetData, setOtherBudgetData] = useState([]);
    const [recommendedBudgetData, setRecommendedBudgetData] = useState([]);
    const [check, setCheck] = useState(false);

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

            fetch(`${url}/viewBudgetPlan?userID=${tempID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setRecommendedBudgetData(responseJson);
            })
            
        })
    }, [])   

    
    return (
        <View style={styles.appSize}>
            {/* <Text>본인 예산 계획서</Text> */}
            <ScrollView>
                <View style={styles.wrapper}>
                    <CheckBox value={check} onChange={() => setCheck(!check)} />
                    <Text style={styles.text}>
                        나와 유사한 계획서 찾기
                    </Text>
                </View>
                <View>
                    {check === false && 
                        otherBudgetData.map(item => {
                        return <BudgetItem userAge={item.user_age} key={item.planning_number} budgetPlanningID={item.planning_number} navigation={navigation} userIncome={item.user_income} 
                        userFixedExpense={item.monthly_rent+item.insurance_expense+item.transportation_expense+item.communication_expense+item.education_expense} 
                        userVariableExpense={item.leisure_expense+ item.shopping_expense+ item.medical_expense+ item.event_expense + item.etc_expense} 
                        userAge={item.user_age} userIncome={item.user_income}
                        />;
                    })}
                    {check === true && 
                    
                        recommendedBudgetData.map(item => {
                        return <BudgetItem userAge={item.user_age} key={item.planning_number} budgetPlanningID={item.planning_number} navigation={navigation} userIncome={item.user_income} 
                        userFixedExpense={item.monthly_rent+item.insurance_expense+item.transportation_expense+item.communication_expense+item.education_expense} 
                        userVariableExpense={item.leisure_expense+ item.shopping_expense+ item.medical_expense+ item.event_expense + item.etc_expense} 
                        userAge={item.user_age} userIncome={item.user_income}
                        />;
                    })}
                
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    appSize: {
        flex: 1,
    },
    appTopBar: {
        height: 50,
        flexDirection: 'row',
        marginBottom: 5,
    },
    backButtonPosition: {
        marginLeft: 10,
        flex: 1,
        flexDirection: 'column-reverse',
    },
    appTitlePosition: {
        flex: 10,
        flexDirection: 'column-reverse',
        marginLeft: 20,
        marginBottom: 5,
    },
    appTitle: {
        fontSize: 15,
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
