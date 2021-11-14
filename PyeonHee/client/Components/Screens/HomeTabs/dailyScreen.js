import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import config from'../../../config';

const url = config.url;

const DailyScreen = (props) => {
    const [userID, setUserID] = useState('');
    const [userName, setUserName] = useState('테스트');
    const [loading, setLoading] = useState(false);

    const [rent, setRent] = useState(1000);
    const [education, setEducation] = useState(2000);
    const [traffic, setTraffic] = useState(3000);
    const [shopping, setShopping] = useState(4000);
    const [hobby, setHobby] = useState(5000);
    const [insurance, setInsurance] = useState(1000);
    const [medical, setMedical] = useState(2000);
    const [communication, setCommunication] = useState(2000);
    const [event, setEvent] = useState(3000);
    const [ect, setEct] = useState(5000);

    const [coinBank, setCoinBank] = useState(3000);
    const [dailyMoney, setDailyMoney] = useState(1000);
    const [monthMoney, setMonthMoney] = useState(1000);

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
            //for test
            fetch(`${url}/daily`, {
                method: 'POST',
                body: JSON.stringify({
                  userID: userID,
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

                setDailyMoney(responseJson.available_money);
                setCoinBank(responseJson.rest_money);

                setEducation(responseJson.education_expense);
                setTraffic(responseJson.transportation_expense);
                setShopping(responseJson.shopping_expense);
                setHobby(responseJson.leisure_expense);
                setInsurance(responseJson.insurance_expense);
                setMedical(responseJson.medical_expense);
                setRent(responseJson.monthly_rent);
                setCommunication(responseJson.communication_expense);
                setEct(responseJson.etc_expense);
                setEvent(responseJson.event_expense);

                let total = responseJson.education_expense+responseJson.transportation_expense+
                responseJson.shopping_expense+responseJson.leisure_expense+responseJson.insurance_expense+
                responseJson.medical_expense+responseJson.monthly_rent+responseJson.communication_expense+
                responseJson.etc_expense+responseJson.event_expense;
                setMonthMoney(total);
            }) 
            .then(()=>{
                /*
                fetch(`${url}/daily/savings`, {
                    method: 'POST',
                    body: JSON.stringify({
                      userID: userID,
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
    
                    setDailyMoney(responseJson.available_money);
                    setCoinBank(responseJson.rest_money);
    
                    setEducation(responseJson.education_expense);
                    setTraffic(responseJson.transportation_expense);
                    setShopping(responseJson.shopping_expense);
                    setHobby(responseJson.leisure_expense);
                    setInsurance(responseJson.insurance_expense);
                    setMedical(responseJson.medical_expense);
                    setRent(responseJson.monthly_rent);
                    setCommunication(responseJson.communication_expense);
                    setEct(responseJson.etc_expense);
                    setEvent(responseJson.event_expense);
    
                    let total = responseJson.education_expense+responseJson.transportation_expense+
                    responseJson.shopping_expense+responseJson.leisure_expense+responseJson.insurance_expense+
                    responseJson.medical_expense+responseJson.monthly_rent+responseJson.communication_expense+
                    responseJson.etc_expense+responseJson.event_expense;
                    setMonthMoney(total);
    
                    setLoading(true);
                }) 
                */
               setLoading(true);
            })
        })
    }, [])

    return (
        <View style={styles.appSize}>
            <View style={styles.appTopBar}>
                <View style={styles.titleDiv}>
                    <Text style={styles.NameStyle}>{userName}</Text>
                    <Text style={styles.NextToNameStyle}>님</Text>
                </View>
            </View>
            <View style={styles.appBody}>
                <View style={styles.innerTopDiv}>
                    <View style={styles.monthDiv}>
                        <Text style={styles.monthText}>11월</Text>
                    </View>
                </View>
                <Text style={styles.dailyText}>Daily</Text>
                <View style={styles.dailyBody}>
                    <View style={styles.savingDiv}>
                        <View style={styles.savingLeftDiv}>
                            <View style={styles.iconDiv}></View>
                            <Text>저금통</Text>
                        </View>
                        <View style={styles.savingRightDiv}>
                            <Text>+{coinBank}</Text>
                        </View>
                    </View>
                    <View style={styles.exDiv}>
                        <View style={styles.exTopDiv}>
                            <Text>월 누적 지출:</Text>
                            <Text style={styles.exText}>{monthMoney}원</Text>
                        </View>
                        <View style={styles.exBottomDiv}>
                            <Text>일일 잔여 예산:</Text> 
                            <Text style={styles.exText}>{dailyMoney}원</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.categoryText}>Category</Text>
                <View style={styles.categoryBody}>
                    <View style={styles.categoryInnerBody}>
                        <View style={styles.itemDiv}>
                            <Text style={styles.itemTitle}>쇼핑</Text>
                            <Text style={styles.priceTitle}>{shopping}원</Text>
                        </View>
                        <View style={styles.itemDiv}>
                            <Text style={styles.itemTitle}>취미</Text>
                            <Text style={styles.priceTitle}>{hobby}원</Text>
                        </View>
                        <View style={styles.itemDiv}>
                            <Text style={styles.itemTitle}>교통</Text>
                            <Text style={styles.priceTitle}>{traffic}원</Text>
                        </View>
                        <View style={styles.itemDiv}>
                            <Text style={styles.itemTitle}>통신</Text>
                            <Text style={styles.priceTitle}>{communication}원</Text>
                        </View>
                        <View style={styles.itemDiv}>
                            <Text style={styles.itemTitle}>월세</Text>
                            <Text style={styles.priceTitle}>{monthMoney}원</Text>
                        </View>
                        <View style={styles.itemDiv}>
                            <Text style={styles.itemTitle}>보험</Text>
                            <Text style={styles.priceTitle}>{insurance}원</Text>
                        </View>
                        <View style={styles.itemDiv}>
                            <Text style={styles.itemTitle}>의료</Text>
                            <Text style={styles.priceTitle}>{medical}원</Text>
                        </View>
                        <View style={styles.itemDiv}>
                            <Text style={styles.itemTitle}>경조사</Text>
                            <Text style={styles.priceTitle}>{event}원</Text>
                        </View>
                        <View style={styles.itemDiv}>
                            <Text style={styles.itemTitle}>기타</Text>
                            <Text style={styles.priceTitle}>{ect}원</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DailyScreen;

