import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import MbtiSubmitButton from '../Buttons/MbtiSubmitButton';
import MbtiPrevButton from '../Buttons/MbtiPrevButton';
import { Root, Popup } from 'react-native-popup-confirm-toast';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
const Mbti4Screen = ({navigation, route}) => {
  const [url, setUrl] = useState('');
  const [userID, setUserID] = useState('');

  const [mbti1_1, setMbti1_1] = useState(false);
  const [mbti1_2, setMbti1_2] = useState(false);
  const [mbti1_3, setMbti1_3] = useState(false);
  const [mbti1_4, setMbti1_4] = useState(false);
  const [mbti1_5, setMbti1_5] = useState(false);

  const [mbti2_1, setMbti2_1] = useState(false);
  const [mbti2_2, setMbti2_2] = useState(false);
  const [mbti2_3, setMbti2_3] = useState(false);
  const [mbti2_4, setMbti2_4] = useState(false);
  const [mbti2_5, setMbti2_5] = useState(false);

  const [mbti3_1, setMbti3_1] = useState(false);
  const [mbti3_2, setMbti3_2] = useState(false);
  const [mbti3_3, setMbti3_3] = useState(false);
  const [mbti3_4, setMbti3_4] = useState(false);
  const [mbti3_5, setMbti3_5] = useState(false);

  const [mbti4_1, setMbti4_1] = useState(false);
  const [mbti4_2, setMbti4_2] = useState(false);
  const [mbti4_3, setMbti4_3] = useState(false);
  const [mbti4_4, setMbti4_4] = useState(false);
  const [mbti4_5, setMbti4_5] = useState(false);

  const check1_1=()=>{
    if(mbti1_1 === false){
      setMbti1_1(!mbti1_1);
      setMbti1_2(false);
      setMbti1_3(false);
      setMbti1_4(false);
      setMbti1_5(false);
    }
    else{
      setMbti1_1(!mbti1_1);
    }
  }
  const check1_2=()=>{
    if(mbti1_2 === false){
      setMbti1_2(!mbti1_2);
      setMbti1_1(false);
      setMbti1_3(false);
      setMbti1_4(false);
      setMbti1_5(false);
    }
    else{
      setMbti1_2(!mbti1_2);
    }
  }
  const check1_3=()=>{
    if(mbti1_3 === false){
      setMbti1_3(!mbti1_3);
      setMbti1_1(false);
      setMbti1_2(false);
      setMbti1_4(false);
      setMbti1_5(false);
    }
    else{
      setMbti1_3(!mbti1_3);
    }
  }
  const check1_4=()=>{
    if(mbti1_4 === false){
      setMbti1_4(!mbti1_4);
      setMbti1_1(false);
      setMbti1_3(false);
      setMbti1_2(false);
      setMbti1_5(false);
    }
    else{
      setMbti1_4(!mbti1_4);
    }
  }
  const check1_5=()=>{
    if(mbti1_5 === false){
      setMbti1_5(!mbti1_5);
      setMbti1_1(false);
      setMbti1_3(false);
      setMbti1_4(false);
      setMbti1_2(false);
    }
    else{
      setMbti1_5(!mbti1_5);
    }
  }

  const check2_1=()=>{
    if(mbti2_1 === false){
      setMbti2_1(!mbti2_1);
      setMbti2_2(false);
      setMbti2_3(false);
      setMbti2_4(false);
      setMbti2_5(false);
    }
    else{
      setMbti2_1(!mbti2_1);
    }
  }
  const check2_2=()=>{
    if(mbti2_2 === false){
      setMbti2_2(!mbti2_2);
      setMbti2_1(false);
      setMbti2_3(false);
      setMbti2_4(false);
      setMbti2_5(false);
    }
    else{
      setMbti2_2(!mbti2_2);
    }
  }
  const check2_3=()=>{
    if(mbti2_3 === false){
      setMbti2_3(!mbti2_3);
      setMbti2_1(false);
      setMbti2_2(false);
      setMbti2_4(false);
      setMbti2_5(false);
    }
    else{
      setMbti2_3(!mbti2_3);
    }
  }
  const check2_4=()=>{
    if(mbti2_4 === false){
      setMbti2_4(!mbti2_4);
      setMbti2_1(false);
      setMbti2_3(false);
      setMbti2_2(false);
      setMbti2_5(false);
    }
    else{
      setMbti2_4(!mbti2_4);
    }
  }
  const check2_5=()=>{
    if(mbti2_5 === false){
      setMbti2_5(!mbti2_5);
      setMbti2_1(false);
      setMbti2_3(false);
      setMbti2_4(false);
      setMbti2_2(false);
    }
    else{
      setMbti2_5(!mbti2_5);
    }
  }

  const check3_1=()=>{
    if(mbti3_1 === false){
      setMbti3_1(!mbti3_1);
      setMbti3_2(false);
      setMbti3_3(false);
      setMbti3_4(false);
      setMbti3_5(false);
    }
    else{
      setMbti3_1(!mbti3_1);
    }
  }
  const check3_2=()=>{
    if(mbti3_2 === false){
      setMbti3_2(!mbti3_2);
      setMbti3_1(false);
      setMbti3_3(false);
      setMbti3_4(false);
      setMbti3_5(false);
    }
    else{
      setMbti3_2(!mbti3_2);
    }
  }
  const check3_3=()=>{
    if(mbti3_3 === false){
      setMbti3_3(!mbti3_3);
      setMbti3_1(false);
      setMbti3_2(false);
      setMbti3_4(false);
      setMbti3_5(false);
    }
    else{
      setMbti3_3(!mbti3_3);
    }
  }
  const check3_4=()=>{
    if(mbti3_4 === false){
      setMbti3_4(!mbti3_4);
      setMbti3_1(false);
      setMbti3_3(false);
      setMbti3_2(false);
      setMbti3_5(false);
    }
    else{
      setMbti3_4(!mbti3_4);
    }
  }
  const check3_5=()=>{
    if(mbti3_5 === false){
      setMbti3_5(!mbti3_5);
      setMbti3_1(false);
      setMbti3_3(false);
      setMbti3_4(false);
      setMbti3_2(false);
    }
    else{
      setMbti3_5(!mbti3_5);
    }
  }

  const check4_1=()=>{
    if(mbti4_1 === false){
      setMbti4_1(!mbti4_1);
      setMbti4_2(false);
      setMbti4_3(false);
      setMbti4_4(false);
      setMbti4_5(false);
    }
    else{
      setMbti4_1(!mbti4_1);
    }
  }
  const check4_2=()=>{
    if(mbti4_2 === false){
      setMbti4_2(!mbti4_2);
      setMbti4_1(false);
      setMbti4_3(false);
      setMbti4_4(false);
      setMbti4_5(false);
    }
    else{
      setMbti4_2(!mbti4_2);
    }
  }
  const check4_3=()=>{
    if(mbti4_3 === false){
      setMbti4_3(!mbti4_3);
      setMbti4_1(false);
      setMbti4_2(false);
      setMbti4_4(false);
      setMbti4_5(false);
    }
    else{
      setMbti4_3(!mbti4_3);
    }
  }
  const check4_4=()=>{
    if(mbti4_4 === false){
      setMbti4_4(!mbti4_4);
      setMbti4_1(false);
      setMbti4_3(false);
      setMbti4_2(false);
      setMbti4_5(false);
    }
    else{
      setMbti4_4(!mbti4_4);
    }
  }
  const check4_5=()=>{
    if(mbti4_5 === false){
      setMbti4_5(!mbti4_5);
      setMbti4_1(false);
      setMbti4_3(false);
      setMbti4_4(false);
      setMbti4_2(false);
    }
    else{
      setMbti4_5(!mbti4_5);
    }
  }
  function checkAnswer(){
    Popup.show({
      type: 'success',
      textBody: '체크 안 된 문항이 있습니다.',
      buttonText: '확인',
      okButtonStyle: {backgroundColor: '#0000CD'},
      iconEnabled: false,
      callback: () => Popup.hide()
    })
  }
  const handleSubmitButton = () => {
    if(mbti1_1 === false && mbti1_2 === false && mbti1_3 === false && mbti1_4 === false && mbti1_5 === false){
      checkAnswer();
      return;
    }
    if(mbti2_1 === false && mbti2_2 === false && mbti2_3 === false && mbti2_4 === false && mbti2_5 === false){
      checkAnswer();
      return;
    }
    if(mbti3_1 === false && mbti3_2 === false && mbti3_3 === false && mbti3_4 === false && mbti3_5 === false){
      checkAnswer();
      return;
    }
    if(mbti4_1 === false && mbti4_2 === false && mbti4_3 === false && mbti4_4 === false && mbti4_5 === false){
      checkAnswer();
      return;
    }

    let totalScore = 0;

    if(mbti1_2 === true){
      totalScore=totalScore+5;
    }else if(mbti1_3 === true){
      totalScore=totalScore+13;
    }else if(mbti1_4 === true){
      totalScore=totalScore+20;
    }else if(mbti1_5 === true){
      totalScore=totalScore+25;
    }

    if(mbti2_1 === true){
      totalScore=totalScore+25;
    }else if(mbti2_2 === true){
      totalScore=totalScore+20;
    }else if(mbti2_3 === true){
      totalScore=totalScore+13;
    }else if(mbti2_4 === true){
      totalScore=totalScore+5;
    }

    if(mbti3_2 === true){
      totalScore=totalScore+5;
    }else if(mbti3_3 === true){
      totalScore=totalScore+13;
    }else if(mbti3_4 === true){
      totalScore=totalScore+20;
    }else if(mbti3_5 === true){
      totalScore=totalScore+25;
    }

    if(mbti4_1 === true){
      totalScore=totalScore+25;
    }else if(mbti4_2 === true){
      totalScore=totalScore+20;
    }else if(mbti4_3 === true){
      totalScore=totalScore+13;
    }else if(mbti4_4 === true){
      totalScore=totalScore+5;
    }

    console.log('mbti 설문조사 끝');
    console.log('아이디');
    console.log(userID);
    console.log('월수입');
    console.log(route.params.userMonthlyIncome);
    console.log('월 고정지출');
    console.log(route.params.userFixedExpense);
    console.log('저축액');
    console.log(route.params.userSavings);
    console.log('mbti1');
    console.log(route.params.mbti1Score);
    console.log('mbti2');
    console.log(route.params.mbti2Score);
    console.log('mbti3');
    console.log(route.params.mbti3Score);
    console.log('mbti4');
    console.log(totalScore);
    
    /*
    navigation.navigate('MbtiResult', {       //result test
      mbti1Score: route.params.mbti1Score,
      mbti2Score: route.params.mbti2Score,
      mbti3Score: route.params.mbti3Score,
      mbti4Score: totalScore,
    });
    */
    fetch(`${url}/submitMbti`, {
      method: 'POST',
      body: JSON.stringify({
        userID: userID,
        userAge: route.params.userAge,
        userMonthlyIncome: route.params.userMonthlyIncome,
        userJob: route.params.userJob,
        mbti1Score: route.params.mbti1Score,
        mbti2Score: route.params.mbti2Score,
        mbti3Score: route.params.mbti3Score,
        mbti4Score: totalScore,
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
        navigation.navigate('MbtiResult', {
          mbti1Score: route.params.mbti1Score,
          mbti2Score: route.params.mbti2Score,
          mbti3Score: route.params.mbti3Score,
          mbti4Score: totalScore,
          mbtiType: responseJson.mbtiType,
        });
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
        setUserID(tempID);
      }
    }).then(()=>{
      AsyncStorage.getItem('url', (err, result) => {
        let tempUrl = result;
        if(tempUrl!= null){
          setUrl(tempUrl);
        }
      })
    })
  })
  return (
    <Root>
    <View style={styles.appSize}>
      <View style={styles.appTopBar}>
        <View style={styles.barTop}>
          <Text style={styles.logoBbti}>소비 성향 MBTI 테스트</Text>
        </View>
        <View style={styles.barBottom}>
          <View style={styles.blueCircle}><Text style={styles.fontInCircle}>1</Text></View>
          <View style={styles.blueLine}></View>
          <View style={styles.blueCircle}><Text style={styles.fontInCircle}>2</Text></View>
          <View style={styles.blueLine}></View>
          <View style={styles.blueCircle}><Text style={styles.fontInCircle}>3</Text></View>
          <View style={styles.blueLine}></View>
          <View style={styles.blueCircle}><Text style={styles.fontInCircle}>4</Text></View>
        </View>
      </View>
      <ScrollView style={styles.appBody}>
        <View style={styles.questionBox}>
          <View style={styles.questionName}><Text style={styles.questionNameStyle}>질문1</Text></View>
          <View><Text style={styles.questionTitleStyle}>기억에 남는 여행을 하는 것이 명품을 사는 것보다 좋다.</Text></View>
          <View style={styles.questionInnerBox}>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check1_1}>
                {mbti1_1 ? <View style={styles.answerCircleyes} /> : <View style={styles.answerCircleno} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>매우아니다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check1_2}>
                {mbti1_2 ? <View style={styles.answerCircle2_yes} /> : <View style={styles.answerCircle2_no} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>아니다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check1_3}>
                {mbti1_3 ? <View style={styles.answerCircle3_yes} /> : <View style={styles.answerCircle3_no} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>보통이다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check1_4}>
                {mbti1_4 ? <View style={styles.answerCircle2_yes} /> : <View style={styles.answerCircle2_no} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>그렇다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check1_5}>
                {mbti1_5 ? <View style={styles.answerCircleyes} /> : <View style={styles.answerCircleno} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>매우그렇다</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.questionBox}>
          <View style={styles.questionName}><Text style={styles.questionNameStyle}>질문2</Text></View>
            <View><Text style={styles.questionTitleStyle}>비싸더라도 사고 싶은 물건은 꼭 사고야 만다.</Text></View>
            <View style={styles.questionInnerBox}>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check2_1}>
                {mbti2_1 ? <View style={styles.answerCircleyes} /> : <View style={styles.answerCircleno} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>매우아니다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check2_2}>
                {mbti2_2 ? <View style={styles.answerCircle2_yes} /> : <View style={styles.answerCircle2_no} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>아니다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check2_3}>
                {mbti2_3 ? <View style={styles.answerCircle3_yes} /> : <View style={styles.answerCircle3_no} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>보통이다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check2_4}>
                {mbti2_4 ? <View style={styles.answerCircle2_yes} /> : <View style={styles.answerCircle2_no} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>그렇다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check2_5}>
                {mbti2_5 ? <View style={styles.answerCircleyes} /> : <View style={styles.answerCircleno} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>매우그렇다</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.questionBox}>
        <View style={styles.questionName}><Text style={styles.questionNameStyle}>질문3</Text></View>
          <View><Text style={styles.questionTitleStyle}>영화나 공연 관람에 드는 비용은 아깝지 않다.</Text></View>
          <View style={styles.questionInnerBox}>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check3_1}>
                {mbti3_1 ? <View style={styles.answerCircleyes} /> : <View style={styles.answerCircleno} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>매우아니다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check3_2}>
                {mbti3_2 ? <View style={styles.answerCircle2_yes} /> : <View style={styles.answerCircle2_no} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>아니다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check3_3}>
                {mbti3_3 ? <View style={styles.answerCircle3_yes} /> : <View style={styles.answerCircle3_no} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>보통이다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check3_4}>
                {mbti3_4 ? <View style={styles.answerCircle2_yes} /> : <View style={styles.answerCircle2_no} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>그렇다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check3_5}>
                {mbti3_5 ? <View style={styles.answerCircleyes} /> : <View style={styles.answerCircleno} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>매우그렇다</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.questionBox}>
        <View style={styles.questionName}><Text style={styles.questionNameStyle}>질문4</Text></View>
          <View><Text style={styles.questionTitleStyle}>취미 생활보다는 무언가 구매하는 것에 돈을 더 투자한다.</Text></View>
          <View style={styles.questionInnerBox}>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check4_1}>
                {mbti4_1 ? <View style={styles.answerCircleyes} /> : <View style={styles.answerCircleno} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>매우아니다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check4_2}>
                {mbti4_2 ? <View style={styles.answerCircle2_yes} /> : <View style={styles.answerCircle2_no} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>아니다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check4_3}>
                {mbti4_3 ? <View style={styles.answerCircle3_yes} /> : <View style={styles.answerCircle3_no} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>보통이다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check4_4}>
                {mbti4_4 ? <View style={styles.answerCircle2_yes} /> : <View style={styles.answerCircle2_no} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>그렇다</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.difDiv} onPress={check4_5}>
                {mbti4_5 ? <View style={styles.answerCircleyes} /> : <View style={styles.answerCircleno} />}
              </TouchableOpacity>
              <View style={styles.answerInnerDiv}>
                <View style={styles.answerTextDiv}>
                  <Text style={styles.answerText}>매우그렇다</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.appFooter}>
          <MbtiPrevButton onPress={() => navigation.goBack()}/>
          <MbtiSubmitButton onPress={handleSubmitButton}/>
        </View>
      </ScrollView>
    </View>
    </Root>
  )
}
const styles = StyleSheet.create({
  appSize: {
      flex: 1,
  },
  appTopBar: {
      height: 200,
  },
  barTop: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
  },
  barBottom: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
  },
  appBody: {
      borderTopWidth: 2,
      borderColor: '#DCDCDC',
      height: 1200,
  },
  logoBbti:{
    marginTop: 30,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#0000CD',
  },
  grayCircle: {
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  blueCircle: {
    borderWidth: 1,
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: '#0000CD',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  line: {
    height: 1,
    width: 20,
    borderWidth: 2,
    borderColor: 'gray',
    marginTop: 20,
  },
  blueLine: {
    height: 1,
    width: 20,
    borderWidth: 2,
    borderColor: '#0000CD',
    marginTop: 20,
  },
  fontInCircle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  questionBox: {
    margin: 15,
    height: 170,
    borderRadius: 15,
    backgroundColor: '#DCDCDC',
  },
  questionName: {
    margin: 10,
    height: 30,
    width: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  questionNameStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
  questionTitleStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  answerCircleno: {
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
  },
  answerCircle2_no: {
    borderRadius: 17,
    width: 34,
    height: 34,
    backgroundColor: 'white',
    marginTop: 4,
    borderColor: 'white',
    borderWidth: 1,
  },
  answerCircle3_no: {
    borderRadius: 14,
    width: 28,
    height: 28,
    backgroundColor: 'white',
    marginTop: 7,
    borderColor: 'white',
    borderWidth: 1,
  },
  answerCircleyes: {
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: '#87CEFA',
    borderColor: 'white',
    borderWidth: 1,
  },
  answerCircle2_yes: {
    borderRadius: 17,
    width: 34,
    height: 34,
    backgroundColor: '#87CEFA',
    marginTop: 4,
    borderColor: 'white',
    borderWidth: 1,
  },
  answerCircle3_yes: {
    borderRadius: 14,
    width: 28,
    height: 28,
    backgroundColor: '#87CEFA',
    marginTop: 7,
    borderColor: 'white',
    borderWidth: 1,
  },
  difDiv: {
    marginLeft: 10,
    marginRight: 10,
    height: 40,
  },
  answerOutDiv: {
    borderWidth: 1,
  },
  answerInnerDiv: {
    height: 30,
    flexDirection: 'column-reverse',
  },
  questionInnerBox:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  questionInnerTextBox:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  answerText:{
    fontSize: 10,
    fontWeight: 'bold',
  },
  answerTextDiv: {
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'column-reverse',
  },
  appFooter:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default Mbti4Screen;