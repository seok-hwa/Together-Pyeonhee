import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Modal} from 'react-native';
import config from '../../../config';
import SavingsPlanItem from './SavingsPlanItem';

const url = config.url;

const SavingPlanList = (props) => {
    const [userID, setUserID] = useState('');
    const [savingsPlan, setSavingsPlan] = useState([]);

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
            fetch(`${url}/SavingBudgetPlan?userID=${tempID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                if(responseJson === null) {
                    return;
                }
                console.log('response data');
                console.log(responseJson);
                setSavingsPlan(responseJson);
            })  
        })
    }, [])
    
    return (
        <View>
            {savingsPlan.map(item => {  //이 table에서는 key value가 뭐지
                return <SavingsPlanItem savingName={item.saving_name} key={item.planning_number} budgetPlanningID={item.planning_number} 
                savingMoney={item.savings_money} plannedDate={item.planned_date} duration={item.duration} allSavingsMoney={item.all_savings_money} 
                />;
            })}
        </View>
     )

}
const styles = StyleSheet.create({
})
export default SavingPlanList;