const styles = StyleSheet.create({
    appSize: {
      flex: 1,
      padding: 8,
      textAlign: 'center',
    },
    appTopBar: {
        height: 50,
    },
    appBody:{
        flex: 1,
        borderWidth: 1,
        borderRadius: 50,
    },
    titleDiv: {
        marginTop: 20,
        marginLeft: 15,
        flexDirection: 'row',
    },
    NameStyle:{
        fontSize: 20,
        color: 'black',
    },
    NextToNameStyle: {
        marginTop: 7,
    },
    innerTopDiv:{
        alignItems: 'center',
    },
    monthDiv:{
        marginTop: 5,
        borderRadius: 10,
        padding: 5,
        backgroundColor: '#87CEFA',
    },
    monthText:{
        fontWeight: 'bold',
        fontSize: 14,
    },
    dailyText:{
        margin: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    dailyBody:{
        borderRadius: 20,
        borderWidth: 1,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
    },
    categoryText:{
        margin: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    categoryBody:{
        borderRadius: 20,
        borderWidth: 1,
        flex: 3,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    iconDiv: {
        width: 50,
        height: 50,
        borderWidth: 1,
    },
    savingDiv:{
        flex: 2,
        flexDirection: 'row',
    },
    exDiv:{
        flex: 3,
    },
    savingLeftDiv:{
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 5,
    },
    savingRightDiv:{
        marginTop: 20,
    },
    exTopDiv: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    exBottomDiv: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    exText: {
        width: 100,
        textAlign: 'right',
    },
    categoryInnerBody: {
        marginLeft: 30,
        marginRight: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitle: {
        width: 50,
    },
    priceTitle: {
        width: 120,
        textAlign: 'right',
    },
    itemDiv: {
        flexDirection: 'row',
        margin: 2,
    },
});