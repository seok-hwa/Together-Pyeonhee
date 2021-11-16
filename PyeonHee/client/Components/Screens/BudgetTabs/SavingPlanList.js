import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Modal} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../config';
import SavingsPlanItem from './SavingsPlanItem';

const url = config.url;

const SavingPlanList = (props) => {
    const [userID, setUserID] = useState('');
    // const [savingsPlan, setSavingsPlan] = useState([]);
    const [totalSavings, setTotalSavings] = useState(0);

    // for test
    let savingsPlan = [
        {
            saving_name: '10년 안에 집사기',
            savings_money: 100,
            planned_date: '2021/8/16',
            period: 25,
            all_savings_money: 200,
            saving_number: 1,
        },
        {
            saving_name:'5년 안에 차',
            savings_money: 50,
            planned_date: '2021/5/5',
            period: 13,
            all_savings_money: 200,
            saving_number: 2, 
        },
    ]

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
            console.log(`${url}/SavingBudgetPlan?userID=${tempID}`);

            // fetch(`${url}/SavingBudgetPlan?userID=${tempID}`)   //get
            // .then((response)=>response.json())
            // .then((responseJson)=>{
            //     if(responseJson === null) {
            //         return;
            //     }
            //     console.log('response data');
            //     console.log(responseJson);
            //     setSavingsPlan(responseJson);
            // })  

            console.log('++++++totalSavings');
            console.log(totalSavings);
            let sum = 0;
            let temp = savingsPlan.map(item => {
                sum = sum + item.savings_money;
                return item.savings_money;
            })
            console.log(sum);
            setTotalSavings(sum);
            props.setSavings(sum);
            console.log('=============');
            // console.log(totalSavings);
        })
    }, [])

    if(props.update === true) {
        props.setUpdate(false);
        // fetch(`${url}/SavingBudgetPlan?userID=${userID}`)   //get
        // .then((response)=>response.json())
        // .then((responseJson)=>{
        //     if(responseJson === null) {
        //         return;
        //     }
        //     console.log('response data');
        //     console.log(responseJson);
        //     setSavingsPlan(responseJson);
        // }) 
        console.log('업데이트완료!!!!!!!!!!!!!!!!!!');
    }
    
    return (
        <View>
            {/* <Text>총 {props}원</Text> */}
            <View>            
            {savingsPlan.map(item => {
                return (<SavingsPlanItem savingName={item.saving_name} key={item.saving_number} 
                savingPlanningID={item.saving_number} savingMoney={item.savings_money} 
                plannedDate={item.planned_date} period={item.period} allSavingsMoney={item.all_savings_money} 
                />);
            })}
            </View>
        </View>
     )

}
const styles = StyleSheet.create({
})
export default SavingPlanList;
