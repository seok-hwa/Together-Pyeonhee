import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import BudgetItem from '../BudgetItem';
import config from '../../../config';

const url = config.url;
const BudgetList = ({navigation}) => {
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

    
    return (
        <View style={styles.appSize}>
            {/* <Text>본인 예산 계획서</Text> */}
            <ScrollView>
                <View>
                    {
                        otherBudgetData.map(item => {
                        return <BudgetItem userAge={item.user_age} key={item.planning_number} budgetPlanningID={item.planning_number} navigation={navigation} userIncome={item.user_income} 
                        userFixedExpense={item.monthly_rent+item.insurance_expense+item.transportation_expense+item.communication_expense+item.education_expense} 
                        userVariableExpense={item.leisure_expense+ item.shopping_expense+ item.medical_expense+ item.event_expense + item.etc_expense} 
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
})
export default BudgetList;