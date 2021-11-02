import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import BackButton from '../Buttons/BackButton';
import Icon from 'react-native-vector-icons/Ionicons';
import PlanningSaveButton from '../Buttons/PlanningSaveButton';
import { PieChart } from 'react-native-chart-kit';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
const LikeButton = (props) => {          //like
    const sendUserLike=()=>{
        fetch('/like', {
            method: 'POST',
            body: JSON.stringify({
                budgetPlanID: props.budgetPlanID,
                userLike: props.userLike,
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            props.getUserLikeCount(responseJson.userLikeCount);
            if(props.userLike == true){
                alert('좋아요를 취소했습니다.');
                props.getUserLike(false);
            }else{
                alert('좋아요를 눌렀습니다.');
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
                <View> 
                    <Icon name="thumbs-up-outline" size={30} color={'blue'}></Icon>
                    <Text style={{color: 'blue', fontWeight: 'bold',}}>{props.userLikeCount}</Text>
                </View> : 
                <View> 
                    <Icon name="thumbs-up-outline" size={30} color={'gray'}></Icon>
                    <Text style={{color: 'gray'}}>{props.userLikeCount}</Text>
                </View> 
            }
        </TouchableOpacity>
    );
};
const RecommendedPlanningScreen = () => {
    const [userID, setUserID] = useState('');
    const [userAge, setUserAge] = useState(0);
    const [userIncome, setUserIncome] = useState(0);
    const [userMBTI, setUserMBTI] = useState('');
    const [userLikeCount, setUserLikeCount] = useState(0);
    const [userFixedExpense, setUserFixedExpense] = useState(0);
    const [userVariableExpense, setUserVariableExpense] = useState(0);
    const [userLike, setUserLike] = useState(false);
    const [loading, setLoading] = useState(false);
    const [education, setEducation] = useState(0);
    const [traffic, setTraffic] = useState(0);
    const [shopping, setShopping] = useState(0);
    const [hobby, setHobby] = useState(0);
    const [insurance, setInsurance] = useState(0);
    const [management, setManagement] = useState(0);
    const [budgetPlanID, setBudgetPlanID] = useState(0);

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
            name: "관리",
            population: management,
            color: "#84C0FF",
            legendFontColor: "black",
            legendFontSize: 15
        },
      ];
    
    useEffect(()=>{
        AsyncStorage.getItem('userID', (err, result) => {
            const tempID = result;
            if(tempID!= null){
              setUserID(tempID);
            }
        });
        fetch(`/recommendedBudgetPlanning/${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log('response data');
            console.log(responseJson);
            setUserLikeCount(responseJson.userLikeCount);
            setUserLike(responseJson.userLike);
            setUserMBTI(responseJson.userMBTI);
            setUserAge(responseJson.userAge);
            setUserIncome(responseJson.userIncome);
            setUserFixedExpense(responseJson.userFixedExpense);
            setUserVariableExpense(responseJson.userVariableExpense);
            setEducation(responseJson.education);
            setTraffic(responseJson.traffic);
            setShopping(responseJson.shopping);
            setHobby(responseJson.hobby);
            setInsurance(responseJson.insurance);
            setManagement(responseJson.management);
            setBudgetPlanID(responseJson.budgetPlanID);

            setLoading(true);
            
        })
        .catch((error)=>{
            console.error(error);
        })
    }, [])    
    const handleSubmitButton = () => {
        fetch('/budgetPlanningSave', {
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
                alert('보관함에 추가되었습니다.');
            }else{
                alert('보관함 저장에 실패했습니다.');
                console.log('fail to save.');
            }
        })
        .catch((error)=>{
            console.error(error);
        })
    }
    if(loading === true){
        return (
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
                    <View style={styles.appInnerBody}>
                        <View style={styles.appTopInnderCard}>
                            <View style={styles.topDivInCard}>
                                <View style={styles.leftDivInCard}>
                                    <Text>나이: {userAge}세</Text> 
                                    <Text>수입: {userIncome}원</Text>
                                    <Text>소비 성향 MBTI: {userMBTI}</Text>
                                </View>
                                <View style={styles.rightDivInCard}>
                                    <LikeButton budgetPlanID= {budgetPlanID} userLike={userLike} userLikeCount={userLikeCount} getUserLike={getUserLike} getUserLikeCount={getUserLikeCount}/>
                                </View>
                            </View>
                            <View style={styles.bottomDivInCard}>
                                <Text >-고정지출: {userFixedExpense}원</Text>
                                <Text >-변동지출: {userVariableExpense}원</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.appBottomInnerBody}>
                        <Text style={{fontSize: 15, fontWeight: '800', }}>카테고리별 예산</Text>
                        <PieChart
                            data={pieChartData}
                            height={200}
                            width={350}
                            chartConfig={{
                                backgroundColor: "#0091EA",
                                backgroundGradientFrom: "#0091EA",
                                backgroundGradientTo: "#0091EA",
                                color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
                            }}
                            accessor="population"
                            backgroundColor="transparent"
                        />
                        <View style={styles.appBottomInnerCard}>
                            <View style={styles.appBottomLineInnerCard}>
                                <Text>교육: </Text>
                                <View style={styles.appBottomRightInnerCard}><Text>{education}원</Text></View>
                            </View> 
                            <View style={styles.appBottomLineInnerCard}>
                                <Text>교통: </Text>
                                <View style={styles.appBottomRightInnerCard}><Text>{traffic}원</Text></View>
                            </View>  
                            <View style={styles.appBottomLineInnerCard}>
                                <Text>취미: </Text>
                                <View style={styles.appBottomRightInnerCard}><Text>{hobby}원</Text></View>
                            </View> 
                            <View style={styles.appBottomLineInnerCard}>
                                <Text>쇼팡: </Text>
                                <View style={styles.appBottomRightInnerCard}><Text>{shopping}원</Text></View>
                            </View> 
                            <View style={styles.appBottomLineInnerCard}>
                                <Text>보험: </Text>
                                <View style={styles.appBottomRightInnerCard}><Text>{insurance}원</Text></View>
                            </View> 
                            <View style={styles.appBottomLineInnerCard}>
                                <Text>관리: </Text>
                                <View style={styles.appBottomRightInnerCard}><Text>{management}원</Text></View>
                            </View> 
                        </View>
                        <PlanningSaveButton onPress={handleSubmitButton}/>
                    </View>
                </View>
            </View>
        )
    }
    else{
        return(
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
        );
    }
}
const styles = StyleSheet.create({
    appSize: {
        flex: 1,
    },
    appTopBar: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
    },
    backButtonPosition: {
        marginLeft: 10,
        flex: 1,
        flexDirection: 'column-reverse',
    },
    appTitlePosition: {
        flex: 10,
        flexDirection: 'column-reverse',
        marginLeft: 20,
        marginBottom: 5,
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
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    },
    appTopInnderCard: {
        flex: 1,
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
    },
    topDivInCard: {
        flex: 1,
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
        marginTop: 20,
    },
    appBottomInnerBody: {
        flex: 3,
        marginLeft: 10,
        marginRight: 10,
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
})
export default RecommendedPlanningScreen;