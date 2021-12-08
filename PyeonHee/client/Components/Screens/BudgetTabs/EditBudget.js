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
    Modal,
} from 'react-native';
import config from '../../../config';
import BudgetSaveButton from '../../Buttons/BudgetSaveButton';
import EditInputBudget from './EditInputBudget';

const url = config.url;
const EditBudgetScreen = (props) => {

    const [userID, setUserId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    // const [saving, setSaving] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const [income, setIncome] = useState("");   //수입
    // const [savings, setSavings] = useState(0);   //저금계획 -> total 합계 받아오기
    const [sumOfSavings, setSumOfSavings] = useState("");    //저금계획 총합계

    const [fixedExpenditure, setFixedExpenditure] = useState(0);        //고정지출
    const [plannedExpenditure, setPlannedExpenditure] = useState(0);    //계획지출

    /* 고정지출 */
    const [monthlyRent, setMonthlyRent] = useState("");          //월세
    const [insurance, setInsurance] = useState("");              //보험
    const [communication, setCommunication] = useState("");      //통신비
    const [subscription, setSubscription] = useState("");        //구독료 (V) -> 백에서 추가

    /* 계획지출 */
    const [transportation, setTransportation] = useState("");    //교통비
    const [leisure, setLeisure] = useState("");      //문화, 취미, 여행
    const [shopping, setShopping] = useState("");    //뷰티, 미용, 쇼핑
    const [education, setEducation] = useState("");  //교육, 학습
    const [medical, setMedical] = useState("");      //의료비
    const [event, setEvent] = useState("");          //경조사,선물
    const [ect, setEct] = useState("");              //기타

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
            console.log(userID);
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
                    // setMyBudgetData(responseJson);
                    setIncome(responseJson.userIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    setSumOfSavings(responseJson.sumOfSavings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

                    setMonthlyRent(responseJson.rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    setInsurance(responseJson.insurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    setCommunication(responseJson.communication.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    setSubscription(responseJson.subscribe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

                    setTransportation(responseJson.traffic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    setLeisure(responseJson.hobby.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    setShopping(responseJson.shopping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    setEducation(responseJson.education.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    setMedical(responseJson.medical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    setEvent(responseJson.event.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    setEct(responseJson.ect.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

                    let fixedTemp = parseInt(responseJson.rent) + parseInt(responseJson.insurance) + 
                    parseInt(responseJson.communication) + responseJson.subscribe;
                    console.log('고정지출 합:');
                    console.log(fixedTemp);
                    setFixedExpenditure(fixedTemp);
                

                    let plannedTemp = parseInt(responseJson.education) + parseInt(responseJson.traffic) +
                    parseInt(responseJson.shopping) + parseInt(responseJson.hobby) + 
                    parseInt(responseJson.medical) + parseInt(responseJson.ect) + parseInt(responseJson.event) ;
                    console.log('계획지출 합:');
                    console.log(plannedTemp);
                    setPlannedExpenditure(plannedTemp);

                    // let monthlyTemp = parseInt(fixedTemp) + parseInt(plannedTemp);

                    // setFixedExpenditure(fixedTemp);
                    // setPlannedExpenditure(plannedTemp);
                    // setMonthly(monthlyTemp);

                    setLoading(true);
                }
                // console.log(myBudgetData);
            })
            }) 
    }, []);

    

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

        
        let tempTotal = parseInt(sumOfSavings.split(",").join("")) + parseInt(fixedExpenditure) + parseInt(plannedExpenditure);

        console.log('수입');
        console.log(parseInt(income.split(",").join("")));
        console.log('유효성검사 1');
        console.log(tempTotal);
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

        fetch(`${url}/editBudget`, {
            method: 'POST',
            body: JSON.stringify({
                userID: userID,
                income: parseInt(income.split(",").join("")),
                savings: parseInt(sumOfSavings.split(",").join("")),
                fixedExpenditure: fixedExpenditure,
                plannedExpenditure: plannedExpenditure,
                monthlyRent: parseInt(monthlyRent.split(",").join("")),
                insurance: parseInt(insurance.split(",").join("")),
                transportation: parseInt(transportation.split(",").join("")),
                communication: parseInt(communication.split(",").join("")),
                subscription: parseInt(subscription.split(",").join("")),
                leisure: parseInt(leisure.split(",").join("")),
                shopping: parseInt(shopping.split(",").join("")),
                education: parseInt(education.split(",").join("")),
                medical: parseInt(medical.split(",").join("")),
                event: parseInt(event.split(",").join("")),
                etc: parseInt(ect.split(",").join("")),
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log('제출 완료');
            console.log(responseJson);
            
          if(responseJson.status === 'success'){
            console.log('제출 완료!!!!!!');
            // navigation.replace('Main');
            setModalVisible(!modalVisible);
            
            // navigation.goBack();
          }else{
            console.log('fail to submit.');
          }
        })
        .catch((error)=>{
          console.error(error);
        })
        props.setIsEdited(true);
    }

    if(loading === true){
    return(     
        <View>
            <Modal
                animationType = {"slide"}
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                //  alert('Modal has now been closed.');
                 setModalVisible(!modalVisible);
                }}
            >       
                <ScrollView style={styles.bodySize}>

                {/* <Text>{todayMonth} 월</Text> */}

                    <View style={{flexDirection: 'row', paddingTop: 15, justifyContent: 'space-between',}}>
                        <Text style={styles.monthText}>
                            {todayMonth}월
                        </Text>
                    </View>
                
                
                    <KeyboardAvoidingView>
                        <View style={styles.item2Container}>
                            <Text style={{fontSize: 18, fontWeight:'bold'}}>수입     {income} 원</Text>
                            <Text style={{fontSize: 18, fontWeight:'bold'}}>월 저금액     {sumOfSavings} 원</Text>
                        </View>


                        <View style={styles.container}>
                            <View style={styles.smallContainer}>
                                <Text style={{fontSize: 20, fontWeight:'bold'}}>
                                    카테고리별 예산
                                </Text>
                            </View>

                            <View style={styles.smallContainer}>
                                <Text style={{fontSize: 18, fontWeight:'bold'}}>
                                    고정지출 
                                </Text>
                                <Text style={{fontSize: 15, fontWeight:'bold'}}>
                                    {(parseInt(monthlyRent.split(",").join(""))+parseInt(insurance.split(",").join(""))+parseInt(communication.split(",").join(""))+parseInt(subscription.split(",").join(""))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                </Text>
                            </View>

                            <View style={styles.category}>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={styles.logoContainer}>
                                        <Icon name={'log-out-outline'} size={20} color={'#8EB3EE'}/>
                                    </View>
                                    <Text>월세</Text>
                                </View>
                                <EditInputBudget num={monthlyRent} setBudget={setMonthlyRent}/>
                            </View>

                            <View style={styles.category}>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/health-insurance.png')} style={{width: 18, height: 18, tintColor: '#8EB3EE'}}/>
                                    </View>
                                    <Text>보험료</Text>
                                </View>
                                <EditInputBudget num={insurance} setBudget={setInsurance}/>
                            </View>

                            <View style={styles.category}>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={styles.logoContainer}>
                                        <Icon name={'phone-portrait-outline'} size={20} color={'#8EB3EE'}/>
                                    </View>
                                    <Text>통신비</Text>
                                </View>
                                <EditInputBudget num={communication} setBudget={setCommunication}/>
                            </View>
                            <View style={styles.category}>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/subscribe.png')} style={{width: 18, height: 18, tintColor: '#8EB3EE'}}/>
                                    </View>
                                    <Text>구독료</Text>
                                </View>
                                <EditInputBudget num={subscription} setBudget={setSubscription}/>
                            </View>

                            <View style={styles.smallContainer}>
                                <Text style={{fontSize: 18, fontWeight:'bold'}}>
                                    계획지출 예산
                                </Text>
                                <Text style={{fontSize: 15, fontWeight:'bold'}}>
                                            {(parseInt(transportation.split(",").join(""))+parseInt(leisure.split(",").join(""))+parseInt(shopping.split(",").join(""))+
                                            parseInt(education.split(",").join(""))+parseInt(medical.split(",").join(""))+parseInt(event.split(",").join(""))+
                                            parseInt(ect.split(",").join(""))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                        </Text>
                            </View>
                            <View style={styles.category}>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={styles.logoContainer}>
                                        <Icon name={'log-out-outline'} size={20} color={'#8EB3EE'}/>
                                    </View>
                                    <Text>교통비</Text>
                                </View>
                                <EditInputBudget num={transportation} setBudget={setTransportation}/>
                            </View>
                            <View style={styles.category}>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={styles.logoContainer}>
                                        <Image source={require('../assets/category/leisure.png')} style={{width: 18, height: 18, tintColor: '#8EB3EE'}}/>
                                    </View>
                                    <Text>문화/취미/여행</Text>
                                </View>
                                <EditInputBudget num={leisure} setBudget={setLeisure}/>
                            </View>

                            <View style={styles.category}>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={styles.logoContainer}>
                                        <Image source={require('../assets/category/shopping.png')} style={{width: 18, height: 18, tintColor: '#8EB3EE'}}/>
                                    </View>
                                    <Text>뷰티/미용/쇼핑</Text>
                                </View>
                                <EditInputBudget num={shopping} setBudget={setShopping}/>
                            </View>
                            <View style={styles.category}>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/education.png')} style={{width: 18, height: 18, tintColor: '#8EB3EE'}}/>
                                    </View>
                                    <Text>교육</Text>
                                </View>
                                <EditInputBudget num={education} setBudget={setEducation}/>
                            </View>
                            <View style={styles.category}>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={styles.logoContainer}>
                                    <Icon name={'bandage-outline'} size={20} color={'#8EB3EE'}/>
                                    </View>
                                    <Text>의료비</Text>
                                </View>
                                <EditInputBudget num={medical} setBudget={setMedical}/>
                            </View>

                            <View style={styles.category}>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={styles.logoContainer}>
                                    <Image source={require('../assets/category/event.png')} style={{width: 18, height: 18, tintColor: '#8EB3EE'}}/>
                                    </View>
                                    <Text>경조사/선물</Text>
                                </View>
                                <EditInputBudget num={event} setBudget={setEvent}/>
                            </View>
                            <View style={styles.category}>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={styles.logoContainer}>
                                        <Icon name={'ellipsis-horizontal-outline'} size={20} color={'#8EB3EE'}/>
                                    </View>
                                    <Text>기타</Text>
                                </View>
                                <EditInputBudget num={ect} setBudget={setEct}/>
                            </View>
                        </View>
                    </KeyboardAvoidingView>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSaveButton}
                        >
                            <Text>수정</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text>취소</Text>
                        </TouchableOpacity> 
                    </View>
            
                </ScrollView>
            </Modal>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
                <Icon name={'create-outline'} size={25}/>
            </TouchableOpacity>  

        </View> 
    )
    }else{
        return(
            <View >
                <Text>로딩중..</Text>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    monthText: {
        fontSize: 23, 
        fontWeight:'bold', 
        marginLeft: 15, 
        marginTop: 15,
        color: 'black',
    },
    bodySize: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 10,
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
    container: {
        paddingBottom: 10,
        borderBottomColor: '#F2F2F2',
        borderBottomWidth: 5,
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
    buttonContainer: {
        marginTop: 20, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: "center",
    },
    button: {
        backgroundColor: '#6090FA',
        color: 'black',
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10
    },

});

export default EditBudgetScreen;