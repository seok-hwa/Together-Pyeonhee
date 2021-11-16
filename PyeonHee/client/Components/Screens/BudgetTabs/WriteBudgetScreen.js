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
import config from '../../../config';
import BudgetSaveButton from '../../Buttons/BudgetSaveButton';
import InputBudget from './InputBudget';
import AddSavingPlan from './AddSavingPlan';
import SavingPlanList from './SavingPlanList';

const url = config.url;
const WriteBudgetScreen = ({navigation}) => {
    const [userID, setUserId] = useState('');
    const [addSavingsPlan, setAddSavingsPlan] = useState(false);
    // const [update, setUpdate] = useState(false);

    const [income, setIncome] = useState(0);   //수입
    const [savings, setSavings] = useState(0);   //저금계획

    const [fixedExpenditure, setFixedExpenditure] = useState(0);        //고정지출
    const [plannedExpenditure, setPlannedExpenditure] = useState(0);    //계획지출

    /* 고정지출 */
    const [monthlyRent, setMonthlyRent] = useState(0);          //월세
    const [insurance, setInsurance] = useState(0);              //보험
    const [transportation, setTransportation] = useState(0);    //교통비
    const [communication, setCommunication] = useState(0);      //통신비
    const [subscription, setSubscription] = useState(0);        //구독료 (V) -> 백에서 추가
    // const [food, setFood] = useState(0);                        //식비 (V) -> 생활비 대체 예정

    /* 계획지출 */
    const [leisure, setLeisure] = useState(0);      //문화, 취미, 여행
    const [shopping, setShopping] = useState(0);    //뷰티, 미용, 쇼핑
    const [education, setEducation] = useState(0);  //교육, 학습
    const [medical, setMedical] = useState(0);      //의료비
    const [event, setEvent] = useState(0);          //경조사,선물
    const [etc, setEtc] = useState(0);              //기타
    
    const handleSaveButton = () => {
        var tempTotal = parseInt(savings) + parseInt(fixedExpenditure) + parseInt(plannedExpenditure);
        console.log('수입');
        console.log(income)
        console.log('유효성검사 1');
        console.log(tempTotal)
        if(parseInt(tempTotal) > parseInt(income)){
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

        var tempTotal2 = parseInt(monthlyRent) + parseInt(insurance) + parseInt(transportation) + parseInt(communication) + parseInt(subscription) + parseInt(food);
        if(parseInt(tempTotal2) > parseInt(fixedExpenditure)){
            Popup.show({
              type: 'success',
              textBody: '고정지출 예산을 초과했습니다',
              buttonText: '확인',
              okButtonStyle: {backgroundColor: 'gray'},
              iconEnabled: false,
              callback: () => Popup.hide()
            })
            return;
        }

        var tempTotal3 = parseInt(leisure) + parseInt(shopping) + parseInt(education) + parseInt(medical) + parseInt(event) + + parseInt(etc);
        if(parseInt(tempTotal3) > parseInt(plannedExpenditure)){
            Popup.show({
              type: 'success',
              textBody: '계획지출 예산을 초과했습니다',
              buttonText: '확인',
              okButtonStyle: {backgroundColor: 'gray'},
              iconEnabled: false,
              callback: () => Popup.hide()
            })
            return;
        }

        /*
        Popup.show({    //for test
            type: 'success',
            textBody: '제출을 완료하시겠습니까?',
            buttonText: '확인',
            okButtonStyle: {backgroundColor: 'gray'},
            iconEnabled: false,
            callback: () => {
                Popup.hide()
                navigation.replace('Main');
            }
          })
          */
        // return;

        fetch(`${url}/submitBudgetPlan`, {
            method: 'POST',
            body: JSON.stringify({
                userID: userID,
                income: income,
                savings: savings,
                fixedExpenditure: fixedExpenditure,
                plannedExpenditure: plannedExpenditure,
                monthlyRent: monthlyRent,
                insurance: insurance,
                transportation: transportation,
                communication: communication,
                subscription: subscription,
                // food: food,
                leisure: leisure,
                shopping: shopping,
                education: education,
                medical: medical,
                event: event,
                etc: etc,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
          console.log(responseJson);
          if(responseJson.status === true){
            console.log('제출 완료');
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

    return(     
        <Root> 
            <View style={{  paddingLeft: 20, borderBottomWidth: 0.5, margin: 10}}>
                <Text style={{fontSize:20, }}>예산계획서 작성</Text>
            </View>
            <ScrollView style={styles.bodySize}>
                <KeyboardAvoidingView>
                    <View style={styles.bigCategoryContainer}>
                        <Text style={{fontSize: 15, fontWeight:'bold'}}>수입</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <TextInput
                                style={styles.textInputDesign}
                                placeholder='0'
                                onChangeText={text => setIncome(text)}
                                maxLength = {20}
                                keyboardType="numeric"
                                textAlign="right"
                            />
                            <Text style={{fontSize: 15, fontWeight:'bold'}}>원</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 10, }}>
                        <View style={styles.bigCategoryContainer}>
                            <Text style={{fontSize: 15, fontWeight:'bold'}}>저금계획</Text>
                            <AddSavingPlan income={income} setAddSavingsPlan={setAddSavingsPlan}/>
                        </View>
                        <SavingPlanList update={addSavingsPlan} setUpdate={setAddSavingsPlan}/>
                    </View>

                    <View style={{marginTop: 10, }}>
                        <View style={styles.bigCategoryContainer}>
                            <Text style={{fontSize: 15, fontWeight:'bold'}}>고정지출</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                <TextInput
                                    style={styles.textInputDesign}
                                    placeholder='0'
                                    onChangeText={text => setFixedExpenditure(text)}
                                    maxLength = {20}
                                    keyboardType="numeric"
                                    textAlign="right"
                                />
                                <Text style={{fontSize: 15, fontWeight:'bold'}}>원</Text>
                            </View>
                        </View>
                        <View style={styles.category}>
                            <View style={styles.logoContainer}>
                                <Icon name={'log-out-outline'} size={20} color={'gray'}/>
                            </View>
                            <View style={styles.categoryContainer}><Text>월세</Text></View>
                            <InputBudget setBudget={setMonthlyRent}/>
                        </View>
                        <View style={styles.category}>
                            <View style={styles.logoContainer}>
                                <Image source={require('../assets/category/health-insurance.png')} style={{width: 18, height: 18, tintColor: 'gray'}}/>
                            </View>
                            <View style={styles.categoryContainer}><Text>보험료</Text></View>
                            <InputBudget setBudget={setInsurance}/>
                        </View>
                        <View style={styles.category}>
                            <View style={styles.logoContainer}>
                                <Icon name={'bus-outline'} size={20} color={'gray'} />
                            </View>
                            <View style={styles.categoryContainer}><Text>교통비</Text></View>
                            <InputBudget setBudget={setTransportation}/>
                        </View>
                        <View style={styles.category}>
                            <View style={styles.logoContainer}>
                                <Icon name={'phone-portrait-outline'} size={20} color={'gray'} />
                            </View>
                            <View style={styles.categoryContainer}><Text>통신비</Text></View>
                            <InputBudget setBudget={setCommunication}/>
                        </View>
                        <View style={styles.category}>
                            <View style={styles.logoContainer}>
                                <Image source={require('../assets/category/subscribe.png')} style={{width: 18, height: 18, tintColor: 'gray'}}/>
                            </View>
                            <View style={styles.categoryContainer}><Text>구독료</Text></View>
                            <InputBudget setBudget={setSubscription}/>
                        </View>
                    </View>

                    <View style={{marginTop: 10, }}>
                        <View style={styles.bigCategoryContainer}>
                            <Text style={{fontSize: 15, fontWeight:'bold'}}>계획지출</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                <TextInput
                                    style={styles.textInputDesign}
                                    placeholder='0'
                                    onChangeText={text => setPlannedExpenditure(text)}
                                    maxLength = {20}
                                    keyboardType="numeric"
                                    textAlign="right"
                                />
                                <Text style={{fontSize: 15, fontWeight:'bold'}}>원</Text>
                            </View>
                        </View>
                        <View style={styles.category}>
                            <View style={styles.logoContainer}>
                                <Image source={require('../assets/category/leisure.png')} style={{width: 18, height: 18, tintColor: 'gray'}}/>
                            </View>
                            <View style={styles.categoryContainer}><Text>문화/취미/여행</Text></View>
                            <InputBudget setBudget={setLeisure}/>
                        </View>
                        <View style={styles.category}>
                            <View style={styles.logoContainer}>
                                <Image source={require('../assets/category/shopping.png')} style={{width: 18, height: 18, tintColor: 'gray'}}/>
                            </View>
                            <View style={styles.categoryContainer}><Text>뷰티/미용/쇼핑</Text></View>
                            <InputBudget setBudget={setShopping}/>
                        </View>
                        <View style={styles.category}>
                            <View style={styles.logoContainer}>
                                <Image source={require('../assets/category/education.png')} style={{width: 18, height: 18, tintColor: 'gray'}}/>
                            </View>
                            <View style={styles.categoryContainer}><Text>교육</Text></View>
                            <InputBudget setBudget={setEducation}/>
                        </View>
                        <View style={styles.category}>
                            <View style={styles.logoContainer}>
                                <Image source={require('../assets/category/education.png')} style={{width: 18, height: 18, tintColor: 'gray'}}/>
                            </View>
                            <View style={styles.categoryContainer}><Text>의료비</Text></View>
                            <InputBudget setBudget={setMedical}/>
                        </View>
                        <View style={styles.category}>
                            <View style={styles.logoContainer}>
                                <Image source={require('../assets/category/envelope.png')} style={{width: 18, height: 18, tintColor: 'gray'}}/>
                            </View>
                            <View style={styles.categoryContainer}><Text>경조사/선물</Text></View>
                            <InputBudget setBudget={setEvent}/>
                        </View>
                        <View style={styles.category}>
                            <View style={styles.logoContainer}>
                                <Icon name={'log-out-outline'} size={20} color={'gray'} />
                            </View>
                            <View style={styles.categoryContainer}><Text>기타</Text></View>
                            <InputBudget setBudget={setEtc}/>
                        </View>
                    </View>
                </KeyboardAvoidingView>

                <View style={styles.appFooter}>
                    <BudgetSaveButton onPress={handleSaveButton}/>
                </View>
            
            </ScrollView>
        </Root> 
    );
};
const styles = StyleSheet.create({
    bodySize: {
        flex: 1,
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
        marginLeft: 15,
        marginRight: 15,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'pink',
        borderBottomWidth: 1,
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3,
        marginLeft: 10,
        marginRight: 8,
    },
    logoContainer: {
        padding: 3,
        marginLeft: 8,
        borderRadius: 20,
        borderColor: '#BFBFBF',
        borderWidth: 1,
    },
    textInputDesign: {
        height: 35,
        width: 170,
        fontWeight:'bold'
    },
});

export default WriteBudgetScreen;