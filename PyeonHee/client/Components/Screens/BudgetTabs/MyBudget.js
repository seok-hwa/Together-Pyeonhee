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
import SavingPlanItem from './SavingsPlanItem';
import WriteBudget from './WriteBudgetScreen';

import config from '../../../config';

const url = config.url;
const MyBudgetScreen = ({navigation}) => {
    const [userID, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(true);
    const [saving, setSaving] = useState([]);

    const [isSelected, setIsSelected] = useState(false);
    
    const [fixedExpenditure, setFixedExpenditure] = useState(0);        //고정지출
    const [plannedExpenditure, setPlannedExpenditure] = useState(0);    //계획지출

    // const [sumOfSavings, setSumOfSavings] = useState(0);

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
        subscribe: 0,
        budgetPlanID: 0,
        sumOfSavings: 0,
    });

    let now = new Date();
    let todayMonth = now.getMonth()+1;

    const handleSingleIndexSelect = () => {
        setIsSelected(true);
        console.log('눌렀다!');
        console.log(isSelected);
      };

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

                    let total = responseJson.education + responseJson.transportation +
                    responseJson.shopping + responseJson.leisure + responseJson.insurance +
                    responseJson.medical + responseJson.rent + responseJson.communication +
                    responseJson.etc + responseJson.event + responseJson.subscribe; //responseJson.subscribe 포함돼야함

                    let fixedTemp = parseInt(responseJson.rent) + parseInt(responseJson.insurance) + 
                    parseInt(responseJson.communication) + responseJson.subscribe; //responseJson.subscribe 포함돼야함
                    console.log('고정지출 합:');
                    console.log(fixedTemp);

                    let plannedTemp = parseInt(responseJson.education) + parseInt(responseJson.traffic) +
                    parseInt(responseJson.shopping) + parseInt(responseJson.hobby) + parseInt(responseJson.insurance) +
                    parseInt(responseJson.medical) + parseInt(responseJson.ect) + parseInt(responseJson.event) ;
                    console.log('계획지출 합:');
                    console.log(plannedTemp);

                    setFixedExpenditure(fixedTemp);
                    setPlannedExpenditure(plannedTemp);
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
            <ScrollView style={styles.appSize}> 
                
                <Text style={styles.monthText}>
                    {todayMonth}월
                </Text>

