import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import BackButton from '../Buttons/BackButton';
import { StyleSheet, Text, View, } from 'react-native';
import BudgetItem from './BudgetItem';

const RecommendedPlanningList = () => {
    const [url, setUrl] = useState('');
    const [userID, setUserID] = useState('');
    const [otherBudgetData, setOtherBudgetData] = useState(0);

    useEffect(()=>{
        let tempID;
        let tempUrl;
        AsyncStorage.getItem("userID")
        .then(
            (value) => {
                if (value !== null){
                    tempID=value
                    setUserID(tempID);
                }
            }
        )
        .then( () => {
            AsyncStorage.getItem("url")
            .then((value) => {
                if (value !== null){
                    tempUrl=value;
                    setUrl(tempUrl);
                }
            })
            .then(()=>{
                console.log(tempID);
                console.log(tempUrl);
                fetch(`${tempUrl}/saveSelectBudgetPlan?userID=${tempID}`)   //get
                .then((response)=>response.json())
                .then((responseJson)=>{
                    console.log('response data');
                    console.log(responseJson);
                    setOtherBudgetData(responseJson.budgetData);

                    setLoading(true);
                })  
            })
        })
        .catch((error)=>{
            console.error(error);
        })
    }, [])   

    
        return (
            <View style={styles.appSize}>
                <View style={styles.appTopBar}>
                    <View style={styles.backButtonPosition}>
                        <BackButton />
                    </View>
                    <View style={styles.appTitlePosition}>
                        <View>
                            <Text style={styles.appTitle}>추천 예산 계획서</Text> 
                        </View>
                    </View>
                </View>
            
                <ScrollView>
                    <View>
                        {budgetData.map((budgetItems, index) => {
                        return <BudgetItem key={index} BudgetData={budgetItems} />;
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
        flex: 1,
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
export default RecommendedPlanningList;