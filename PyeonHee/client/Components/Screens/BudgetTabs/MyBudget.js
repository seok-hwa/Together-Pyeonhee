import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    Button,
} from 'react-native';
import SavingPlanList from './SavingPlanList';

import config from '../../../config';

const url = config.url;
const MyBudgetScreen = ({navigation}) => {
    const [userID, setUserId] = useState('');
    const [myBudgetData, setMyBudgetData] = useState({
        userLikeCount: 0,
        userMBTI: '',
        userAge: 0,
        userIncome: 0,
        rent: 0,
        insurance: 0,
        traffic: 0,
        communication: 0,
        hobby: 0,
        shopping: 0,
        education: 0,
        medical: 0,
        event: 0,
        ect: 0,
        subscribe: null,
        budgetPlanID: 0,
    });

    const [savings, setSavings] = useState(0);

    let now = new Date();
    let todayMonth = now.getMonth()+1;

    // let myBudgetData = {
    //     income: 3000000,
    //     savings: 1000000,
    //     fixedExpenditure: 500000,
    //     plannedExpenditure: 1000000,
    //     monthlyRent: 0,
    //     insurance: 200000,
    //     transportation: 150000,
    //     communication: 80000,
    //     subscription: 25000,
    //     leisure: 200000,
    //     shopping: 200000,
    //     education: 30000,
    //     medical: 20000,
    //     event: 150000,
    //     etc: 200000,
    // }

    useEffect(()=>{
        let tempID;
        AsyncStorage.getItem("userID")
        .then(
            (value) => {
                if (value !== null){
                    tempID=value
                    setUserId(tempID);
                }
            }
        )
        .then(()=>{
            console.log(tempID);
            console.log(`${url}/myBudgetPlan?userID=${tempID}`);
            fetch(`${url}/myBudgetPlan?userID=${tempID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setMyBudgetData(responseJson);
                // console.log(myBudgetData);
            })  
        })
    }, [])

    return(     
        <View> 
            <Text>
                {todayMonth} 월
            </Text>
            <View style={styles.bigCategoryContainer}>
                <Text style={{fontSize: 15, fontWeight:'bold'}}>수입</Text>
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <Text style={{fontSize: 15, fontWeight:'bold'}}>{myBudgetData.userIncome}원</Text>
                </View>
            </View>

            <View style={{marginTop: 10, }}>
                <View style={styles.bigCategoryContainer}>
                    <Text style={{fontSize: 15, fontWeight:'bold'}}>저금계획</Text>
                    <Text style={{fontSize: 15, fontWeight:'bold'}}>총 {savings} 원</Text>
                </View>
                <SavingPlanList setSavings={setSavings}/>
            </View>

        </View> 
    );
};
const styles = StyleSheet.create({
    bigCategoryContainer: {
        marginLeft: 15,
        marginRight: 15,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'pink',
        borderBottomWidth: 1,
    },

});

export default MyBudgetScreen; 