{/* 하루권장소비금액 주세요 */}
                <View style={styles.container}>
                    <View style={styles.smallContainer}>
                        <Text style={{fontSize: 18, fontWeight:'bold'}}> 
                            하루 권장 소비금액 
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Text style={{fontSize: 20, fontWeight:'bold', color: '#8EB3EE', marginRight: 3}}>
                                하루권장소비금액!
                            </Text> 
                            <Text style={{fontSize: 18, fontWeight:'bold'}}>
                                원
                            </Text>
                        </View>
                        
                    </View>
                </View>

                <View style={styles.item2Container}>
                    <Text style={{fontSize: 15, fontWeight:'bold'}}>수입  {myBudgetData.userIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    <Text style={{fontSize: 15, fontWeight:'bold'}}>한 달 예산  {myBudgetData.userIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                </View>

                <View style={styles.container}>
                    <View style={styles.smallContainer}>
                        <Text style={{fontSize: 20, fontWeight:'bold'}}>
                            카테고리별 예산
                        </Text>
                    </View>

                    <View style={styles.smallContainer}>
                        <Text style={{fontSize: 18, fontWeight:'bold'}}>
                            고정지출 예산
                        </Text>
                        <Text style={{fontSize: 18, fontWeight:'bold'}}>
                            {fixedExpenditure.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원
                        </Text>
                    </View>

                    <View style={styles.category}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <View style={styles.logoContainer}>
                                <Icon name={'log-out-outline'} size={20} color={'#8EB3EE'}/>
                            </View>
                            <Text>월세</Text>
                        </View>
                        <Text style={styles.moneyText}>{myBudgetData.rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>

                    <View style={styles.category}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <View style={styles.logoContainer}>
                            <Image source={require('../assets/category/health-insurance.png')} style={{width: 18, height: 18, tintColor: '#8EB3EE'}}/>
                            </View>
                            <Text>보험료</Text>
                        </View>
                        <Text style={styles.moneyText}>{myBudgetData.insurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>

                    <View style={styles.category}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <View style={styles.logoContainer}>
                                <Icon name={'phone-portrait-outline'} size={20} color={'#8EB3EE'}/>
                            </View>
                            <Text>통신비</Text>
                        </View>
                        <Text style={styles.moneyText}>{myBudgetData.communication.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>
                    <View style={styles.category}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <View style={styles.logoContainer}>
                            <Image source={require('../assets/category/subscribe.png')} style={{width: 18, height: 18, tintColor: '#8EB3EE'}}/>
                            </View>
                            <Text>구독료</Text>
                        </View>
                        <Text style={styles.moneyText}>{myBudgetData.subscribe} 원</Text>
                    </View>

                    <View style={styles.smallContainer}>
                        <Text style={{fontSize: 18, fontWeight:'bold'}}>
                            계획지출 예산
                        </Text>
                        <Text style={{fontSize: 18, fontWeight:'bold'}}>
                            {plannedExpenditure.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                        </Text>
                    </View>
                    <View style={styles.category}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <View style={styles.logoContainer}>
                                <Icon name={'log-out-outline'} size={20} color={'#8EB3EE'}/>
                            </View>
                            <Text>교통비</Text>
                        </View>
                        <Text style={styles.moneyText}>{myBudgetData.traffic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>

                    <View style={styles.category}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <View style={styles.logoContainer}>
                                <Image source={require('../assets/category/leisure.png')} style={{width: 18, height: 18, tintColor: '#8EB3EE'}}/>
                            </View>
                            <Text>문화/취미/여행</Text>
                        </View>
                        <Text style={styles.moneyText}>{myBudgetData.hobby.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>

                    <View style={styles.category}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <View style={styles.logoContainer}>
                                <Image source={require('../assets/category/shopping.png')} style={{width: 18, height: 18, tintColor: '#8EB3EE'}}/>
                            </View>
                            <Text>뷰티/미용/쇼핑</Text>
                        </View>
                        <Text style={styles.moneyText}>{myBudgetData.shopping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>
                    <View style={styles.category}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <View style={styles.logoContainer}>
                            <Image source={require('../assets/category/education.png')} style={{width: 18, height: 18, tintColor: '#8EB3EE'}}/>
                            </View>
                            <Text>교육</Text>
                        </View>
                        <Text style={styles.moneyText}>{myBudgetData.education.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>
                    <View style={styles.category}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <View style={styles.logoContainer}>
                            <Image source={require('../assets/category/education.png')} style={{width: 18, height: 18, tintColor: '#8EB3EE'}}/>
                            </View>
                            <Text>의료비</Text>
                        </View>
                        <Text style={styles.moneyText}>{myBudgetData.medical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>

                    <View style={styles.category}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <View style={styles.logoContainer}>
                            <Image source={require('../assets/category/envelope.png')} style={{width: 18, height: 18, tintColor: '#8EB3EE'}}/>
                            </View>
                            <Text>경조사/선물</Text>
                        </View>
                        <Text style={styles.moneyText}>{myBudgetData.event.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>
                    <View style={styles.category}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <View style={styles.logoContainer}>
                                <Icon name={'ellipsis-horizontal-outline'} size={20} color={'#8EB3EE'}/>
                            </View>
                            <Text>기타</Text>
                        </View>
                        <Text style={styles.moneyText}>{myBudgetData.ect.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                    </View>


                </View>

                <View style={styles.container}>
                    <View style={styles.smallContainer}>
                        <Text style={{fontSize: 18, fontWeight:'bold'}}>
                            저금 계획
                        </Text>
                        <Text style={{fontSize: 18, fontWeight:'bold'}}>
                            {/* {myBudgetData.sumOfSavings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 */}
                        </Text>
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
    } else if(loading === true && isCompleted === false){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {isSelected === true && <WriteBudget navigation={navigation}/>}
                {isSelected === false && <Button title="예산 계획서 작성하기" onPress={handleSingleIndexSelect}></Button>}
            </View>
        )
    }else{
        return(
            <View style={styles.appSize}>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    appSize: {
        flex: 1,
        backgroundColor: 'white',
        // color: 'black',
    },
    monthText: {
        fontSize: 23, 
        fontWeight:'bold', 
        // margin: 15,
        marginLeft: 15, 
        marginTop: 15,
        color: 'black',
    },
    container: {
        paddingBottom: 10,
        borderBottomColor: '#F2F2F2',
        borderBottomWidth: 5,
    },
    smallContainer: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item2Container: {
        marginTop: 5,
        padding: 10,
        justifyContent: 'space-between',
        borderBottomColor: '#F2F2F2',
        borderBottomWidth: 5,
    },
    savingList: {
        margin: 15,
        paddingBottom: 10,
        justifyContent: 'space-between',
        borderBottomColor: 'gray',
        borderBottomWidth: 5,
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        padding: 8, 
    },
    logoContainer: {
        padding: 8,
        borderRadius: 20,
        marginRight: 15, 
        borderColor: '#8EB3EE',
        borderWidth: 1,
    },
    moneyText: {
        fontWeight:'bold', 
    }

});

export default MyBudgetScreen; 