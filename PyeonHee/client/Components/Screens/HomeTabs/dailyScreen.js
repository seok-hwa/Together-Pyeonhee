import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, ScrollView} from 'react-native';
import config from'../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import SavingItem from '../SavingItem';
const url = config.url;

const DailyScreen = (props) => {
    const [userID, setUserID] = useState('');
    const [userName, setUserName] = useState('테스트');
    const [loading, setLoading] = useState(false);
    const [month, setMonth] = useState('');
    const [isCompleted, setIsCompleted] = useState(true);

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
    const [subscribe, setSubscribe] = useState(0);

    const [coinBank, setCoinBank] = useState(3000);
    const [dailyMoney, setDailyMoney] = useState(1000);
    const [monthMoney, setMonthMoney] = useState(1000);

    const [saving, setSaving] = useState([]);
    //for test
    /*
    let saving=[
        {
            saving_number: 1,
            saving_name: '하하',
            all_savings_money: 2000,
            savings_money: 20000,
            start_date: '2020',
            finish_date: '2021',
        },
    ]*/

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
                  userID: tempID,
                }),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type':'application/json',
                },
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data 야 여기야!!');
                console.log(responseJson);
                if(responseJson.length === 0){
                    setIsCompleted(false);
                }else{
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
                    setSubscribe(responseJson.subscribe_expense);

                    let total = responseJson.education_expense+responseJson.transportation_expense+
                    responseJson.shopping_expense+responseJson.leisure_expense+responseJson.insurance_expense+
                    responseJson.medical_expense+responseJson.monthly_rent+responseJson.communication_expense+
                    responseJson.etc_expense+responseJson.event_expense;
                    setMonthMoney(total);

                    var now = new Date();	// 현재 날짜 및 시간
                    var month = now.getMonth();	// 월

                    setMonth(month+1);
                }
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
        return (
            <ScrollView style={styles.appSize}>
                <View style={styles.appTopBar}>
                    <View style={styles.titleDiv}>
                        <Text style={styles.NameStyle}>{userName}</Text>
                        <Text style={styles.NextToNameStyle}>님</Text>
                    </View>
                </View>
                <View style={styles.appBody}>
                    <View style={styles.innerTopDiv}>
                        <View style={styles.monthDiv}>
                            <Text style={styles.monthText}>{month}월</Text>
                        </View>
                    </View>
                    <Text style={styles.dailyText}>Daily</Text>
                    <View style={styles.dailyBody}>
                        <View style={styles.savingDiv}>
                            <View style={styles.savingLeftDiv}>
                                <Image source={require('../assets/coinBank.png')} style={styles.iconDiv}/>
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
                    <Text style={styles.dailyText}>Saving</Text>
                        <View style={styles.savingBody}>
                            {saving.length === 0 ?
                            <Text style={{margin: 10,}}>아직 저장된 저축 계획이 없습니다.</Text> :
                            saving.map(item => {
                            return <SavingItem key={item.saving_number} savingName={item.saving_name} currentSavingMoney={item.all_savings_money} goalSavingMoney={item.savings_money}
                            startSavingDate={item.start_date} endSavingDate={item.finish_date}/>;
                            })}
                        </View>
                    <Text style={styles.categoryText}>Category</Text>
                    <View style={styles.categoryBody}>
                        <View style={styles.categoryInnerBody}>
                            <View style={styles.itemDiv}>
                                <Image source={require('../assets/category/shopping.png')} style={styles.categoryIconDiv}/>
                                <Text style={styles.itemTitle}>쇼핑</Text>
                                <Text style={styles.priceTitle}>{shopping}원</Text>
                            </View>
                            <View style={styles.itemDiv}>
                                <Image source={require('../assets/category/hobby.png')} style={styles.categoryIconDiv}/>
                                <Text style={styles.itemTitle}>취미</Text>
                                <Text style={styles.priceTitle}>{hobby}원</Text>
                            </View>
                            <View style={styles.itemDiv}>
                                <Image source={require('../assets/category/traffic.png')} style={styles.categoryIconDiv}/>
                                <Text style={styles.itemTitle}>교통</Text>
                                <Text style={styles.priceTitle}>{traffic}원</Text>
                            </View>
                            <View style={styles.itemDiv}>
                                <Image source={require('../assets/category/communication.png')} style={styles.categoryIconDiv}/>
                                <Text style={styles.itemTitle}>통신</Text>
                                <Text style={styles.priceTitle}>{communication}원</Text>
                            </View>
                            <View style={styles.itemDiv}>
                                <Image source={require('../assets/category/rent.png')} style={styles.categoryIconDiv}/>
                                <Text style={styles.itemTitle}>월세</Text>
                                <Text style={styles.priceTitle}>{rent}원</Text>
                            </View>
                            <View style={styles.itemDiv}>
                                <Image source={require('../assets/category/insurance.png')} style={styles.categoryIconDiv}/>
                                <Text style={styles.itemTitle}>보험</Text>
                                <Text style={styles.priceTitle}>{insurance}원</Text>
                            </View>
                            <View style={styles.itemDiv}>
                                <Image source={require('../assets/category/medical.png')} style={styles.categoryIconDiv}/>
                                <Text style={styles.itemTitle}>의료</Text>
                                <Text style={styles.priceTitle}>{medical}원</Text>
                            </View>
                            <View style={styles.itemDiv}>
                                <Image source={require('../assets/category/education.png')} style={styles.categoryIconDiv}/>
                                <Text style={styles.itemTitle}>교육</Text>
                                <Text style={styles.priceTitle}>{education}원</Text>
                            </View>
                            <View style={styles.itemDiv}>
                                <Image source={require('../assets/category/event.png')} style={styles.categoryIconDiv}/>
                                <Text style={styles.itemTitle}>경조사</Text>
                                <Text style={styles.priceTitle}>{event}원</Text>
                            </View>
                            <View style={styles.itemDiv}>
                                <Image source={require('../assets/category/subscribe.png')} style={styles.categoryIconDiv}/>
                                <Text style={styles.itemTitle}>구독</Text>
                                <Text style={styles.priceTitle}>{subscribe}원</Text>
                            </View>
                            <View style={styles.itemDiv}>
                                <Image source={require('../assets/category/ect.png')} style={styles.categoryIconDiv}/>
                                <Text style={styles.itemTitle}>기타</Text>
                                <Text style={styles.priceTitle}>{ect}원</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }else if(loading === true && isCompleted === false){
        return(
            <View style={styles.appSize}>
                <View style={styles.appTopBar}>
                    <View style={styles.titleDiv}>
                        <Text style={styles.NameStyle}>{userName}</Text>
                        <Text style={styles.NextToNameStyle}>님</Text>
                    </View>
                </View>
                <View style={styles.appBody}>
                    <View style={styles.notCompletedInnerBody}>
                        <Text style={styles.notCompletedText}>아직 예산 계획서를 작성하지 않았습니다.</Text>
                    </View>
                </View>
            </View>
        )
    }else{
        return(
            <View style={styles.appSize}>

            </View>
        );
    }
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
        height: 100,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    savingBody:{
        borderRadius: 20,
        borderWidth: 1,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    categoryText:{
        margin: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    categoryBody:{
        borderRadius: 20,
        borderWidth: 1,
        height: 300,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: 'white',
    },
    iconDiv: {
        width: 50,
        height: 50,
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
        marginLeft: 5,
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
        marginLeft: 10,
    },
    priceTitle: {
        width: 120,
        textAlign: 'right',
    },
    itemDiv: {
        flexDirection: 'row',
        margin: 2,
    },
    categoryIconDiv: {
        width: 20,
        height: 20,
    },
    notCompletedInnerBody: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 50,
    },
    notCompletedText :{
        fontWeight: 'bold',
        color: 'black',
    },
});