import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import BackButton from '../../../Buttons/BackButton';
import Icon from 'react-native-vector-icons/Ionicons';
import PlanningSaveButton from '../../../Buttons/PlanningSaveButton';
import PlanningSaveCancelButton from '../../../Buttons/PlanningSaveCancelButton';
import { PieChart } from 'react-native-chart-kit';
// import OtherBudgetItem from './OtherBudgetItem';
import SavingItem from '../../SavingItem';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast'
import { didLike, didStore, saveBudgetPlan, cancelBudgetPlan, recommendedBudgetPlan, sendLike } from '../../../api';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    DeviceEventEmitter,
} from 'react-native';

const LikeButton = (props) => {          //like
    const sendUserLike=()=>{
        sendLike(props.budgetPlanID, props.userLike, props.userID)
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
                    <Icon name="thumbs-up-outline" size={30} color={'blue'}></Icon>
                    <Text style={{color: 'blue', fontWeight: 'bold', marginRight: 3,}}>{props.userLikeCount}</Text>
                </View> : 
                <View style={{alignItems: 'center',}}> 
                    <Icon name="thumbs-up-outline" size={30} color={'gray'}></Icon>
                    <Text style={{color: 'gray', marginRight: 3,}}>{props.userLikeCount}</Text>
                </View> 
            }
        </TouchableOpacity>
    );
};
const OtherBudgetInfo = ({navigation, route}) => {
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
            recommendedBudgetPlan(route.params.budgetPlanningID)
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
                didLike(tempID, route.params.budgetPlanningID)
                .then((responseJson)=>{
                    console.log(responseJson);
                    if(responseJson.status === true){
                        setUserLike(true);
                    }
                })
                .then(()=>{
                    didStore(tempID, route.params.budgetPlanningID)
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
        return () => {
            DeviceEventEmitter.emit('OtherBudgetInfo');
        }
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
                saveBudgetPlan(userID, budgetPlanID)
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
                cancelBudgetPlan(userID, budgetPlanID)
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
                <View style={styles.appTopBar}>
                        <View style={styles.appTitlePosition}>
                            <BackButton onPress={()=>{navigation.goBack()}}/>
                            <View style={{ marginLeft: 20, justifyContent: 'center',}}>
                                <Text style={styles.appTitle}>추천 예산 계획서</Text> 
                            </View>
                        </View>
                    </View>
                <ScrollView style={styles.appSize}>


                    <View style={styles.appBody}>
                        <View style={styles.infoBody}>
                            <View style={styles.mbtiBody}>
                                <View style={styles.mbtiInnerContainer}>
                                    <Text style={styles.mbtiText}>{userMBTI}</Text>
                                </View>
                                <Text style={{fontSize: 13,}}>소비성향</Text>
                            </View>
                            <View style={styles.leftDivInCard}>
                                <View style={styles.textDiv} >
                                    <Text>나이: </Text>
                                    <Text style={styles.textStyle}>{userAge}세</Text> 
                                </View>
                                <View style={styles.textDiv} >
                                    <Text>수입: </Text>
                                    <Text style={styles.textStyle}>{userIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> 
                                </View>
                            </View>
                            <View style={styles.rightDivInCard}>
                                <LikeButton budgetPlanID= {budgetPlanID} userLike={userLike} userLikeCount={userLikeCount} userID = {userID} getUserLike={getUserLike} getUserLikeCount={getUserLikeCount}/>
                            </View>

                        </View>

                        <View style={styles.titleDiv}>
                            <Text style={styles.savingTitle}>이 사용자의 저금계획</Text>
                        </View>

                        <View style={styles.appInnerBody}>
                            <View style={styles.bottomDivInCard}>
                                {saving.length === 0 ?
                                    <Text style={{margin: 10,}}>아직 저장된 저축 계획이 없습니다.</Text> :
                                        saving.map(item => {
                                        return <SavingItem key={item.saving_number} savingName={item.saving_name} currentSavingMoney={item.all_savings_money} goalSavingMoney={item.savings_money}
                                        startSavingDate={item.start_date} endSavingDate={item.finish_date} />;
                                })}
                            </View>
                        </View>




                        <View style={styles.titleDiv}>
                            <Text style={styles.savingTitle}>카테고리별 예산계획</Text>
                        </View>
                        <View style={styles.categoryBody}>
                            <View style={styles.categoryDiv}>
                                <Text style={styles.categoryText}>고정지출</Text>
                            </View>
                            <View style={styles.categoryInnerBody}>
                        
                                
                                <View style={styles.itemDiv}>
                                    <View style={styles.logoContainer}>
                                        <Icon name={'log-out-outline'} size={20} color={'#203864'}/>
                                    </View>
                                    <Text style={styles.itemTitle}>월세</Text>
                                    <View style={{alignItems: 'flex-end'}}>
                                        <Text style={styles.priceTitle}>{rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    </View>
                                </View>
                                <View style={styles.itemDiv}>
                                    <View style={styles.logoContainer}>
                                        <Image source={require('../../assets/category/health-insurance.png')} style={styles.categoryIconDiv}/>
                                    </View>
                                    <Text style={styles.itemTitle}>보험료</Text>
                                    <View style={{alignItems: 'flex-end'}}>
                                        <Text style={styles.priceTitle}>{insurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    </View>
                                </View>
                                <View style={styles.itemDiv}>
                                    <View style={styles.logoContainer}>
                                        <Icon name={'phone-portrait-outline'} size={20} color={'#203864'}/>
                                    </View>
                                    <Text style={styles.itemTitle}>통신비</Text>
                                    <View style={{alignItems: 'flex-end'}}>
                                        <Text style={styles.priceTitle}>{communication.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    </View>
                                </View>
                                <View style={styles.itemDiv}>
                                    <View style={styles.logoContainer}>
                                        <Image source={require('../../assets/category/subscribe.png')} style={styles.categoryIconDiv}/>
                                    </View>
                                    <Text style={styles.itemTitle}>구독료</Text>
                                    <View style={{alignItems: 'flex-end'}}>
                                        <Text style={styles.priceTitle}>{subscribe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.categoryDiv}>
                                <Text style={styles.categoryText}>계획지출</Text>
                            </View>
                            <View style={styles.categoryInnerBody}>

                                <View style={styles.itemDiv}>
                                    <View style={styles.logoContainer}>
                                        <Image source={require('../../assets/category/traffic.png')} style={styles.categoryIconDiv}/>
                                    </View>
                                    <Text style={styles.itemTitle}>교통비</Text>
                                    <View style={{alignItems: 'flex-end'}}>
                                        <Text style={styles.priceTitle}>{traffic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    </View>
                                </View>
                                <View style={styles.itemDiv}>
                                    <View style={styles.logoContainer}>
                                        <Image source={require('../../assets/category/leisure.png')} style={styles.categoryIconDiv}/>
                                    </View>
                                    <Text style={styles.itemTitle}>문화/취미/여행</Text>
                                    <View style={{alignItems: 'flex-end'}}>
                                        <Text style={styles.priceTitle}>{hobby.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    </View>
                                </View>
                                <View style={styles.itemDiv}>
                                <View style={styles.logoContainer}>
                                        <Image source={require('../../assets/category/shopping.png')} style={styles.categoryIconDiv}/>
                                    </View>
                                    <Text style={styles.itemTitle}>뷰티/미용/쇼핑</Text>
                                    <View style={{alignItems: 'flex-end'}}>
                                        <Text style={styles.priceTitle}>{shopping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    </View>
                                </View>
                                <View style={styles.itemDiv}>
                                    <View style={styles.logoContainer}>
                                        <Image source={require('../../assets/category/education.png')} style={styles.categoryIconDiv}/>
                                    </View>
                                    <Text style={styles.itemTitle}>교육</Text>
                                    <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.priceTitle}>{education.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    </View>
                                </View>
                                <View style={styles.itemDiv}>
                                    <View style={styles.logoContainer}>
                                        <Image source={require('../../assets/category/medical.png')} style={styles.categoryIconDiv}/>
                                    </View>
                                    <Text style={styles.itemTitle}>의료비</Text>
                                    <View style={{alignItems: 'flex-end'}}>
                                    <Text style={styles.priceTitle}>{medical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    </View>
                                </View>
                                <View style={styles.itemDiv}>
                                    <View style={styles.logoContainer}>
                                        <Image source={require('../../assets/category/event.png')} style={styles.categoryIconDiv}/>
                                    </View>
                                    <Text style={styles.itemTitle}>경조사/선물</Text>
                                        <View style={{alignItems: 'flex-end'}}>
                                        <Text style={styles.priceTitle}>{event.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    </View>
                                </View>
                                <View style={styles.itemDiv}>
                                    <View style={styles.logoContainer}>
                                        <Icon name={'ellipsis-horizontal-outline'}  size={20} color={'#203864'}/>
                                    </View>
                                    <Text style={styles.itemTitle}>기타</Text>
                                    <View style={{alignItems: 'flex-end'}}>
                                        <Text style={styles.priceTitle}>{ect.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                                    </View>
                                </View>
                                {/* </View> */}
                            </View>
                        </View>

                        <View style={styles.titleDiv}>
                            <Text style={styles.savingTitle}>카테고리별 예산계획 비율</Text>
                        </View>
                        <View style={styles.appBottomInnerBody}>
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
                            
                        </View>
                        <View style={{alignItems:'center'}}>
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
                        <View style={styles.appTitlePosition}>
                            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon name="arrow-back-outline" size={25} color={'gray'}></Icon>
                            </TouchableOpacity> */}
                            <BackButton onPress={()=>{navigation.goBack()}}/>
                            <View style={{ marginLeft: 20, justifyContent: 'center',}}>
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
        backgroundColor:'#F0F4FA',
    },
    appTopBar: {
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row'
    },
    appTitlePosition: {
        marginLeft: 20,
        flexDirection: 'row',
    },
    appTitle: {
        fontSize: 15,
    },
    appBody: {
        flex: 10,
        borderTopWidth: 1,
        borderColor: '#DCDCDC',
    },
    appInnerBody: {
        flex: 1,
        borderRadius: 13,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftDivInCard:{
        flex: 2,
    },
    rightDivInCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomDivInCard: {
        flex: 1,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    savingTitle:{
        marginTop: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#203864',
    },
    appBottomInnerBody: {
        flex: 3,
        margin: 10,
        alignItems: 'center',
        borderRadius: 13,
        backgroundColor: 'white',
    },
    textDiv: {
        flexDirection: 'row',
    },
    textStyle: {
        marginLeft: 5,
        fontWeight: 'bold',
        width: 110,
    },
    iconDiv:{
        width: 20,
        height: 20,
        marginRight: 15,
    },
    mbtiInnerContainer: {
        backgroundColor: 'pink',
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
    mbtiText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
    categoryBody:{
        borderRadius: 13,
        paddingVertical: 5,
        marginBottom: 20,
        marginHorizontal: 10,
        backgroundColor: 'white',
    },
    categoryInnerBody: {
        marginVertical:5, 
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemDiv: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',
    },
    logoContainer: {
        padding: 6,
        borderRadius: 20,
        marginRight: 10, 
        borderColor: '#203864',
        borderWidth: 1,
    },
    itemTitle: {
        width: 110,
    },
    priceTitle: {
        width: 150,
        textAlign: 'right',
        color: '#203864',
    },
    categoryIconDiv: {
        margin: 3,
        width: 18,
        height: 18,
        tintColor: '#203864',
    },
    infoBody: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F4FA',
        borderBottomWidth: 5,
        borderBottomColor: '#DCDCDC',
    },
    mbtiBody: {
        flex: 1,
        alignItems: 'center',
    },
    titleDiv: {
        marginTop: 15,
        marginLeft: 10,
    },
    categoryDiv:{
        width: 80,
        marginTop: 10,
        marginLeft:15, 
        alignItems:'center',
        backgroundColor: '#203864'
    },
    categoryText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    }
})
export default OtherBudgetInfo;