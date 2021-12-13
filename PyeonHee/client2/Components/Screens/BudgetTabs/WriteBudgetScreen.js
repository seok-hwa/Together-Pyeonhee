import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { Root, Popup } from 'react-native-popup-confirm-toast';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Image,
    ScrollView,
    Button,
    Alert,
} from 'react-native';
import BudgetSaveButton from '../../Buttons/BudgetSaveButton';
import InputBudget from './InputBudget';
import AddSavingPlan from './AddSavingPlan';
import SavingPlanItem from './SavingsPlanItem';
import CallMyBudgetCabinet from './myBudgetCabinet';
import { dailySaving, submitBudgetPlan, MyBudgetPlanDetail } from '../../api';

const WriteBudgetScreen = ({navigation}) => {
    const [userID, setUserId] = useState('');
    const [addSavingsPlan, setAddSavingsPlan] = useState(false);

    const [saving, setSaving] = useState([]);
    const [loading, setLoading] = useState(false);

    const [callMyButgetPlan, setCallMyButgetPlan] = useState(false);
    const [callMyBudgetID, setCallMyBudgetID] = useState(0);

    const [income, setIncome] = useState("0");   //수입
    const [sumOfSavings, setSumOfSavings] = useState(0);    //저금계획 총합계

    const [fixedExpenditure, setFixedExpenditure] = useState(0);        //고정지출
    const [plannedExpenditure, setPlannedExpenditure] = useState(0);    //계획지출

    /* 고정지출 */
    const [monthlyRent, setMonthlyRent] = useState("0");          //월세
    const [insurance, setInsurance] = useState("0");              //보험
    const [communication, setCommunication] = useState("0");      //통신비
    const [subscription, setSubscription] = useState("0");        //구독료 (V) -> 백에서 추가

    /* 계획지출 */
    const [transportation, setTransportation] = useState("0");    //교통비
    const [leisure, setLeisure] = useState("0");      //문화, 취미, 여행
    const [shopping, setShopping] = useState("0");    //뷰티, 미용, 쇼핑
    const [education, setEducation] = useState("0");  //교육, 학습
    const [medical, setMedical] = useState("0");      //의료비
    const [event, setEvent] = useState("0");          //경조사,선물
    const [ect, setEct] = useState("0");              //기타
    

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

            dailySaving(tempID)
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                
                setSaving(responseJson);
                if(responseJson.length > 0) {
                    let tempSum = 0;
                    responseJson.map(item => {
                        tempSum = tempSum + item.savings_money;
                        // return tempSum;
                    })
                    console.log('저금계획 합계');
                    console.log(tempSum);
                    setSumOfSavings(tempSum);
                }

                if(loading === true){
                    console.log('로딩 됐어');
                }else{
                    console.log('로딩 안 됐어');
                }
                setLoading(true);
            }) 
            .then(()=>{                
            })
        }) 
    }, []);

    if(addSavingsPlan === true) {
        dailySaving(userID)
        .then((responseJson)=>{
            console.log('response data');
            console.log(responseJson);
            
            setSaving(responseJson);
            if(saving.length > 0) {
                let tempSum = 0;

                saving.map(item => {
                    tempSum = tempSum + item.savings_money;
                    // return tempSum;
                })
                console.log('저금계획 합계');
                console.log(tempSum);
                setSumOfSavings(tempSum);
            }
            
            setAddSavingsPlan(false);
        }) 
        .then(()=>{
        })
    }

    const handleSaveButton = () => {

        let tempFixed = parseInt(monthlyRent.split(",").join(""))+parseInt(insurance.split(",").join(""))+parseInt(communication.split(",").join(""))+parseInt(subscription.split(",").join(""));
        setFixedExpenditure(tempFixed);

        console.log('고정지출');
        console.log(tempFixed);

        let tempPlanned = parseInt(transportation.split(",").join(""))+parseInt(leisure.split(",").join(""))+parseInt(shopping.split(",").join(""))+
            parseInt(education.split(",").join(""))+parseInt(medical.split(",").join(""))+parseInt(event.split(",").join(""))+parseInt(ect.split(",").join(""));
        setPlannedExpenditure(tempPlanned);

        console.log('계획지출');
        console.log(plannedExpenditure);

        let tempTotal = parseInt(sumOfSavings) + parseInt(fixedExpenditure) + parseInt(plannedExpenditure);

        console.log('수입');
        console.log(parseInt(income.split(",").join("")))
        console.log('유효성검사 1');
        console.log(tempTotal)
        if(parseInt(tempTotal) > parseInt(income.split(",").join(""))){
            Popup.show({
              type: 'success',
              textBody: '수입이 저금계획/고정지출/변동지출 보다 적습니다.',
              buttonText: '확인',
              okButtonStyle: {backgroundColor: 'gray'},
               iconEnabled: false,
              callback: () => Popup.hide()
            })
            return;
        }
        
        Popup.show({
            type: 'success',
            textBody: '제출을 완료하시겠습니까?',
            buttonText: '확인',
            okButtonStyle: {backgroundColor: 'gray'},
            iconEnabled: false,
            callback: () => {
                Popup.hide()
            }
        })

        submitBudgetPlan(userID, parseInt(income.split(",").join("")), parseInt(sumOfSavings), fixedExpenditure, plannedExpenditure,
            parseInt(monthlyRent.split(",").join("")), parseInt(insurance.split(",").join("")), parseInt(transportation.split(",").join("")), 
            parseInt(communication.split(",").join("")), parseInt(subscription.split(",").join("")), parseInt(leisure.split(",").join("")),
            parseInt(shopping.split(",").join("")), parseInt(education.split(",").join("")), parseInt(medical.split(",").join("")),
            parseInt(event.split(",").join("")), parseInt(ect.split(",").join(""))
        )
        .then((responseJson)=>{
            console.log('제출 완료');
            console.log(responseJson);
            
          if(responseJson.status === 'success'){
            console.log('제출 완료!!!!!!');
            navigation.replace('Main');
          }else{
            console.log('fail to submit.');
          }
        })
        .catch((error)=>{
          console.error(error);
        })
    }

    useEffect(()=>{
        AsyncStorage.getItem('userID', (err, result) => {
            let tempID = result;
            if(tempID!= null){
                setUserId(tempID);
            }
        })
    })

    if(callMyButgetPlan === true) {
        MyBudgetPlanDetail(callMyBudgetID)
        .then((responseJson)=>{
            console.log('response data');

            console.log(responseJson);

            setIncome(responseJson[0].user_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            
            /* 고정지출 */
           setMonthlyRent(responseJson[0].monthly_rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
           setInsurance(responseJson[0].insurance_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
           setCommunication(responseJson[0].communication_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
           setSubscription(responseJson[0].subscribe_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

           /* 계획지출 */
           setTransportation(responseJson[0].transportation_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
           setLeisure(responseJson[0].leisure_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
           setShopping(responseJson[0].shopping_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
           setEducation(responseJson[0].education_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
           setMedical(responseJson[0].medical_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
           setEvent(responseJson[0].event_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
           setEct(responseJson[0].etc_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        })
        .then(()=>{     
        })

        setCallMyButgetPlan(false); //for test
    }


    if(loading === true ){
    return(     
        <Root>       
            <ScrollView style={styles.bodySize}>
                <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between',  margin: 5,}}>
                    <Text style={styles.monthText}>{todayMonth} 월</Text>
                    <CallMyBudgetCabinet setCallMyButget={setCallMyButgetPlan} setCallMyBudgetPlanID={setCallMyBudgetID}/>
                </View>
                
                <KeyboardAvoidingView>
                    <View style={styles.contentContainer}>
                        <View style={styles.bigCategoryContainer}>
                            <Text style={{fontSize: 20, fontWeight:'bold'}}>수입</Text>
                            <InputBudget num={income} setBudget={setIncome} big={'true'}/>
                        </View>
                    </View>

                    <View style={styles.contentContainer}>
                        <View style={{... styles.bigCategoryContainer, paddingTop: 15,}}>
                            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                <Text style={{fontSize: 20, fontWeight:'bold', marginRight: 10,}}>저금계획</Text>
                                <AddSavingPlan income={income} setAddSavingsPlan={setAddSavingsPlan}/>
                            </View>

                            {saving.length === 0 ?
                                <Text style={{fontSize: 18, fontWeight:'bold'}}>총 0 원</Text> :
                                <Text style={{fontSize: 18, fontWeight:'bold'}}>총 {sumOfSavings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
                            }
                        </View>
                      
                        <View>
                            {saving.length === 0 ?
                                <Text style={{margin: 10,}}>아직 저장된 저축 계획이 없습니다.</Text> :
                                saving.map(item => {
                                    return <SavingPlanItem key={item.saving_number} savingName={item.saving_name} 
                                        currentSavingMoney={item.all_savings_money} savingMoney={item.savings_money}
                                        startSavingDate={item.start_date} endSavingDate={item.finish_date}
                                        userID={userID} setAddSavingsPlan={setAddSavingsPlan} savingID={item.saving_number} 
                                        userIncome={parseInt(income.split(",").join(""))} sumOfSavings={parseInt(sumOfSavings)} 
                                        fixedExpenditure={(parseInt(monthlyRent.split(",").join(""))+parseInt(insurance.split(",").join(""))+parseInt(communication.split(",").join(""))+parseInt(subscription.split(",").join(""))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                                        plannedExpenditure={(parseInt(transportation.split(",").join(""))+parseInt(leisure.split(",").join(""))+parseInt(shopping.split(",").join(""))+
                                        parseInt(education.split(",").join(""))+parseInt(medical.split(",").join(""))+parseInt(event.split(",").join(""))+
                                        parseInt(ect.split(",").join(""))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    />;
                            })}
                        </View>
                    </View>

                    <View style={styles.contentContainer}>
                        <View style={{margin: 10, }}>
                            <Text style={{fontSize: 20, fontWeight:'bold'}}>카테고리별 예산</Text>
                        </View>

                        <View style={{marginTop: 10, }}>
                            <View style={styles.bigCategoryContainer}>
                                <Text style={{fontSize: 18, fontWeight:'bold'}}>고정지출</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <Text style={{fontSize: 18, fontWeight:'bold'}}>
                                        {(parseInt(monthlyRent.split(",").join(""))+parseInt(insurance.split(",").join(""))+parseInt(communication.split(",").join(""))+parseInt(subscription.split(",").join(""))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.category}>
                                <View style={styles.logoContainer}>
                                    <Icon name={'log-out-outline'} size={20} color={'gray'}/>
                                </View>
                                <View style={styles.categoryContainer}><Text>월세</Text></View>
                                <InputBudget num={monthlyRent} setBudget={setMonthlyRent}/>
                            </View>

                            <View style={styles.category}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/health-insurance.png')} style={{width: 18, height: 18, tintColor: 'gray'}}/>
                                </View>
                                <View style={styles.categoryContainer}><Text>보험료</Text></View>
                                <InputBudget num={insurance} setBudget={setInsurance}/>
                            </View>

                            <View style={styles.category}>
                                <View style={styles.logoContainer}>
                                    <Icon name={'phone-portrait-outline'} size={20} color={'gray'} />
                                </View>
                                <View style={styles.categoryContainer}><Text>통신비</Text></View>
                                <InputBudget num={communication} setBudget={setCommunication}/>
                            </View>

                            <View style={styles.category}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/subscribe.png')} style={{width: 18, height: 18, tintColor: 'gray'}}/>
                                </View>
                                <View style={styles.categoryContainer}><Text>구독료</Text></View>
                                <InputBudget num={subscription} setBudget={setSubscription}/>
                            </View>
                        </View>

                        <View style={{marginTop: 10, }}>
                            <View style={styles.bigCategoryContainer}>
                                <Text style={{fontSize: 18, fontWeight:'bold'}}>계획지출</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <Text style={{fontSize: 18, fontWeight:'bold'}}>
                                        {(parseInt(transportation.split(",").join(""))+parseInt(leisure.split(",").join(""))+parseInt(shopping.split(",").join(""))+
                                        parseInt(education.split(",").join(""))+parseInt(medical.split(",").join(""))+parseInt(event.split(",").join(""))+
                                        parseInt(ect.split(",").join(""))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.category}>
                                <View style={styles.logoContainer}>
                                    <Icon name={'bus-outline'} size={20} color={'gray'} />
                                </View>
                                <View style={styles.categoryContainer}><Text>교통비</Text></View>
                                <InputBudget num={transportation} setBudget={setTransportation}/>
                            </View>

                            <View style={styles.category}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/leisure.png')} style={{width: 18, height: 18, tintColor: 'gray'}}/>
                                </View>
                                <View style={styles.categoryContainer}><Text>문화/취미/여행</Text></View>
                                <InputBudget num={leisure} setBudget={setLeisure}/>
                            </View>

                            <View style={styles.category}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/shopping.png')} style={{width: 18, height: 18, tintColor: 'gray'}}/>
                                </View>
                                <View style={styles.categoryContainer}><Text>뷰티/미용/쇼핑</Text></View>
                                <InputBudget num={shopping} setBudget={setShopping}/>
                            </View>

                            <View style={styles.category}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/education.png')} style={{width: 18, height: 18, tintColor: 'gray'}}/>
                                </View>
                                <View style={styles.categoryContainer}><Text>교육</Text></View>
                                <InputBudget num={education} setBudget={setEducation}/>
                            </View>

                            <View style={styles.category}>
                                <View style={styles.logoContainer}>
                                    <Icon name={'bandage-outline'} size={20} color={'gray'}/>
                                </View>
                                <View style={styles.categoryContainer}><Text>의료비</Text></View>
                                <InputBudget num={medical} setBudget={setMedical}/>
                            </View>

                            <View style={styles.category}>
                                <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/event.png')} style={{width: 18, height: 18, tintColor: 'gray'}}/>
                                </View>
                                <View style={styles.categoryContainer}><Text>경조사/선물</Text></View>
                                <InputBudget num={event} setBudget={setEvent}/>
                            </View>

                            <View style={styles.category}>
                                <View style={styles.logoContainer}>
                                    <Icon name={'ellipsis-horizontal-outline'} size={20} color={'gray'} />
                                </View>
                                <View style={styles.categoryContainer}><Text>기타</Text></View>
                                <InputBudget num={ect} setBudget={setEct}/>
                            </View>
                            
                        </View>
                    </View>
                </KeyboardAvoidingView>

                <View style={styles.appFooter}>
                    <BudgetSaveButton onPress={handleSaveButton}/>
                </View>
            
            </ScrollView>
        </Root> 
    )
    }else{
        return(
            <View>
            </View>
        )
    }
};
const styles = StyleSheet.create({
    monthText: {
        fontSize: 23, 
        fontWeight:'bold', 
        marginLeft: 25, 
        marginTop: 15,
        marginBottom: 10,
        color: 'black',
    },
    contentContainer: {
        margin: 8, 
        padding: 5, 
        borderRadius: 20,
        borderColor: '#F2F2F2',
        borderWidth: 3,
        backgroundColor: 'white',
    },
    bodySize: {
        flex: 1,
        backgroundColor: '#8EB3EE',
    },
    appFooter: {
        margin: 15,
        flex: 2,
        alignItems: 'center',
    },
    categoryContainer: {
        width: 100,
        marginLeft : 15,
    },
    bigCategoryContainer: {
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3,
        marginLeft: 10,
        marginRight: 15,
    },
    logoContainer: {
        padding: 3,
        marginLeft: 8,
        borderRadius: 20,
        borderColor: '#BFBFBF',
        borderWidth: 1,
    },
});

export default WriteBudgetScreen;