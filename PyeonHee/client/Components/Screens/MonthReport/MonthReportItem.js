import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, Modal, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import CabinetReportWithLast from './CabinetReportWithLast';
import CabinetReportWithPlan from './CabinetReportWithPlan';

import config from '../../../config';

const url = config.url;
const MonthReportItem = (props) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

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
    
    const date = new Date(props.year, props.month, 0).getDate();
    const progressPercentage = parseInt(props.daily_count)/date*100;

    const handlePress = () => {
        console.log('/monthReport/Cabinet/WithPlan', props.month);
        fetch(`${url}/monthReport/Cabinet/WithPlan`, {
            method: 'POST',
            body: JSON.stringify({
              userID: props.userID,
              month: props.month,
              year: props.year,
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson);

            if(responseJson.length != ''){
                setPlanRent(responseJson.planRent);
                setPlanInsurance(responseJson.planInsurance);
                setPlanCommunication(responseJson.planCommunication);
                setPlanSubscribe(responseJson.planSubscribe);

                setPlanTraffic(responseJson.planTraffic);
                setPlanHobby(responseJson.planHobby);
                setPlanShopping(responseJson.planShopping);
                setPlanEducation(responseJson.planEducation);
                setPlanMedical(responseJson.planMedical);
                setPlanEvent(responseJson.planEvent);
                setPlanEct(responseJson.planEct);
                setPlanDinner(responseJson.planDinner);
                setPlanSaving(responseJson.planSavings);

                setRealRent(responseJson.realRent);
                setRealInsurance(responseJson.realInsurance);
                setRealCommunication(responseJson.realCommunication);
                setRealSubscribe(responseJson.realSubscribe);

                setRealTraffic(responseJson.realTraffic);
                setRealHobby(responseJson.realHobby);
                setRealShopping(responseJson.realShopping);
                setRealEducation(responseJson.realEducation);
                setRealMedical(responseJson.realMedical);
                setRealEvent(responseJson.realEvent);
                setRealDinner(responseJson.realDinner);
                setRealSaving(responseJson.realSavings);
                setRealEct(responseJson.realEct);
            }
        })
        .then(()=> {
            let prevMonth = props.month - 1;
            let prevYear = props.year;
            if(prevMonth === 0) {
                prevMonth = 12;
                prevYear = prevYear - 1;
            }
            console.log('/monthReport/Cabinet/WithLastMonth',  prevMonth);
            fetch(`${url}/monthReport/Cabinet/WithLastMonth`, {
                method: 'POST',
                body: JSON.stringify({
                  userID: props.userID,
                  month: prevMonth,
                  year: prevYear,
                }),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type':'application/json',
                },
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log(responseJson);

                if(responseJson.length > 0){
                    setLastRent(responseJson.monthly_rent);
                    setLastInsurance(responseJson.insurance_expense);
                    setLastCommunication(responseJson.communication_expense);
                    setLastSubscribe(responseJson.subscribe_expense);

                    setLastTraffic(responseJson.transportation_expense);
                    setLastHobby(responseJson.leisure_expense);
                    setLastShopping(responseJson.shopping_expense);
                    setLastEducation(responseJson.education_expense);
                    setLastMedical(responseJson.medical_expense);
                    setLastEvent(responseJson.event_expense);
                    setLastEct(responseJson.etc_expense);

                    setLastDinner(responseJson.live_expense);
                    setLastSaving(responseJson.user_savings);

                }
            })
            .then(()=>{
                // setLoading(true);
                setModalVisible(true);
            })

            setLoading(true);

        })
        .catch((e)=>{
            console.error(e);
        })

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
                        <View style={styles.topDiv}>
                            <View style={styles.mbtiDiv}>
                                <View style={styles.mbtiInnerContainer}>
                                    <Text style={styles.mbtiText}>{props.userMbti}</Text>
                                </View>
                            </View>
                            <Text style={styles.topInfoText}>수입: {props.userIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            <Text style={styles.topInfoText}>이행률: {Math.floor(progressPercentage)}%</Text>
                        </View>
                        {loading === true ? 
                            <View>
                                {selectedIndex === 0 && 
                                    <CabinetReportWithLast month={props.month} prevMonth={(props.month - 1)} lastSaving={lastSaving} lastRent={lastRent}
                                        lastInsurance={lastInsurance}  lastCommunication={lastCommunication} lastSubscribe={lastSubscribe} lastDinner={lastDinner}
                                        lastTraffic={lastTraffic} lastHobby={lastHobby} lastShopping={lastShopping} lastEducation={lastEducation} lastMedical={lastMedical}
                                        lastEvent={lastEvent} lastEct={lastEct}
                                        rent={realRent} insurance={realInsurance} communication={realCommunication} subscribe={realSubscribe} dinner={realDinner} traffic={realTraffic} 
                                        hobby={realHobby} shopping={realShopping} education={realEducation} medical={realMedical} event={realEvent} ect={realEct} saving={realSaving}
                                    />
                                }
                                {selectedIndex === 1 && 
                                    <CabinetReportWithPlan planSaving={planSaving} planRent={planRent} planInsurance={planInsurance}  planCommunication={planCommunication} 
                                        planSubscribe={planSubscribe} planDinner={planDinner} planTraffic={planTraffic} planHobby={planHobby} planShopping={planShopping} 
                                        planEducation={planEducation} planMedical={planMedical} planEvent={planEvent} planEct={planEct}
                                        rent={realRent} insurance={realInsurance} communication={realCommunication} subscribe={realSubscribe} dinner={realDinner} traffic={realTraffic} 
                                        hobby={realHobby} shopping={realShopping} education={realEducation} medical={realMedical} event={realEvent} ect={realEct} saving={realSaving}
                                    />
                                }
                            </View> :
                            <View style={{alignItems: 'center', justifyContent: 'center'}}><Text>...</Text></View>
                            
                        }
                    </View>
                </View>

            </Modal>

            <TouchableOpacity
                style={styles.container}
                onPress={handlePress}
            >
                <View style={styles.itemContainer}>
                    <View style={styles.monthDiv}>
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
                        <Text style={{fontSize: 10,}}>이행률</Text>
                        <Text>{Math.floor(progressPercentage)}%</Text>
                    </View>

                    <View>
                        <Icon name={'chevron-forward-outline'} size={20} color={'#203864'}/>
                    </View>

                </View>
            </TouchableOpacity>
        </View>
    )
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
    topDiv: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 5,
        borderTopColor: '#F0F4FA',          
        padding: 10,
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
        marginTop : 30
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
        // backgroundColor: '#F0F4FA',
        backgroundColor: 'white',
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
    topInfoText: {
        fontSize: 15, 
        fontWeight: 'bold', 
        color: '#203864',
        marginLeft: 20,

    }
});

export default MonthReportItem;