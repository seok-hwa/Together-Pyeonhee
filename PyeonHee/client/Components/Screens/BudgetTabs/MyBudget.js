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
// import SavingPlanList from './SavingPlanList';
import SavingPlanItem from './SavingsPlanItem';

import config from '../../../config';

const url = config.url;
const MyBudgetScreen = ({navigation}) => {
    const [userID, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(true);
    const [saving, setSaving] = useState([]);
    // const [sumOfSavings, setSumOfSavings] = (0);

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

    let now = new Date();
    let todayMonth = now.getMonth()+1;

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
                if(responseJson.length === 0){
                    setIsCompleted(false);
                } else{
                    setMyBudgetData(responseJson);
                }
                // console.log(myBudgetData);
            }) 
            .then(()=>{
                
                fetch(`${url}/daily/savings`, {
                    method: 'POST',
                    body: JSON.stringify({
                        userID: tempID,
                    }),
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type':'application/json',
                    },
                })
                .then((response)=>response.json())
                .then((responseJson)=>{
                    console.log('response data');
                    console.log(responseJson);
                    
                    setSaving(responseJson);
    
                    setLoading(true);
                    if(loading === true){
                        console.log('로딩 됐어');
                    }else{
                        console.log('로딩 안 됐어');
                    }
                    if(isCompleted === true){
                        console.log('정보 됐어');
                    }else{
                        console.log('정보 안 됐어');
                    }
                }) 
                .then(()=>{
                })
            })
        })
    }, [])

    if(loading === true && isCompleted === true){
        return(     
            <ScrollView> 
                <Text style={{fontSize: 23, fontWeight:'bold'}}>
                    {todayMonth}월
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
                        {/* <Text style={{fontSize: 15, fontWeight:'bold'}}>총 {sumOfSavings} 원</Text> */}
                    </View>
                    <View>
                        {saving.length === 0 ?
                            <Text style={{margin: 10,}}>아직 저장된 저축 계획이 없습니다.</Text> :
                            saving.map(item => {
                                return <SavingPlanItem key={item.saving_number} savingName={item.saving_name} 
                                    currentSavingMoney={item.all_savings_money} savingMoney={item.savings_money}
                                    startSavingDate={item.start_date} endSavingDate={item.finish_date}/>;
                        })}
                    </View>
                </View>

            </ScrollView> 
        )
    } else{
        return(
            <View>
                <Text>로딩중..</Text>
            </View>
        );
    }
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