import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, ScrollView} from 'react-native';
import config from'../../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import SavingItem from '../SavingItem';
const url = config.url;

const DailyScreen = (props) => {
    const [userID, setUserID] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [isCompleted, setIsCompleted] = useState(true);

    const [foodExpenses, setFoodExpenses] = useState(0);
    const [rent, setRent] = useState(0);
    const [education, setEducation] = useState(0);
    const [traffic, setTraffic] = useState(0);
    const [shopping, setShopping] = useState(0);
    const [hobby, setHobby] = useState(0);
    const [insurance, setInsurance] = useState(0);
    const [medical, setMedical] = useState(0);
    const [communication, setCommunication] = useState(0);
    const [event, setEvent] = useState(0);
    const [ect, setEct] = useState(0);
    const [subscribe, setSubscribe] = useState(0);

    const [realFoodExpenses, setRealFoodExpenses] = useState(0);
    const [realRent, setRealRent] = useState(0);
    const [realEducation, setRealEducation] = useState(0);
    const [realTraffic, setRealTraffic] = useState(0);
    const [realShopping, setRealShopping] = useState(0);
    const [realHobby, setRealHobby] = useState(0);
    const [realInsurance, setRealInsurance] = useState(0);
    const [realMedical, setRealMedical] = useState(0);
    const [realCommunication, setRealCommunication] = useState(0);
    const [realEvent, setRealEvent] = useState(0);
    const [realEct, setRealEct] = useState(0);
    const [realSubscribe, setRealSubscribe] = useState(0);

    const [coinBank, setCoinBank] = useState(0);

    const [dailyRestMoney, setDailyRestMoney] = useState(0);
    const [dailyAvailableMoney, setDailyAvailableMoney] = useState(0);
    const [monthMoney, setMonthMoney] = useState(0);

    const [saving, setSaving] = useState([]);
    //for test

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
                console.log(responseJson);
                console.log('이름', responseJson.userName[0].name);
                setUserName(responseJson.userName[0].name);
                setFoodExpenses(responseJson.live_money);
                if((responseJson.planamt.length === 0 && responseJson.realamt.length === 0) || responseJson.length === 0){
                    setIsCompleted(false);
                }else{

                    if(responseJson.planamt.length != 0){
                        setCoinBank(responseJson.planamt.rest_money);
                        setDailyRestMoney(responseJson.planamt.available_money - responseJson.planamt.daily_spent_money);
                        setDailyAvailableMoney(responseJson.planamt.available_money);

                        
                        setEducation(responseJson.planamt.education_expense);
                        setTraffic(responseJson.planamt.transportation_expense);
                        setShopping(responseJson.planamt.shopping_expense);
                        setHobby(responseJson.planamt.leisure_expense);
                        setInsurance(responseJson.planamt.insurance_expense);
                        setMedical(responseJson.planamt.medical_expense);
                        setRent(responseJson.planamt.monthly_rent);
                        setCommunication(responseJson.planamt.communication_expense);
                        setEct(responseJson.planamt.etc_expense);
                        setEvent(responseJson.planamt.event_expense);
                        setSubscribe(responseJson.planamt.subscribe_expense);
                    }

                    if(responseJson.realamt.length != 0){
                        let tempMonthMoney=0;
                        responseJson.realamt.map(item  => {
                            tempMonthMoney=tempMonthMoney+Number(item.daily_amount);
                            console.log('monthmoney=', monthMoney);
                            if(item.tran_type === '쇼핑'){
                                setRealShopping(item.daily_amount);
                            }else if(item.tran_type === '교통'){
                                setRealTraffic(item.daily_amount);
                            }else if(item.tran_type === '구독'){
                                setRealSubscribe(item.daily_amount);
                            }else if(item.tran_type === '통신'){
                                setRealCommunication(item.daily_amount);
                            }else if(item.tran_type === '여가'){
                                setRealHobby(item.daily_amount);
                            }else if(item.tran_type === '교육'){
                                setRealEducation(item.daily_amount);
                            }else if(item.tran_type === '선물'){
                                setRealEvent(item.daily_amount);
                            }else if(item.tran_type === '보험'){
                                setRealInsurance(item.daily_amount);
                            }else if(item.tran_type === '의료'){
                                setRealMedical(item.daily_amount);
                            }else if(item.tran_type === '월세'){
                                setRealRent(item.daily_amount);
                            }else if(item.tran_type === '기타'){
                                setRealEct(item.daily_amount);
                            }
                            else if(item.tran_type === '식비'){
                                setRealEct(item.live_money);
                            }
                        })
                        setMonthMoney(tempMonthMoney);
                    }


                    var now = new Date();	// 현재 날짜 및 시간
                    var year = now.getFullYear(); //년
                    var month = now.getMonth();	// 월
                    var day = now.getDate(); 

                    setYear(year);
                    setMonth(month+1);
                    setDay(day);
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
    
                   // setLoading(true);   //test
                }) 
                .then(()=>{
                        fetch(`${url}/saveTranHistory?userID=${tempID}`)   //get
                        .then((response)=>response.json())
                        .then((responseJson)=>{
                            console.log(responseJson);
                            if(responseJson.status === 'success'){
                            console.log('거래내역 저장 성공');
                            }else{
                            console.log('거래내역 저장 실패');
                            }
                        })
                        setLoading(true);
                })
            })
        })
    }, [])
    if(loading === true && isCompleted === true){
        return (
            <ScrollView style={styles.appSize}>
                <View style={styles.appTopBar}>
                    <View style={styles.titleDiv}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.NameStyle}>{userName}</Text>
                            <Text style={styles.NextToNameStyle}>님</Text>
                        </View>
                        <View style={styles.monthDiv}>
                            <Text style={styles.monthText}>{year}년 {month}월 {day}일</Text>
                        </View>
                    </View>
                    
                </View>
                <View style={styles.appBody}>
                    {/* <View style={styles.innerTopDiv}>
                        <View style={styles.monthDiv}>
                            <Text style={styles.monthText}>{year}년 {month}월 {day}일</Text>
                        </View>
                    </View> */}
                    <Text style={styles.dailyText}>Daily</Text>
                    <View style={styles.dailyBody}>
                        <View style={styles.savingDiv}>
                            <View style={styles.savingLeftDiv}>
                                <Image source={require('../assets/coinBank.png')} style={styles.iconDiv}/>
                                <Text style={styles.savingLockerText}>저금통</Text>
                                <Text style={styles.savingPriceText}>+  {coinBank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View>
                            {/* <View style={styles.savingRightDiv}>
                                <Text style={styles.savingPriceText}>+  {coinBank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View> */}
                        </View>
                        <View style={styles.exDiv}>
                            <View style={styles.exTopDiv}>
                                <Text style={styles.exTitleDiv}>월 누적 지출:</Text>
                                <Text style={styles.exText}>{monthMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View>
                            <View style={styles.exBottomDiv}>
                                <Text style={styles.exTitleDiv}>일일 권장 금액:</Text> 
                                <Text style={styles.exText}>{dailyAvailableMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View>
                            <View style={styles.exBottomDiv}>
                                <Text style={styles.exTitleDiv}>일일 잔여 예산:</Text> 
                                <Text style={styles.exText}>{dailyRestMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.dailyText}>Category</Text>
                    <View style={styles.categoryBody}>
                        <View style={styles.categoryInnerBody}>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/spoon.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>식비</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realFoodExpenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    <Text style={styles.priceTitle}>{foodExpenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    {/* <Text style={styles.realPriceTitle}>{realTraffic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    <Text style={styles.priceTitle}>{traffic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> */}
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/traffic.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>교통비</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realTraffic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    <Text style={styles.priceTitle}>{traffic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/leisure.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>문화/취미/여행</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realHobby.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    <Text style={styles.priceTitle}>{hobby.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                            <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/shopping.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>뷰티/미용/쇼핑</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realShopping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    <Text style={styles.priceTitle}>{shopping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/education.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>교육</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                <Text style={styles.realPriceTitle}>{realEducation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                <Text style={styles.priceTitle}>{education.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/medical.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>의료비</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                <Text style={styles.realPriceTitle}>{realMedical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                <Text style={styles.priceTitle}>{medical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/event.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>경조사/선물</Text>
                                    <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realEvent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    <Text style={styles.priceTitle}>{event.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Icon name={'ellipsis-horizontal-outline'}  size={20} color={'#203864'}/>
                                </View>
                                <Text style={styles.itemTitle}>기타</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realEct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    <Text style={styles.priceTitle}>{ect.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                </View>
                            </View>

                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Icon name={'log-out-outline'} size={20} color={'#203864'}/>
                                </View>
                                <Text style={styles.itemTitle}>월세</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realRent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    <Text style={styles.priceTitle}>{rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/health-insurance.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>보험료</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realInsurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    <Text style={styles.priceTitle}>{insurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Icon name={'phone-portrait-outline'} size={20} color={'#203864'}/>
                                </View>
                                <Text style={styles.itemTitle}>통신비</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realCommunication.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    <Text style={styles.priceTitle}>{communication.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                </View>
                            </View>
                            <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/subscribe.png')} style={styles.categoryIconDiv}/>
                                </View>
                                <Text style={styles.itemTitle}>구독료</Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.realPriceTitle}>{realSubscribe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    <Text style={styles.priceTitle}>{subscribe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                </View>
                            </View>
                            
                        </View>
                    </View>
                    <Text style={styles.dailyText}>Saving</Text>
                    <View style={styles.savingBody}>
                        <View>
                            {saving.length === 0 ?
                                <Text style={{margin: 10,}}>아직 저장된 저축 계획이 없습니다.</Text> :
                                saving.map(item => {
                                    return <SavingItem key={item.saving_number} savingName={item.saving_name} currentSavingMoney={item.all_savings_money} goalSavingMoney={item.savings_money}
                                        startSavingDate={item.start_date} endSavingDate={item.finish_date}/>;
                            })}
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
      padding: 3,
      textAlign: 'center',
      backgroundColor: '#F0F4FA',
    },
    appTopBar: {
        height: 40,
    },
    appBody:{
        flex: 1,
    },
    titleDiv: {
        marginTop: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    NameStyle:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
    NextToNameStyle: {
        marginTop: 9,
        fontSize: 15,
        fontWeight: 'bold',
    },
    innerTopDiv:{
        alignItems: 'center',
        backgroundColor: 'yellow',

    },
    monthDiv:{
        marginLeft: 10,
        padding: 5,
    },
    monthText:{
        fontWeight: 'bold',
        fontSize: 15,
    },
    dailyText:{
        margin: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#203864',
    },
    dailyBody:{
        borderRadius: 13,
        height: 110,
        paddingVertical: 5, 
        marginHorizontal: 5,
        flexDirection: 'row',
        backgroundColor: '#203864',
    },
    savingBody:{
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    savingLockerText: {
        marginTop: 5,
        fontSize: 12,
        color: 'white',
    },
    categoryText:{
        margin: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    categoryBody:{
        borderRadius: 13,
        height: 620,
        marginBottom: 20,
        marginHorizontal: 5,
        backgroundColor: 'white',
    },
    iconDiv: {
        width: 50,
        height: 50,
        tintColor: 'pink'
    },
    exTitleDiv: {
        width: 100,
        fontSize: 13,
        fontWeight: '500',
        color: 'white',
    },
    savingDiv:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    exDiv:{
        flex: 2,
        paddingVertical: 5,
        marginRight: 10,
    },
    savingLeftDiv:{
        flexDirection: 'column',
        alignItems: 'center',
    },
    savingRightDiv:{
        marginTop: 35,
        marginLeft: 5,
    },
    savingPriceText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
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
        width: 90,
        textAlign: 'right',
        color: 'white',
    },
    categoryInnerBody: {
        marginHorizontal: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitle: {
        width: 110,
        color: 'black',
    },
    priceTitle: {
        width: 150,
        textAlign: 'right',
        fontSize: 11,
        marginTop: 3,
    },
    realPriceTitle: {
        width: 165,
        textAlign: 'right',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#203864',
    },
    slashFont: {
        width: 30,
        textAlign: 'center',
        fontSize: 15,
    },
    itemDiv: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center'
    },
    logoContainer: {
        padding: 6,
        borderRadius: 20,
        marginRight: 10, 
        borderColor: '#203864',
        borderWidth: 1,
    },
    categoryIconDiv: {
        margin: 3,
        width: 18,
        height: 18,
        tintColor: '#203864',
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