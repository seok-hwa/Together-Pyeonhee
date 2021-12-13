import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { 
    StyleSheet, 
    Text, 
    View, 
    ScrollView, 
    FlatList, 
    DeviceEventEmitter,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import BudgetItem from '../BudgetItem';

import { saveSelectBudgetPlan, viewBudgetPlan } from '../../api';
const BudgetList = ({navigation, route}) => {
    const [userID, setUserID] = useState('');
    const [otherBudgetData, setOtherBudgetData] = useState([]);
    const [recommendedBudgetData, setRecommendedBudgetData] = useState([]);
    const [check, setCheck] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [read, setRead] = useState(false);

    const fetchBudget = (userID) => {
        saveSelectBudgetPlan(userID)
        .then((responseJson)=>{
            console.log('타계획서 목록 response data');
            console.log(responseJson);

            setOtherBudgetData(responseJson);
        })
        .then(()=>{
            setLoading(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    };

    useEffect(()=>{
        let tempID;
        DeviceEventEmitter.addListener('OtherBudgetInfo', () => {
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
                fetchBudget(tempID);
            })
            .catch((error)=>{
                console.log(error);
            })
        })
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
            fetchBudget(tempID);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[route])
    
    const checkHandler = () => {
        setCheck(!check);
        
        if(check === false && read === false) {
            setRead(true);
            viewBudgetPlan(userID)
            .then((responseJson)=>{
                console.log('나와 유사한 계획서 찾기');
                console.log(responseJson);
                setRecommendedBudgetData(responseJson);
            })
        }
    }

    if(loading === true){
        return (
            <View style={styles.appSize}>
                <ScrollView>
        
                <View style={styles.wrapper}>
                    <CheckBox value={check} onChange={checkHandler} />
                    <Text style={styles.text}>
                        나와 유사한 계획서 찾기
                    </Text>
                </View>

                { check === false && 
                    otherBudgetData.map(item => {
                    return <BudgetItem key={item.planning_number} userAge={item.user_age} budgetPlanningID={item.planning_number} navigation={navigation} 
                        userIncome={item.user_income} userTier={item.tier} userJob={item.job} userMbti={item.user_mbti} userID={userID}
                        cabinet={false}
                    />;
                })}
                { check === true && 
                    recommendedBudgetData.map(item => {
                    return <BudgetItem key={item.planning_number} userAge={item.user_age} budgetPlanningID={item.planning_number} navigation={navigation} 
                        userIncome={item.user_income} userTier={item.tier} userJob={item.job} userMbti={item.user_mbti} userID={userID}
                        cabinet={false}
                    />;
                })} 
            
            </ScrollView>
            </View>
        )
    }
    else {
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
export default BudgetList;