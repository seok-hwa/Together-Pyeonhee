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

import config from '../../../config';

const url = config.url;
const MyBudgetScreen = ({navigation}) => {
    const [userID, setUserId] = useState('');
    const [myBudgetData, setMyBudgetData] = useState([]);

    let todayMonth = now.getMonth()+1;

    //for test
    let myBudgetData = {
        income: 500,
        savings: 300,
    }

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
            console.log(`${url}/myBudgetPlan?userID=${tempID}`);
            // fetch(`${url}/myBudgetPlan?userID=${tempID}`)   //get
            // .then((response)=>response.json())
            // .then((responseJson)=>{
            //     console.log('response data');
            //     console.log(responseJson);
            //     myBudgetData(responseJson);
            // })  
        })
    }, [])

    return(     
        <View> 

        </View> 
    );
};
const styles = StyleSheet.create({

});

export default MyBudgetScreen; 