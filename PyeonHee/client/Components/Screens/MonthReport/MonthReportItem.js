import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, Modal, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import CabinetReportWithLast from './CabinetReportWithLast';

import config from '../../../config';

const url = config.url;
const MonthReportItem = (props) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    {/* 실제 고정지출 */}
    const [realRent, setRealRent] = useState(0);
    const [realInsurance, setRealInsurance] = useState(0);
    const [realCommunication, setRealCommunication] = useState(0);
    const [realSubscribe, setRealSubscribe] = useState(0);
    {/* 실제 계획지출 */}
    const [realTraffic, setRealTraffic] = useState(0);
    const [realHobby, setRealHobby] = useState(0);
    const [realShopping, setRealShopping] = useState(0);
    const [realEducation, setRealEducation] = useState(0);
    const [realMedical, setRealMedical] = useState(0);
    const [realEvent, setRealEvent] = useState(0);
    const [realEct, setRealEct] = useState(0);

    const [realDinner, setRealDinner] = useState(0);    //실제 식비
    const [realSaving, setRealSaving] = useState(0);    //실제 저금금액

    {/* 계획 고정지출 */}
    const [planRent, setPlanRent] = useState(0);
    const [planInsurance, setPlanInsurance] = useState(0);
    const [planCommunication, setPlanCommunication] = useState(0);
    const [planSubscribe, setPlanSubscribe] = useState(0);
    {/* 계획 고정지출 */}
    const [planTraffic, setPlanTraffic] = useState(0);
    const [planHobby, setPlanHobby] = useState(0);
    const [planShopping, setPlanShopping] = useState(0);
    const [planEducation, setPlanEducation] = useState(0);
    const [planMedical, setPlanMedical] = useState(0);
    const [planEvent, setPlanEvent] = useState(0);
    const [planEct, setPlanEct] = useState(0);

    const [planDinner, setPlanDinner] = useState(0);    //계획 식비
    const [planSaving, setPlanSaving] = useState(0);    //계획 저금금액

    {/* 지난달 실제 고정지출 */}
    const [lastRent, setLastRent] = useState(0);
    const [lastInsurance, setLastInsurance] = useState(0);
    const [lastCommunication, setLastCommunication] = useState(0);
    const [lastSubscribe, setLastSubscribe] = useState(0);
    {/* 지난달 실제 고정지출 */}
    const [lastTraffic, setLastTraffic] = useState(0);
    const [lastHobby, setLastHobby] = useState(0);
    const [lastShopping, setLastShopping] = useState(0);
    const [lastEducation, setLastEducation] = useState(0);
    const [lastMedical, setLastMedical] = useState(0);
    const [lastEvent, setLastEvent] = useState(0);
    const [lastEct, setLastEct] = useState(0);

    const [lastDinner, setLastDinner] = useState(0);    //계획 식비
    const [lastSaving, setLastSaving] = useState(0);    //계획 저금금액
    
    const handleSingleIndexSelect = (index) => {
        setSelectedIndex(index);
    };

    const handlePress = () => {
        // fetch(`${url}/monthReport/Cabinet/WithPlan`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //       userID: props.userID,
        //       month: props.month,
        //     //   year: props.year,
        //     }),
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type':'application/json',
        //     },
        // })
        // .then((response)=>response.json())
        // .then((responseJson)=>{
        //     console.log(responseJson);

        //     if(responseJson.real.length != 0 && responseJson.plan.length != 0){
        //         responseJson.real.map(item  => {
        //             if(item.tran_type === '월세'){
        //                 setRealRent(parseInt(item.daily_amount));
        //             }else if(item.tran_type === '보험'){
        //                 setRealInsurance(parseInt(item.daily_amount));
        //             }else if(item.tran_type === '통신'){
        //                 setRealCommunication(parseInt(item.daily_amount));
        //             }else if(item.tran_type === '구독'){
        //                 setRealSubscribe(parseInt(item.daily_amount));
        //             }else if(item.tran_type === '교통'){
        //                 setRealTraffic(parseInt(item.daily_amount));
        //             }else if(item.tran_type === '여가'){
        //                 setRealHobby(parseInt(item.daily_amount));
        //             }else if(item.tran_type === '쇼핑'){
        //                 setRealShopping(parseInt(item.daily_amount));
        //             }else if(item.tran_type === '교육'){
        //                 setRealEducation(parseInt(item.daily_amount));
        //             }else if(item.tran_type === '의료'){
        //                 setRealMedical(parseInt(item.daily_amount));
        //             }else if(item.tran_type === '선물'){
        //                 setRealEvent(parseInt(item.daily_amount));
        //             }else if(item.tran_type === '식비'){
        //                 setRealDinner(parseInt(item.daily_amount));
        //             }else if(item.tran_type === '저금'){
        //                 setRealSaving(parseInt(item.daily_amount));
        //             }else{
        //                 setRealEct(parseInt(item.daily_amount));
        //             }
        //         })

        //         if(responseJson.plan.length !=0){
        //             setPlanRent(responseJson.plan.monthly_rent);
        //             setPlanInsurance(responseJson.plan.insurance_expense);
        //             setPlanCommunication(responseJson.plan.communication_expense);
        //             setPlanSubscribe(responseJson.plan.subscribe_expense);

        //             setPlanTraffic(responseJson.plan.transportation_expense);
        //             setPlanHobby(responseJson.plan.leisure_expense);
        //             setPlanShopping(responseJson.plan.shopping_expense);
        //             setPlanEducation(responseJson.plan.education_expense);
        //             setPlanMedical(responseJson.plan.medical_expense);
        //             setPlanEvent(responseJson.plan.event_expense);
        //             setPlanEct(responseJson.plan.etc_expense);
        //             setPlanDinner(responseJson.live_expense);
        //             setPlanSaving(responseJson.plan.user_savings);

        //             // daily_count=responseJson.plan.last_count;
        //         }
        //     }
        // })
        // .then(()=> {
        //     let prevMonth = props.month - 1;
        //     // let prevYear = props.year;
        //     if(prevMonth === 0) {
        //         prevMonth = 12;
        //         // prevYear = prevYear - 1;
        //     }
        //     fetch(`${url}/monthReport/Cabinet/WithLastMonth`, {
        //         method: 'POST',
        //         body: JSON.stringify({
        //           userID: props.userID,
        //           month: prevMonth,
        //         //   year: prevYear,
        //         }),
        //         headers: {
        //           'Accept': 'application/json',
        //           'Content-Type':'application/json',
        //         },
        //     })
        //     .then((response)=>response.json())
        //     .then((responseJson)=>{
        //         console.log(responseJson);

        //         if(responseJson.length !=0){
        //             setLastRent(responseJson.monthly_rent);
        //             setLastInsurance(responseJson.insurance_expense);
        //             setLastCommunication(responseJson.communication_expense);
        //             setLastSubscribe(responseJson.subscribe_expense);

        //             setLastTraffic(responseJson.transportation_expense);
        //             setLastHobby(responseJson.leisure_expense);
        //             setLastShopping(responseJson.shopping_expense);
        //             setLastEducation(responseJson.education_expense);
        //             setLastMedical(responseJson.medical_expense);
        //             setLastEvent(responseJson.event_expense);
        //             setLastEct(responseJson.etc_expense);

        //             setLastDinner(responseJson.live_expense);
        //             setLastSaving(responseJson.user_savings);

        //             // daily_count=responseJson.plan.last_count;
        //         }
        //     })

        // })
        // .catch((e)=>{
        //     console.error(e);
        // })



        setModalVisible(true);

    }

    return (
        <View style={styles.appSize}>
            <Modal
                animationType = {"slide"}
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.appTopBar}>
                    <TouchableOpacity
                        // style={styles.closeButton}
                        onPress={() => {setModalVisible(!modalVisible)}}
                    >
                        <Icon name={'arrow-back-outline'} size={23} color={'#203864'}/>
                    </TouchableOpacity>
                    <Text style={styles.appTopBarText}>{props.month}월 소비 분석 리포트</Text>
                
                </View>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                    <View style={styles.tapContainer}>
                        <SegmentedControlTab
                            values={['지난달 소비 내역과 비교', '예산 계획서와 비교']}
                            selectedIndex={selectedIndex}
                            onTabPress={handleSingleIndexSelect}
                            tabStyle={styles.tabStyle}
                            tabTextStyle={{color: '#595959', }}
                            activeTabStyle={styles.activeTabStyle}
                            borderRadius={20}
                        />
                    </View>
                    {/* <View style={styles.contentContainer}> */}

                    

                        {selectedIndex === 0 && 
                            // <CabinetReportWithLast month={props.month} prevMonth={props.month - 1} />
                            <Text>지난달과 비교할게요.</Text>
                            // <ReportWithLastScreen navigation={navigation} route={route} 
                            // month={month} preMonth={preMonth} withLast={route.params.withLast}/>
                        }
                        {selectedIndex === 1 && 
                            <Text>계획과 비교할게요.</Text>
                            // <ReportWithPlanScreen navigation={navigation} route={route} 
                            // month={month} withPlan={route.params.withPlan} daily_count={route.params.daily_count} date={date}/>
                        }
                    {/* </View> */}
                    </View>
                </View>

            </Modal>

            <TouchableOpacity
                style={styles.container}
                // onPress={props.navigation.navigate('monthReportDetail', {monthReportID: props.monthReportID})}
                // onPress={() => console.log(props.monthReportID)}
                onPress={handlePress}
            >
                <View style={styles.itemContainer}>
                    <View style={styles.monthDiv}>
                        {/* <View style={styles.logoContainer}>
                            <Image source={require('../assets/budget.png')} style={styles.iconDiv}/>
                        </View> */}
                        <View style={{flexDirection: 'row', alignItems: 'flex-end', marginLeft: 10,}}>
                            <Text style={styles.monthText}>{props.month}</Text>
                            <Text style={{fontSize: 12}}>월</Text>
                        </View>
                        
                    </View>

                    <View style={styles.mbtiDiv}>
                        <View style={styles.mbtiInnerContainer}>
                            <Text style={styles.mbtiText}>{props.userMbti}</Text>
                        </View>
                    </View>

                    <View style={styles.infoDiv}>
                        <Text>수입: {props.userIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text>저금: {props.totalSavings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    </View>

                    <View style={styles.percentageDiv}>
                        <Text>{props.rate}%</Text>
                    </View>

                    <View>
                        <Icon name={'chevron-forward-outline'} size={20} color={'#203864'}/>
                    </View>

                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    appSize: {
        flex: 1,
    },
    tapContainer: {
        alignItems:'flex-start',
        backgroundColor: 'white',
        padding: 3,
        borderRadius: 15,
    },
    tabStyle: {
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    activeTabStyle: {
        backgroundColor: '#203864',
        borderRadius: 20,
    },
    container: {
      flex: 1,
      backgroundColor: 'white',
      margin: 5,
      paddingHorizontal: 10,
      borderRadius: 7,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 50,
    },
    appTopBar: {
        height: 50,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    }, 
    appTopBarText: {
        fontSize: 18,
        marginLeft: 10
    },
    contentContainer:{
        // flex: 1,
        margin: 3,
        padding: 5, 
        backgroundColor: 'yellow',
    },
    monthDiv: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 5,
    },
    monthText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoDiv: {
        alignItems: 'center',
    },
    percentageDiv: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mbtiDiv: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    mbtiInnerContainer: {
        padding: 3,
        borderRadius: 5,
        width: 50,
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    mbtiText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
    centeredView: {
        flex: 1,
    },
    modalView: {
        flex: 1,
        margin: 5,
        backgroundColor: '#F0F4FA',
        borderRadius: 5,
        paddingHorizontal: 5,
    },
    openButton: {
        width: 100,
        alignItems: 'center',
        padding: 10,
    },
    closeButton: {
        width: 100,
        alignItems: 'center',
        padding: 10,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'black'
    },
    logoContainer: {
        padding: 6,
        borderRadius: 20,
        marginRight: 10, 
        backgroundColor: '#8EB3EE',
    },
    iconDiv: {
        width: 20,
        height: 20,
        tintColor: 'white'
    },
});

export default MonthReportItem;