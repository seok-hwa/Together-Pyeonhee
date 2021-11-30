import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';

import BudgetItem from '../BudgetItem';
import config from '../../../config';

const url = config.url;
const BudgetCabinet = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [otherBudgetData, setOtherBudgetData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

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
            .then(()=>{
                setLoading(true);
            })  
        })
    }, [])
    const loadCabinet = () => {
        setRefresh(true);
        fetch(`${url}/BudgetPlanCabinet?userID=${userID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setOtherBudgetData(responseJson);
            })
            .then(()=>{
                setRefresh(false);
            })  
    }
    if(loading === true){
    return (
        <View style={styles.appSize}>
                <View>
                    <FlatList
                    keyExtractor={item => item.planning_number}
                    data={otherBudgetData}
                    renderItem={({item}) => <BudgetItem userAge={item.user_age} budgetPlanningID={item.planning_number} navigation={navigation} userIncome={item.user_income} 
                    userTier={item.tier} userJob={item.job} userMbti={item.user_mbti}
                    // userRead={item.userRead}  //->이거는 사용자가 읽었는지 아닌지 확인하려구~!
                    />}
                    refreshing={refresh}
                    onRefresh={loadCabinet}
                    />
                </View>
        </View>
    )}
    else{
        return(
            <View style={styles.appSize}>
            </View>
        )
    }
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