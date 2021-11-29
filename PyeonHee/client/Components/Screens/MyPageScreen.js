import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast'
import config from '../../config';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
const url=config.url;
const MyPageScreen = ({navigation}) => {
    //useState for test
    const [userID, setUserID] = useState('');
    const [userName, setUserName] = useState('');
    const [userTier, setUserTier] = useState('');
    const [userStamp, setUserStamp] = useState(0);
    const [userPoint, setUserPoint] = useState(0);
    const [userMbti, setUserMbti] = useState('');

    const [loading, setLoading] = useState(true);

    //서버 구현 되면 사용
    
    useEffect(()=>{
        let tempID;
        console.log('asdfasdf');
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
            console.log(`${url}/myInfo?userID=${tempID}`);
            fetch(`${url}/myInfo?userID=${tempID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);

                setUserName(responseJson.userName);
                setUserTier(responseJson.userTier);
                setUserStamp(responseJson.userStamp);
                setUserPoint(responseJson.userPoint);
                setUserMbti(responseJson.userMbti);

            })
            .then(()=>{
                setLoading(true);
            })
        })
    }, []) 
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
                
                fetch(`${url}/removeDeviceToken?userID=${userID}`)   //get
                .then((response)=>response.json())
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

        let isTransactionList = true;

        console.log(`${url}/monthReportWithLast?userID=${userID}`);
        fetch(`${url}/monthReportWithLast?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson);
            if(responseJson.length != 0){
                responseJson.real_spend.map(item  => {
                    if(item.tran_type === '쇼핑'){
                        currentShopping=item.daily_amount;
                    }else if(item.tran_type === '교통'){
                        currentTraffic=item.daily_amount;
                    }else if(item.tran_type === '구독'){
                        currentSubscribe=item.daily_amount;
                    }else if(item.tran_type === '통신'){
                        currentCommunication=item.daily_amount;
                    }else if(item.tran_type === '여가'){
                        currentHobby=item.daily_amount;
                    }else if(item.tran_type === '교육'){
                        currentEducation=item.daily_amount;
                    }else if(item.tran_type === '선물'){
                        currentEvent=item.daily_amount;
                    }else if(item.tran_type === '보험'){
                        currentInsurance=item.daily_amount;
                    }else if(item.tran_type === '의료'){
                        currentMedical=item.daily_amount;
                    }else if(item.tran_type === '월세'){
                        currentRent=item.daily_amount;
                    }else if(item.tran_type === '식비'){
                        currentDinner=item.daily_amount;
                    }else{
                        currentEct=item.daily_amount;
                    }
                })

                if(responseJson.last_spend.length !=0){
                    responseJson.last_spend.map(item  => {
                        if(item.tran_type === '쇼핑'){
                            lastShopping=item.daily_amount;
                        }else if(item.tran_type === '교통'){
                            lastTraffic=item.daily_amount;
                        }else if(item.tran_type === '구독'){
                            lastSubscribe=item.daily_amount;
                        }else if(item.tran_type === '통신'){
                            lastCommunication=item.daily_amount;
                        }else if(item.tran_type === '여가'){
                            lastHobby=item.daily_amount;
                        }else if(item.tran_type === '교육'){
                            lastEducation=item.daily_amount;
                        }else if(item.tran_type === '선물'){
                            lastEvent=item.daily_amount;
                        }else if(item.tran_type === '보험'){
                            lastInsurance=item.daily_amount;
                        }else if(item.tran_type === '의료'){
                            lastMedical=item.daily_amount;
                        }else if(item.tran_type === '월세'){
                            lastRent=item.daily_amount;
                        }else if(item.tran_type === '식비'){
                            lastDinner=item.daily_amount;
                        }else{
                            lastEct=item.daily_amount;
                        }
                    })
                }
            }else{
                isTransactionList = false;
            }
        })
        .then(()=>{
            console.log(`${url}/monthReportWithPlan?userID=${userID}`);
            fetch(`${url}/monthReportWithPlan?userID=${userID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log(responseJson);
                if(responseJson.real.length != 0 && responseJson.plan.length != 0){
                    responseJson.real.map(item  => {
                        if(item.tran_type === '쇼핑'){
                            realShopping=item.daily_amount;
                        }else if(item.tran_type === '교통'){
                            realTraffic=item.daily_amount;
                        }else if(item.tran_type === '구독'){
                            realSubscribe=item.daily_amount;
                        }else if(item.tran_type === '통신'){
                            realCommunication=item.daily_amount;
                        }else if(item.tran_type === '여가'){
                            realHobby=item.daily_amount;
                        }else if(item.tran_type === '교육'){
                            realEducation=item.daily_amount;
                        }else if(item.tran_type === '선물'){
                            realEvent=item.daily_amount;
                        }else if(item.tran_type === '보험'){
                            realInsurance=item.daily_amount;
                        }else if(item.tran_type === '의료'){
                            realMedical=item.daily_amount;
                        }else if(item.tran_type === '월세'){
                            realRent=item.daily_amount;
                        }else if(item.tran_type === '식비'){
                            realDinner=item.daily_amount;
                        }else{
                            realEct=item.daily_amount;
                        }
                    })

                    if(responseJson.plan.length !=0){
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
                    }
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
                    },
                    isTransactionList: isTransactionList,
                    userCurrentMbti: userMbti,
                }
                )
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    if(loading === true){
        return(
            <ScrollView style={styles.appSize}>
                <View style={styles.appTopDiv}>
                    <View style={styles.titleDiv}>
                        <Text style={styles.NameStyle}>{userName}</Text>
                        <Text style={styles.NextToNameStyle}>님의 마이페이지</Text>
                    </View>
                    <View style={styles.TopInnerDiv}>
                        <View style={styles.innerTopLeft}>
                            <View style={styles.tierDiv}>
                                <TierImage />
                                <Text style={styles.tierText}>{userTier}</Text>
                            </View>
                        </View>
                        <View style={styles.innerTopRight}>
                            <View style={styles.stampPointDiv}>
                                <View style={styles.mbtiDiv}>
                                    <Text>소비성향 MBTI</Text>
                                    <View style={styles.mbtiInnerContainer}>
                                        <Text style={styles.mbtiText}>{userMbti}</Text>
                                    </View> 
                                </View>
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
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.assetBudgetDiv}>
                    <Text style={styles.assetBudgetTitle}>자산</Text>
                    <TouchableOpacity onPress={()=>alert('자산 연동 및 관리')}>
                        <Text style={styles.assetBudgetBoard} >자산 연동 및 관리</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>alert('자산 상담 페이지 이동')}>
                        <Text style={styles.assetBudgetBoard} >자산 상담 예약</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.assetBudgetDiv}>
                    <Text style={styles.assetBudgetTitle}>예산</Text>
                    <TouchableOpacity onPress={toMonthReport}>
                        <Text style={styles.assetBudgetBoard} >한달 리포트 보기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('WriteBudget')}>
                        <Text style={styles.assetBudgetBoard} >예산 계획서 작성</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.ectDiv}>
                <Text style={styles.assetBudgetTitle}>기타</Text>
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
        padding: 5,
        flex: 1,
        flexDirection: 'row',
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
        height: 100,
        backgroundColor: 'white',
    },
    mbtiInnerContainer: {
        backgroundColor: 'pink',
        padding: 3,
        borderRadius: 5,
        marginLeft: 10,
        height: 26,
    },
    mbtiText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
})
export default MyPageScreen;