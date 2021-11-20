import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import BackButton from '../Buttons/BackButton';
import Icon from 'react-native-vector-icons/Ionicons';
import PlanningSaveButton from '../Buttons/PlanningSaveButton';
import PlanningSaveCancelButton from '../Buttons/PlanningSaveCancelButton';
import { PieChart } from 'react-native-chart-kit';
import config from '../../config';
import SavingItem from './SavingItem';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast'

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
const url = config.url;
const LikeButton = (props) => {          //like
    const sendUserLike=()=>{
        fetch(`${url}/likeBudgetPlan/`, {
            method: 'POST',
            body: JSON.stringify({
                budgetPlanID: props.budgetPlanID,
                userLike: props.userLike,
                userID: props.userID,
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            if(props.userLike == true){
                console.log('좋아요를 취소했습니다.');
                props.getUserLikeCount(props.userLikeCount-1);
                props.getUserLike(false);
            }else{
                console.log('좋아요를 눌렀습니다.');
                props.getUserLikeCount(props.userLikeCount+1);
                props.getUserLike(true);
            }
        })
        .catch((error)=>{
            console.error(error);
        })
    }
    return(
        <TouchableOpacity onPress={sendUserLike}>
            {props.userLike ?
                <View style={{alignItems: 'center',}}> 
                    <Icon name="thumbs-up-outline" size={40} color={'blue'}></Icon>
                    <Text style={{color: 'blue', fontWeight: 'bold', marginRight: 3,}}>{props.userLikeCount}</Text>
                </View> : 
                <View style={{alignItems: 'center',}}> 
                    <Icon name="thumbs-up-outline" size={40} color={'gray'}></Icon>
                    <Text style={{color: 'gray', marginRight: 3,}}>{props.userLikeCount}</Text>
                </View> 
            }
        </TouchableOpacity>
    );
};
const RecommendedPlanningScreen = ({navigation, route}) => {
    const [userID, setUserID] = useState('');
    const [userAge, setUserAge] = useState(0);
    const [userIncome, setUserIncome] = useState(0);
    const [userMBTI, setUserMBTI] = useState('');
    const [userLikeCount, setUserLikeCount] = useState(0);
    const [userLike, setUserLike] = useState(false);
    const [userStore, setUserStore] = useState(false);

    const [loading, setLoading] = useState(false);

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


    const [budgetPlanID, setBudgetPlanID] = useState(2);

    const [saving, setSaving] = useState([]);

    const getUserLike=(userLike)=>{
        setUserLike(userLike);
    }
    const getUserLikeCount=(userLikeCount)=>{
        setUserLikeCount(userLikeCount);
    }
    const pieChartData = [
        {
          name: "교육",
          population: education,
          color: "#E8F8FF",
          legendFontColor: "black",
          legendFontSize: 15
        },
        {
          name: "교통",
          population: traffic,
          color: "#D5F3FF",
          legendFontColor: "black",
          legendFontSize: 15
        },
        {
          name: "쇼핑",
          population: shopping,
          color: "#C1E8FF",
          legendFontColor: "black",
          legendFontSize: 15
        },
        {
          name: "취미",
          population: hobby,
          color: "#A9D7FF",
          legendFontColor: "black",
          legendFontSize: 15
        },
        {
          name: "보험",
          population: insurance,
          color: "#96C5FF",
          legendFontColor: "black",
          legendFontSize: 15
        },
        {
            name: "의료",
            population: medical,
            color: "#84C0FF",
            legendFontColor: "black",
            legendFontSize: 15
        },
        {
            name: "월세",
            population: rent,
            color: "#71D8FF",
            legendFontColor: "black",
            legendFontSize: 15
        },
        {
            name: "통신",
            population: communication,
            color: "#59A5FF",
            legendFontColor: "black",
            legendFontSize: 15
        },
        {
            name: "경조사",
            population: event,
            color: "#4399FF",
            legendFontColor: "black",
            legendFontSize: 15
        },
        {
            name: "기타",
            population: ect,
            color: "#3185FF",
            legendFontColor: "black",
            legendFontSize: 15
        },
      ];
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
            console.log(`${url}/recommendedBudgetPlan?budgetPlanningID=${route.params.budgetPlanningID}`);
            fetch(`${url}/recommendedBudgetPlan?budgetPlanningID=${route.params.budgetPlanningID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');

                console.log(responseJson);
                setUserLikeCount(responseJson.data.userLikeCount);
                setUserMBTI(responseJson.data.userMBTI);
                setUserAge(responseJson.data.userAge);
                setUserIncome(responseJson.data.userIncome);

                setEducation(responseJson.data.education);
                setTraffic(responseJson.data.traffic);
                setShopping(responseJson.data.shopping);
                setHobby(responseJson.data.hobby);
                setInsurance(responseJson.data.insurance);
                setMedical(responseJson.data.medical);
                setRent(responseJson.data.rent);
                setCommunication(responseJson.data.communication);
                setEct(responseJson.data.ect);
                setEvent(responseJson.data.event);
                setSubscribe(responseJson.data.subscribe);

                setBudgetPlanID(responseJson.data.budgetPlanID);
                setSaving(responseJson.result);

                //setLoading(true);//for test
            })
            .then(()=>{
                fetch(`${url}/didLike`, {
                    method: 'POST',
                    body: JSON.stringify({
                    userID: tempID,
                    budgetPlanID: route.params.budgetPlanningID,
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
                        setUserLike(true);
                    }
                    console.log('좋아요 받았어?');
                })
                .then(()=>{
                    console.log('보관함', `${url}/didStore`);
                    fetch(`${url}/didStore`, {
                        method: 'POST',
                        body: JSON.stringify({
                            userID: tempID,
                            budgetPlanID: route.params.budgetPlanningID,
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
                            setUserStore(true);
                        }
                    })
                    .then(()=>{
                        setLoading(true);
                    })
                })
            })
        }) 
    }, []) 
    const handleSubmitSaveButton = () => {
        Popup.show({
            type: 'confirm',
            title: '보관함',
            textBody: '보관함에 추가 하시겠습니까?',
            buttonText: 'yes',
            confirmText: 'no',
            okButtonStyle: {backgroundColor: '#0000CD'},
            iconEnabled: false,
            callback: () => {
              //Popup.hide()
              fetch(`${url}/saveBudgetPlan`, {
                method: 'POST',
                body: JSON.stringify({
                  userID: userID,
                  budgetPlanID: budgetPlanID,
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
                        console.log('추가 완료');
                        setUserStore(true);
                        Popup.show({
                            type: 'success',
                            textBody: '보관함에 추가되었습니다.',
                            buttonText: '확인',
                            okButtonStyle: {backgroundColor: '#0000CD'},
                            iconEnabled: false,
                            callback: () => Popup.hide()
                        })
                    }else{
                        Popup.show({
                            type: 'success',
                            textBody: '보관함에 추가되었습니다.',
                            buttonText: '확인',
                            okButtonStyle: {backgroundColor: '#0000CD'},
                            iconEnabled: false,
                            callback: () => Popup.hide()
                        })
                        console.log('fail to save.');
                    }
                })
                .catch((error)=>{
                    console.error(error);
                })
            }
          })
    }
    const handleSubmitCancelButton = () => {
        Popup.show({
            type: 'confirm',
            title: '보관함',
            textBody: '보관함에서 삭제 하시겠습니까?',
            buttonText: 'yes',
            confirmText: 'no',
            okButtonStyle: {backgroundColor: '#0000CD'},
            iconEnabled: false,
            callback: () => {
              //Popup.hide()
              fetch(`${url}/cancelBudgetPlan`, {
                method: 'POST',
                body: JSON.stringify({
                  userID: userID,
                  budgetPlanID: budgetPlanID,
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
                        console.log('삭제 완료');
                        setUserStore(false);
                        Popup.show({
                            type: 'success',
                            textBody: '보관함에서 삭제되었습니다.',
                            buttonText: '확인',
                            okButtonStyle: {backgroundColor: '#0000CD'},
                            iconEnabled: false,
                            callback: () => Popup.hide()
                        })
                    }else{
                        console.log('fail to save.');
                        Popup.show({
                            type: 'success',
                            textBody: '보관함 삭제를 실패 했습니다.',
                            buttonText: '확인',
                            okButtonStyle: {backgroundColor: '#0000CD'},
                            iconEnabled: false,
                            callback: () => Popup.hide()
                        })
                    }
                })
                .catch((error)=>{
                    console.error(error);
                })
            }
          })
    }
    if(loading === true){
        return (
            <Root>
            <ScrollView style={styles.appSize}>
                <View style={styles.appTopBar}>
                    <View style={styles.appTitlePosition}>
                        <View>
                            <Text style={styles.appTitle}>추천 예산 계획서</Text> 
                        </View>
                    </View>
                </View>
                <View style={styles.appBody}>
                    <View style={styles.appInnerBody}>
                        <View style={styles.appTopInnderCard}>
                            <View style={styles.topDivInCard}>
                                <View style={styles.leftDivInCard}>
                                    <View style={styles.textDiv} >
                                        <Text>나이: </Text>
                                        <Text style={styles.textStyle}>{userAge}세</Text> 
                                    </View>
                                    <View style={styles.textDiv} >
                                        <Text>수입: </Text>
                                        <Text style={styles.textStyle}>{userIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> 
                                    </View>
                                    <View style={styles.textDiv} >
                                        <Text style={{marginTop: 3,}}>소비 성향 MBTI: </Text>
                                        <View style={styles.mbtiInnerContainer}>
                                            <Text style={styles.mbtiText}>{userMBTI}</Text>
                                        </View> 
                                    </View>
                                </View>
                                <View style={styles.rightDivInCard}>
                                    <LikeButton budgetPlanID= {budgetPlanID} userLike={userLike} userLikeCount={userLikeCount} userID = {userID} getUserLike={getUserLike} getUserLikeCount={getUserLikeCount}/>
                                </View>
                            </View>
                            <Text style={styles.savingTitle}>이 사용자의 저금계획</Text>
                            <View style={styles.bottomDivInCard}>
                                {saving.length === 0 ?
                                <Text style={{margin: 10,}}>아직 저장된 저축 계획이 없습니다.</Text> :
                                saving.map(item => {
                                return <SavingItem key={item.saving_number} savingName={item.saving_name} currentSavingMoney={item.all_savings_money} goalSavingMoney={item.savings_money}
                                startSavingDate={item.start_date} endSavingDate={item.finish_date} />;
                                })}
                            </View>
                        </View>
                    </View>
                    <View style={styles.MoneyBody}>
                        <Text style={styles.fixTitle}>고정</Text>
                        <View style={styles.fixBody}>
                            <View style={styles.fixInnerDiv}>
                                <Image source={require('./assets/category/rent.png')} style={styles.iconDiv}/>
                                <Text style={styles.fixCate}>월세</Text>
                                <Text style={styles.fixPlanMoneyText}>{rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View>
                            <View style={styles.fixInnerDiv}>
                                <Image source={require('./assets/category/insurance.png')} style={styles.iconDiv}/>
                                <Text style={styles.fixCate}>보험</Text>
                                <Text style={styles.fixPlanMoneyText}>{insurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View>
                            <View style={styles.fixInnerDiv}>
                                <Image source={require('./assets/category/education.png')} style={styles.iconDiv}/>
                                <Text style={styles.fixCate}>교육</Text>
                                <Text style={styles.fixPlanMoneyText}>{education.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View>
                            <View style={styles.fixInnerDiv}>
                                <Image source={require('./assets/category/communication.png')} style={styles.iconDiv}/>
                                <Text style={styles.fixCate}>통신</Text>
                                <Text style={styles.fixPlanMoneyText}>{communication.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View>
                            <View style={styles.fixInnerDiv}>
                                <Image source={require('./assets/category/subscribe.png')} style={styles.iconDiv}/>
                                <Text style={styles.fixCate}>구독</Text>
                                <Text style={styles.fixPlanMoneyText}>{subscribe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View>
                        </View>
                        <Text style={styles.fixTitle}>계획</Text>
                        <View style={styles.planBody}>
                            <View style={styles.fixInnerDiv}>
                            <Image source={require('./assets/category/traffic.png')} style={styles.iconDiv}/>
                                <Text style={styles.fixCate}>교통</Text>
                                <Text style={styles.fixPlanMoneyText}>{traffic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View>
                            <View style={styles.fixInnerDiv}>
                            <Image source={require('./assets/category/medical.png')} style={styles.iconDiv}/>
                                <Text style={styles.fixCate}>의료</Text>
                                <Text style={styles.fixPlanMoneyText}>{medical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View>
                            <View style={styles.fixInnerDiv}>
                            <Image source={require('./assets/category/shopping.png')} style={styles.iconDiv}/>
                                <Text style={styles.fixCate}>쇼핑</Text>
                                <Text style={styles.fixPlanMoneyText}>{shopping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View>
                            <View style={styles.fixInnerDiv}>
                            <Image source={require('./assets/category/hobby.png')} style={styles.iconDiv}/>
                                <Text style={styles.fixCate}>취미</Text>
                                <Text style={styles.fixPlanMoneyText}>{hobby.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View>
                            <View style={styles.fixInnerDiv}>
                            <Image source={require('./assets/category/event.png')} style={styles.iconDiv}/>
                                <Text style={styles.fixCate}>경조사</Text>
                                <Text style={styles.fixPlanMoneyText}>{event.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View>
                            <View style={styles.fixInnerDiv}>
                            <Image source={require('./assets/category/ect.png')} style={styles.iconDiv}/>
                                <Text style={styles.fixCate}>기타</Text>
                                <Text style={styles.fixPlanMoneyText}>{ect.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.appBottomInnerBody}>
                        <Text style={{fontSize: 15, fontWeight: '800', margin: 50,}}>카테고리별 예산</Text>
                        <PieChart
                            data={pieChartData}
                            height={220}
                            width={360}
                            chartConfig={{
                                backgroundColor: "#0091EA",
                                backgroundGradientFrom: "#0091EA",
                                backgroundGradientTo: "#0091EA",
                                color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
                            }}
                            accessor="population"
                            backgroundColor="transparent"
                        />
                        {userStore === false ?
                            <PlanningSaveButton onPress={handleSubmitSaveButton}/>
                            :
                            <PlanningSaveCancelButton onPress={handleSubmitCancelButton}/>
                        }
                    </View>
                </View>
            </ScrollView>
            </Root>
        )
    }
    else{
        return(
            <Root>
            <View style={styles.appSize}>
                <View style={styles.appTopBar}>
                    <View style={styles.backButtonPosition}>
                        <BackButton />
                    </View>
                    <View style={styles.appTitlePosition}>
                        <View>
                            <Text style={styles.appTitle}>추천 예산 계획서</Text> 
                        </View>
                    </View>
                </View>
                <View style={styles.appBody}>
                </View>
            </View>
            </Root>
        );
    }
}
const styles = StyleSheet.create({
    appSize: {
        flex: 1,
    },
    appTopBar: {
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    backButtonPosition: {
        marginLeft: 10,
        flex: 1,
        flexDirection: 'column-reverse',
    },
    appTitlePosition: {
        marginLeft: 20,
    },
    appTitle: {
        fontSize: 15,
    },
    infoDiv:{
        width: 100,
        borderWidth: 1,
    },
    appBody: {
        flex: 10,
        borderTopWidth: 1,
        borderColor: '#DCDCDC',
    },
    appInnerBody: {
        flex: 1,
        borderRadius: 10,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    appTopInnderCard: {
        flex: 1,
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
    },
    topDivInCard: {
        height: 80,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    leftDivInCard:{
        flex: 2,
        marginBottom: 5,
    },
    rightDivInCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomDivInCard: {
        flex: 1,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    savingTitle:{
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    appBottomInnerBody: {
        flex: 3,
        marginTop: 20,
        alignItems: 'center',
    },
    appBottomInnerCard:{
        width: 150,
    },
    appBottomLineInnerCard:{
        flexDirection: 'row',
    },
    appBottomRightInnerCard:{
        width: 115,
        flexDirection: 'row-reverse',
    },
    textDiv: {
        flexDirection: 'row',
    },
    textStyle: {
        marginLeft: 5,
        fontWeight: 'bold',
        width: 110,
    },
    mbtiStyle: {
        marginLeft: 10,
        fontWeight: 'bold',
        color: 'blue',
        fontSize: 15,
    },
    savingText: {
        color: '#191970',
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 15,
    },
    savingDiv: {
        marginTop: 10,
        height: 100,
        borderWidth: 1,
        borderRadius: 5,
    },
    savingInnerDiv: {
        flexDirection: 'row',
    },
    savingOuterDiv: {
        marginTop: 10,
    },
    goalText: {
        fontSize: 12,
    },
    savingBottomDiv: {
        marginTop: 10,
    },
    progressText: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 17,
    },
    MoneyBody: {
        height: 500,
        borderRadius: 10,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    fixTitle: {
        margin: 30,
        fontSize: 15,
        fontWeight: 'bold',
    },
    fixBody:{
        marginLeft: 30,
        marginRight: 30,
        height: 130,
        borderRadius: 3,
        alignItems: 'center',
    },
    fixCate:{
        width: 50,
    },
    fixInnerDiv:{
        flexDirection: 'row',
        margin: 5,
    },
    planBody:{
        marginLeft: 30,
        marginRight: 30,
        height: 170,
        borderRadius: 3,
        alignItems: 'center',
    },
    fixPlanMoneyText:{
        width: 120,
        textAlign:'right',
    },
    iconDiv:{
        width: 20,
        height: 20,
        marginRight: 15,
    },
    mbtiInnerContainer: {
        backgroundColor: 'pink',
        padding: 3,
        borderRadius: 5,
    },
    mbtiText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
})
export default RecommendedPlanningScreen;