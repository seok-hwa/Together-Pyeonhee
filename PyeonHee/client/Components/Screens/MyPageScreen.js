import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Popup} from 'react-native-popup-confirm-toast'
import Icon from 'react-native-vector-icons/Ionicons';
import { loadUserInfoApi, getMyInfo, removeDeviceToken, reportWithLast, reportWithPlan } from '../api';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal, 
    DeviceEventEmitter,
} from 'react-native';

const MyPageScreen = ({navigation, route}) => {
    //useState for test
    const [userID, setUserID] = useState('');
    const [userName, setUserName] = useState('');
    const [userTier, setUserTier] = useState('');
    const [userStamp, setUserStamp] = useState(0);
    const [userPoint, setUserPoint] = useState(0);
    const [userMbti, setUserMbti] = useState('');
    const [userMbtiDescription, setUserMbtiDescription] = useState('');

    const [tierModalVisible, setTierModalVisible] = useState(false);
    const [mbtiModalVisible, setMbtiModalVisible] = useState(false);
    const [stampointModalVisible, setStampointModalVisible] = useState(false);

    const [loading, setLoading] = useState(true);

    const fetchMyInfo = (userID) => {
        getMyInfo(userID)
        .then((responseJson)=>{
            console.log('마이페이지 response data');
            console.log(responseJson);

            setUserName(responseJson.userName);
            setUserTier(responseJson.userTier);
            setUserStamp(responseJson.userStamp);
            setUserPoint(responseJson.userPoint);
            setUserMbti(responseJson.userMbti);
            setUserMbtiDescription(responseJson.description);
        })
        .then(()=>{
            setLoading(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    };

    useEffect(()=>{
        DeviceEventEmitter.addListener('MonthReport', () => {
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
                fetchMyInfo(tempID);
            })
            .catch((error)=>{
                console.log(error);
            })
        })
        console.log('마이페이지 렌더링');
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
            fetchMyInfo(tempID);
        })
        .catch((error)=>{
            console.log(error);
        })
        return () => {
            DeviceEventEmitter.removeAllListeners();
        }
    }, [route]);
    
    function TierImage(){
        if(userTier === 'BRONZE'){
            return(
                <Image source={require('./assets/tier/Bronze_single.png')} style={styles.tierDesign}/>
            )
        }else if(userTier === 'SILVER'){
            return(
                <Image source={require('./assets/tier/Silver_single.png')} style={styles.tierDesign}/>
            )
        }else if(userTier === 'GOLD'){
            return(
                <Image source={require('./assets/tier/Gold_single.png')} style={styles.tierDesign}/>
            )
        }else if(userTier === 'PLATINUM'){
            return(
                <Image source={require('./assets/tier/Platinum_single.png')} style={styles.tierDesign}/>
            )
        }else if(userTier === 'DIAMOND'){
            return(
                <Image source={require('./assets/tier/Diamond_single.png')} style={styles.tierDesign}/>
            )
        }else{
            return(
                <View style={styles.tierDesign} />
            )
        }
    }
    const logout = () => {
        Popup.show({
          type: 'confirm',
          title: '로그아웃',
          textBody: '로그아웃 하시겠습니까?',
          buttonText: 'yes',
          confirmText: 'no',
          okButtonStyle: {backgroundColor: '#0000CD'},
          iconEnabled: false,
          callback: () => {
            Popup.hide()
            AsyncStorage.removeItem('userID')
            .then(()=>{
                //디바이스 토큰 삭제
                removeDeviceToken(userID)
                .then((responseJson)=>{
                    console.log(responseJson);
                    if(responseJson.status === 'success'){
                        console.log('디바이스 토큰 삭제');
                    }
                    else{
                        console.log('디바이스 토큰 삭제 실패');
                    }
                })
            })
            .then(()=>{
                navigation.reset({routes: [{name: 'Login'}]})
            })
          }
        })
      }
    const toMonthReport = () => {
        let currentRent=0;
        let currentInsurance=0;
        let currentCommunication=0;
        let currentSubscribe=0;
        let currentTraffic=0;
        let currentMedical=0;
        let currentEducation=0;
        let currentEct=0;
        let currentShopping=0;
        let currentHobby=0;
        let currentEvent=0;
        let currentDinner=0;
        let currentSaving=0;

        let lastRent=0;
        let lastInsurance=0;
        let lastCommunication=0;
        let lastSubscribe=0;
        let lastTraffic=0;
        let lastMedical=0;
        let lastEducation=0;
        let lastEct=0;
        let lastShopping=0;
        let lastHobby=0;
        let lastEvent=0;
        let lastDinner=0;
        let lastSaving=0;

        let realRent=0;
        let realInsurance=0;
        let realCommunication=0;
        let realSubscribe=0;
        let realTraffic=0;
        let realMedical=0;
        let realEducation=0;
        let realEct=0;
        let realShopping=0;
        let realHobby=0;
        let realEvent=0;
        let realDinner=0;
        let realSaving=0;

        let planRent=0;
        let planInsurance=0;
        let planCommunication=0;
        let planSubscribe=0;
        let planTraffic=0;
        let planMedical=0;
        let planEducation=0;
        let planEct=0;
        let planShopping=0;
        let planHobby=0;
        let planEvent=0;
        let planDinner=0;
        let planSaving=0;

        let daily_count=0;

        let isTransactionList = true;
        let isPlan = true;

        reportWithLast(userID)
        .then((responseJson)=>{
            console.log(responseJson);
            if(responseJson.length != 0){
                responseJson.real_spend.map(item  => {
                    if(item.tran_type === '쇼핑'){
                        currentShopping+=parseInt(item.daily_amount);
                    }else if(item.tran_type === '교통'){
                        currentTraffic+=parseInt(item.daily_amount);
                    }else if(item.tran_type === '구독'){
                        currentSubscribe+=parseInt(item.daily_amount);
                    }else if(item.tran_type === '통신'){
                        currentCommunication+=parseInt(item.daily_amount);
                    }else if(item.tran_type === '여가' || item.tran_type === '취미'){
                        currentHobby+=parseInt(item.daily_amount);
                    }else if(item.tran_type === '교육'){
                        currentEducation+=parseInt(item.daily_amount);
                    }else if(item.tran_type === '선물'){
                        currentEvent+=parseInt(item.daily_amount);
                    }else if(item.tran_type === '보험'){
                        currentInsurance+=parseInt(item.daily_amount);
                    }else if(item.tran_type === '의료'){
                        currentMedical+=parseInt(item.daily_amount);
                    }else if(item.tran_type === '월세'){
                        currentRent+=parseInt(item.daily_amount);
                    }else if(item.tran_type === '식비'){
                        currentDinner+=parseInt(item.daily_amount);
                    }else if(item.tran_type === '저금'){
                        currentSaving+=parseInt(item.daily_amount);
                    }else if(item.tran_type === '송금'){
                    }else{
                        currentEct+=parseInt(item.daily_amount);
                    }
                })

                if(responseJson.last_spend.length !=0){
                    responseJson.last_spend.map(item  => {
                        if(item.tran_type === '쇼핑'){
                            lastShopping+=parseInt(item.daily_amount);
                        }else if(item.tran_type === '교통'){
                            lastTraffic+=parseInt(item.daily_amount);
                        }else if(item.tran_type === '구독'){
                            lastSubscribe+=parseInt(item.daily_amount);
                        }else if(item.tran_type === '통신'){
                            lastCommunication+=parseInt(item.daily_amount);
                        }else if(item.tran_type === '여가' || item.tran_type === '취미'){
                            lastHobby+=parseInt(item.daily_amount);
                        }else if(item.tran_type === '교육'){
                            lastEducation+=parseInt(item.daily_amount);
                        }else if(item.tran_type === '선물'){
                            lastEvent+=parseInt(item.daily_amount);
                        }else if(item.tran_type === '보험'){
                            lastInsurance+=parseInt(item.daily_amount);
                        }else if(item.tran_type === '의료'){
                            lastMedical+=parseInt(item.daily_amount);
                        }else if(item.tran_type === '월세'){
                            lastRent+=parseInt(item.daily_amount);
                        }else if(item.tran_type === '식비'){
                            lastDinner+=parseInt(item.daily_amount);
                        }else if(item.tran_type === '저금'){
                            lastSaving+=parseInt(item.daily_amount);
                        }else if(item.tran_type === '송금'){
                        }else{
                            lastEct+=parseInt(item.daily_amount);
                        }
                    })
                }
            }else{
                isTransactionList = false;
            }
        })
        .then(()=>{
            if(isTransactionList === true){
                reportWithPlan(userID)
                .then((responseJson)=>{
                    if(responseJson.plan.length != 0){
                        responseJson.real.map(item  => {
                            if(item.tran_type === '쇼핑'){
                                realShopping+=parseInt(item.daily_amount);
                            }else if(item.tran_type === '교통'){
                                realTraffic+=parseInt(item.daily_amount);
                            }else if(item.tran_type === '구독'){
                                realSubscribe+=parseInt(item.daily_amount);
                            }else if(item.tran_type === '통신'){
                                realCommunication+=parseInt(item.daily_amount);
                            }else if(item.tran_type === '여가'){
                                realHobby+=parseInt(item.daily_amount);
                            }else if(item.tran_type === '교육'){
                                realEducation+=parseInt(item.daily_amount);
                            }else if(item.tran_type === '선물'){
                                realEvent+=parseInt(item.daily_amount);
                            }else if(item.tran_type === '보험'){
                                realInsurance+=parseInt(item.daily_amount);
                            }else if(item.tran_type === '의료'){
                                realMedical+=parseInt(item.daily_amount);
                            }else if(item.tran_type === '월세'){
                                realRent+=parseInt(item.daily_amount);
                            }else if(item.tran_type === '식비'){
                                realDinner+=parseInt(item.daily_amount);
                            }else if(item.tran_type === '저금'){
                                realSaving+=parseInt(item.daily_amount);
                            }else if(item.tran_type === '송금'){
                            }else{
                                realEct+=parseInt(item.daily_amount);
                            }
                        })

                        planRent=responseJson.plan.monthly_rent;
                        planInsurance=responseJson.plan.insurance_expense;
                        planCommunication=responseJson.plan.communication_expense;
                        planSubscribe=responseJson.plan.subscribe_expense;
                        planTraffic=responseJson.plan.transportation_expense;
                        planMedical=responseJson.plan.medical_expense;
                        planEducation=responseJson.plan.education_expense;
                        planEct=responseJson.plan.etc_expense;
                        planShopping=responseJson.plan.shopping_expense;
                        planHobby=responseJson.plan.leisure_expense;
                        planEvent=responseJson.plan.event_expense;
                        planDinner=responseJson.live_expense;
                        planSaving=responseJson.plan.user_savings;
                        daily_count=responseJson.plan.last_count;
                    }else{
                        isPlan = false;
                    }
                })
                .then(()=>{
                    navigation.navigate('MonthReport', {
                        withLast: {
                            currentRent: currentRent,
                            currentInsurance: currentInsurance,
                            currentCommunication:currentCommunication,
                            currentSubscribe:currentSubscribe,
                            currentTraffic:currentTraffic,
                            currentMedical:currentMedical,
                            currentEducation:currentEducation,
                            currentEct:currentEct,
                            currentShopping:currentShopping,
                            currentHobby:currentHobby,
                            currentEvent:currentEvent,
                            currentDinner:currentDinner,
                            currentSaving:currentSaving,
        
                            lastRent:lastRent,
                            lastInsurance:lastInsurance,
                            lastCommunication:lastCommunication,
                            lastSubscribe:lastSubscribe,
                            lastTraffic:lastTraffic,
                            lastMedical:lastMedical,
                            lastEducation:lastEducation,
                            lastEct:lastEct,
                            lastShopping:lastShopping,
                            lastHobby:lastHobby,
                            lastEvent:lastEvent,
                            lastDinner:lastDinner,
                            lastSaving:lastSaving,
                        },
                        withPlan:{
                            realRent: realRent,
                            realInsurance: realInsurance,
                            realCommunication:realCommunication,
                            realSubscribe:realSubscribe,
                            realTraffic:realTraffic,
                            realMedical:realMedical,
                            realEducation:realEducation,
                            realEct:realEct,
                            realShopping:realShopping,
                            realHobby:realHobby,
                            realEvent:realEvent,
                            realDinner:realDinner,
                            realSaving:realSaving,
        
                            planRent:planRent,
                            planInsurance:planInsurance,
                            planCommunication:planCommunication,
                            planSubscribe:planSubscribe,
                            planTraffic:planTraffic,
                            planMedical:planMedical,
                            planEducation:planEducation,
                            planEct:planEct,
                            planShopping:planShopping,
                            planHobby:planHobby,
                            planEvent:planEvent,
                            planDinner:planDinner,
                            planSaving:planSaving,
                        },
                        isTransactionList: isTransactionList,
                        isPlan: isPlan,
                        userCurrentMbti: userMbti,
                        userName: userName,
                        daily_count: daily_count,
                        }
                    )
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
            else{
                navigation.navigate('MonthReport', {
                    withLast: {
                        currentRent: currentRent,
                        currentInsurance: currentInsurance,
                        currentCommunication:currentCommunication,
                        currentSubscribe:currentSubscribe,
                        currentTraffic:currentTraffic,
                        currentMedical:currentMedical,
                        currentEducation:currentEducation,
                        currentEct:currentEct,
                        currentShopping:currentShopping,
                        currentHobby:currentHobby,
                        currentEvent:currentEvent,
                        currentDinner:currentDinner,
                        currentSaving:currentSaving,
    
                        lastRent:lastRent,
                        lastInsurance:lastInsurance,
                        lastCommunication:lastCommunication,
                        lastSubscribe:lastSubscribe,
                        lastTraffic:lastTraffic,
                        lastMedical:lastMedical,
                        lastEducation:lastEducation,
                        lastEct:lastEct,
                        lastShopping:lastShopping,
                        lastHobby:lastHobby,
                        lastEvent:lastEvent,
                        lastDinner:lastDinner,
                        lastSaving:lastSaving,
                    },
                    withPlan:{
                        realRent: realRent,
                        realInsurance: realInsurance,
                        realCommunication:realCommunication,
                        realSubscribe:realSubscribe,
                        realTraffic:realTraffic,
                        realMedical:realMedical,
                        realEducation:realEducation,
                        realEct:realEct,
                        realShopping:realShopping,
                        realHobby:realHobby,
                        realEvent:realEvent,
                        realDinner:realDinner,
                        realSaving:realSaving,
    
                        planRent:planRent,
                        planInsurance:planInsurance,
                        planCommunication:planCommunication,
                        planSubscribe:planSubscribe,
                        planTraffic:planTraffic,
                        planMedical:planMedical,
                        planEducation:planEducation,
                        planEct:planEct,
                        planShopping:planShopping,
                        planHobby:planHobby,
                        planEvent:planEvent,
                        planDinner:planDinner,
                        planSaving:planSaving,
                    },
                    isTransactionList: isTransactionList,
                    isPlan: isPlan,
                    userCurrentMbti: userMbti,
                    userName: userName,
                    daily_count: daily_count,
                    }
                )
            }
        })
    }
    const toUserInfo = () =>{
        let userAge;
        let userJob;

        loadUserInfoApi(userID)
        .then((responseJson)=>{
            console.log(responseJson);
            userAge = responseJson.userAge;
            userJob = responseJson.userJob;
        })
        .then(()=>{
            navigation.navigate('UpdateInfoScreen', {
                userID: userID, 
                userName: userName,
                userAge: userAge,
                userJob: userJob,
            })
        })
    }
    if(loading === true){
        return(
            <ScrollView style={styles.appSize}>
                <Modal
                    animationType="fade"
                    transparent={true} // 배경 투명 하게 
                    visible={tierModalVisible}

                    onRequestClose={() => {
                        setTierModalVisible(false);
                }}>
                    <View style={styles.modalSize}>
                        <View style={styles.modalTierBodySize}>
                            <View style={styles.exDiv}>
                                <TouchableOpacity onPress={()=>{setTierModalVisible(false)}}>
                                    <Icon name="close-outline" size={25}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalTopBar}>
                                <Text>티어 정책</Text>
                            </View>
                            <View style={styles.modalContent}>
                                <View style={userTier === 'DIAMOND' ?  styles.myTierRow: styles.tierRow}>
                                    <Image source={require('./assets/tier/Diamond_single.png')} style={styles.modalTierDesign}/>
                                    <Text style={styles.tierText2}>Diamond</Text>
                                    <Text style={styles.tierDescription}>스탬프 40개 이상</Text>
                                </View>
                                <View style={userTier === 'PLATINUM' ?  styles.myTierRow: styles.tierRow}>
                                    <Image source={require('./assets/tier/Platinum_single.png')} style={styles.modalTierDesign}/>
                                    <Text style={styles.tierText2}>Platinum</Text>
                                    <Text style={styles.tierDescription}>스탬프 30개 이상</Text>
                                </View>

                                <View style={userTier === 'GOLD' ?  styles.myTierRow: styles.tierRow}>
                                    <Image source={require('./assets/tier/Gold_single.png')} style={styles.modalTierDesign}/>
                                    <Text style={styles.tierText2}>Gold</Text>
                                    <Text style={styles.tierDescription}>스탬프 20개 이상</Text>
                                </View>

                                <View style={userTier === 'SILVER' ?  styles.myTierRow: styles.tierRow}>
                                    <Image source={require('./assets/tier/Silver_single.png')} style={styles.modalTierDesign}/>
                                    <Text style={styles.tierText2}>Silver</Text>
                                    <Text style={styles.tierDescription}>스탬프 10개 이상</Text>
                                </View>
                                <View style={userTier === 'BRONZE' ?  styles.myTierRow: styles.tierRow}>
                                    <Image source={require('./assets/tier/Bronze_single.png')} style={styles.modalTierDesign}/>
                                    <Text style={styles.tierText2}>Bronze</Text>
                                    <Text style={styles.tierDescription}>스탬프 10개 미만</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true} // 배경 투명 하게 
                    visible={mbtiModalVisible}

                    onRequestClose={() => {
                        setMbtiModalVisible(false);
                }}>
                    <View style={styles.modalSize}>
                        <View style={styles.modalMbtiBodySize}>
                        <View style={styles.exDiv}>
                                <TouchableOpacity onPress={()=>{setMbtiModalVisible(false)}}>
                                    <Icon name="close-outline" size={25}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalTopBar}>
                                <Text>소비 성향</Text>
                            </View>
                            <View style={styles.modalContent}>
                            <View style={styles.resultDiv}>
                                <Text style={styles.nameHighlight}>{userName}</Text>
                                <Text>님의 소비 성향은 </Text>
                                <Text style={styles.mbtiHighlight}>{userMbti}</Text>
                                <Text>입니다.</Text>
                            </View>
                            <View style={styles.mbtiDescription}>
                                <Text>{userMbtiDescription}</Text>
                            </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true} // 배경 투명 하게 
                    visible={stampointModalVisible}

                    onRequestClose={() => {
                        setStampointModalVisible(false);
                }}>
                    <View style={styles.modalSize}>
                        <View style={styles.modalStampointBodySize}>
                            <View style={styles.exDiv}>
                                <TouchableOpacity onPress={()=>{setStampointModalVisible(false)}}>
                                    <Icon name="close-outline" size={25}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalTopBar}>
                                <Text>스탬프 및 포인트 정책</Text>
                            </View>
                            <View style={styles.modalContent}>
                                <Text style={styles.stampointHigh}>포인트</Text>
                                <Text>포인트는 티어별로 월마다 차등적으로 지급됩니다.</Text>
                                <View style={styles.pointPolicyDiv}>
                                    <View style={styles.pointRow}>
                                        <Text style={styles.colDiv}>DIAMOND:</Text>
                                        <Text>2500 point</Text>
                                    </View>
                                    <View style={styles.pointRow}>
                                        <Text style={styles.colDiv}>PLATINUM:</Text>
                                        <Text>2000 point</Text>
                                    </View>
                                    <View style={styles.pointRow}>
                                        <Text style={styles.colDiv}>GOLD:</Text>
                                        <Text>1500 point</Text>
                                    </View>
                                    <View style={styles.pointRow}>
                                        <Text style={styles.colDiv}>SILVER:</Text>
                                        <Text>1000 point</Text>
                                    </View>
                                    <View style={styles.pointRow}>
                                        <Text style={styles.colDiv}>DIAMOND:</Text>
                                        <Text>500 point</Text>
                                    </View>
                                </View>
                                <Text style={styles.stampointHigh}>스탬프</Text>
                                <Text>스탬프는 일일소비권장금액에 대한 이행률에 따라 월마다 차등적으로 지급됩니다.</Text>
                                <View style={styles.stampPolicyDiv}>
                                    <View style={styles.pointRow}>
                                        <Text>스탬프 </Text>
                                        <Text style={{fontWeight: 'bold',}}>4</Text>
                                        <Text>개 지급:  이행률 </Text>
                                        <Text style={{fontWeight: 'bold',}}>75%</Text>
                                        <Text>이상</Text>
                                    </View>
                                    <View style={styles.pointRow}>
                                        <Text>스탬프 </Text>
                                        <Text style={{fontWeight: 'bold',}}>3</Text>
                                        <Text>개 지급:  이행률 </Text>
                                        <Text style={{fontWeight: 'bold',}}>75%</Text>
                                        <Text>미만 </Text>
                                        <Text style={{fontWeight: 'bold',}}>50%</Text>
                                        <Text>이상</Text>
                                    </View>
                                    <View style={styles.pointRow}>
                                        <Text>스탬프 </Text>
                                        <Text style={{fontWeight: 'bold',}}>2</Text>
                                        <Text>개 지급:  이행률 </Text>
                                        <Text style={{fontWeight: 'bold',}}>50%</Text>
                                        <Text>미만 </Text>
                                        <Text style={{fontWeight: 'bold',}}>25%</Text>
                                        <Text>이상</Text>
                                    </View>
                                    <View style={styles.pointRow}>
                                        <Text>스탬프 </Text>
                                        <Text style={{fontWeight: 'bold',}}>1</Text>
                                        <Text>개 지급:  이행률 </Text>
                                        <Text style={{fontWeight: 'bold',}}>25%</Text>
                                        <Text>미만</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.appTopDiv}>
                    <View style={styles.titleDiv}>
                        <Text style={styles.NameStyle}>{userName}</Text>
                        <Text style={styles.NextToNameStyle}>님의 마이페이지</Text>
                    </View>
                    <View style={styles.TopInnerDiv}>
                        <View style={styles.innerTopLeft}>
                            <TouchableOpacity onPress={()=>{setTierModalVisible(true)}}>
                                <View style={styles.tierDiv}>
                                    <TierImage />
                                    <Text style={styles.tierText}>{userTier}</Text> 
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.innerTopRight}>
                            <View style={styles.stampPointDiv}>
                                    <TouchableOpacity onPress={()=>{setMbtiModalVisible(true)}} style={styles.mbtiDiv}>
                                        <View style={styles.mbtiDiv}>
                                            <Text>소비성향: </Text>
                                                <View style={styles.mbtiInnerContainer}>
                                                    <Text style={styles.mbtiText}>{userMbti}</Text>
                                                </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{setStampointModalVisible(true)}} style={styles.stampPointAddDiv}>
                                        <View style={styles.stampDiv}>
                                            <Image source={require('./assets/stamp.png')} style={styles.stampPointDesign}/>
                                            <Text style={styles.stampPointText}>스탬프</Text>
                                            <Text style={styles.stampPointOutput}>{userStamp}</Text>
                                            <Text> 개</Text>
                                        </View>
                                        <View style={styles.pointDiv}>
                                            <Image source={require('./assets/point.png')} style={styles.stampPointDesign}/>
                                            <Text style={styles.stampPointText}>포인트</Text>
                                            <Text style={styles.stampPointOutput}>{userPoint}</Text>
                                            <Text> P</Text>
                                        </View>
                                    </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.assetBudgetDiv}>
                    <Text style={styles.assetBudgetTitle}>예산</Text>
                    <TouchableOpacity onPress={toMonthReport}>
                        <Text style={styles.assetBudgetBoard} >한달 리포트 보기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        // onPress={()=>alert('한달리포트 보관함')}
                        onPress={() => navigation.navigate('MonthlyReportCabinet')}
                    >
                        <Text style={styles.assetBudgetBoard} >한달 리포트 보관함</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.pyeonheeDiv}>
                    <Text style={styles.assetBudgetTitle}>이용안내</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Manual')}>
                        <Text style={styles.assetBudgetBoard} >사용 설명서</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('ServiceCenter')}>
                        <Text style={styles.assetBudgetBoard} >고객센터</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('NoticeList')}>
                        <Text style={styles.assetBudgetBoard} >공지사항</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.ectDiv}>
                <Text style={styles.assetBudgetTitle}>기타</Text>
                    <TouchableOpacity onPress={toUserInfo}>
                        <Text style={styles.assetBudgetBoard} >개인 정보 수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={logout}>
                        <Text style={styles.assetBudgetBoard} >로그아웃</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
    else{
        return(
            <View style={styles.appSize}>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    appSize: {
        flex: 1,
        backgroundColor: '#F0F4FA',
    },
    appTopDiv: {
        height: 200,
    },
    TopInnerDiv: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 110,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    innerTopLeft: {
        flex: 1,
    },
    innerTopRight: {
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
        flexDirection: 'column',
    },
    stampPointDiv: {
        marginLeft: 10,
        flex: 1,
    },
    mbtiDiv: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    stampPointAddDiv:{
        flex: 2,
    },
    stampDiv: {
        padding: 5,
        flex: 1,
        flexDirection: 'row',
    },
    pointDiv: {
        padding: 5,
        flex: 1,
        flexDirection: 'row',
    },
    titleDiv: {
        marginTop: 20,
        marginLeft: 15,
        flexDirection: 'row',
    },
    tierDiv: {
        marginLeft: 20,
        marginTop: 20,
        flexDirection: 'row',
    },
    tierDesign: {
        width: 50,
        height: 50,
    },
    modalTierDesign: {
        width: 30,
        height: 30,
        marginRight: 5,
    },
    stampPointDesign: {
        width: 15,
        height: 15,
    },
    stampPointText: {
        marginLeft: 10,
    },
    tierText: {
        marginLeft: 10,
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    stampPointOutput: {
        width: 70,
        textAlign:'right',
    },
    NameStyle:{
        fontSize: 20,
        color: 'black',
    },
    NextToNameStyle: {
        marginTop: 7,
    },
    appBody: {
        borderWidth: 5,
        borderColor: '#DCDCDC',
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    assetBudgetDiv: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 130,
        backgroundColor: 'white',
    },
    assetBudgetTitle: {
        margin: 10,
        fontWeight: '900',
        fontSize: 15,
        color: 'black',
    },
    assetBudgetBoard: {
        fontSize: 15,
        margin: 10,
    },
    ectDiv: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 130,
        backgroundColor: 'white',
    },
    mbtiInnerContainer: {
        backgroundColor: 'pink',
        // justifyContent:'center',
        padding: 2,
        borderRadius: 3,
    },
    mbtiText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },

    modalSize: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.50)',
    },
    modalTierBodySize: {
        width: '75%',
        height: '40%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalMbtiBodySize: {
        width: '75%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalStampointBodySize: {
        width: '80%',
        height: '60%',
        backgroundColor: 'white',
        borderRadius: 10,
    },

    modalTopBar: {
        flex: 1,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent:{
        flex: 12,
        padding: 5,
    },
    tierRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 5,
    },
    myTierRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 5,
        margin: 5,
    },
    tierText2: {
        width: 70,
        textAlign: 'right',
    },
    tierDescription: {
        width: 150,
        textAlign: 'right',
        fontSize: 11,
    },
    resultDiv: {
        flexDirection: 'row',
        padding: 5,
    },
    nameHighlight: {
        fontWeight: 'bold',
    },
    mbtiHighlight:{
        fontWeight: 'bold',
        color: 'blue',
    },
    exDiv: {
        alignItems: 'flex-end',
    },
    mbtiDescription:{
        padding: 10,
    },
    stampointHigh: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 10,
    },
    colDiv:{
        width: 90,
        fontWeight: 'bold',
    },
    pointRow: {
        flexDirection: 'row',
    },
    pointPolicyDiv: {
        padding: 10,
    },
    stampPolicyDiv:{
        padding: 10,
    },
    pyeonheeDiv:{
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 170,
        backgroundColor: 'white',
    },
})
export default MyPageScreen;