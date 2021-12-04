import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Root, Popup } from 'react-native-popup-confirm-toast';
// import BudgetDetail from './RecommendedPlanningScreen';
import config from '../../config';

const url = config.url;
const TierImage = (props) => {
  const userTier = props.userTier.toUpperCase();
  if(userTier === 'BRONZE'){
      return(
          <Image source={require('./assets/tier/Bronze_single.png')} style={styles.tierDesign}/>
      )
  }
  else if(userTier === 'SILVER'){
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
const BudgetItem = (props) => {
    const [userID, setUserID] = useState('');

    useEffect(()=>{
        let tempID;
        AsyncStorage.getItem('userID', (err, result) => {
        tempID = result;
        if(tempID!= null){
            setUserID(tempID);
        }
        })
    })

    const handlePressed = () => {
        if(props.budgetCabinet === true){
            console.log('보관함에 저장되어있음');
            props.navigation.navigate('BudgetDetail', {budgetPlanningID: props.budgetPlanningID});
        } else {
            fetch(`${url}/openCheck`, {
                method: 'POST',
                body: JSON.stringify({
                  userID: userID,
                  budgetPlanningID: props.budgetPlanningID,
                }),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type':'application/json',
                },
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log(responseJson);
                
                if(responseJson.status == true) {
                    console.log('읽은적있음');
                    props.navigation.navigate('BudgetDetail', {budgetPlanningID: props.budgetPlanningID});
                } 
                else if (responseJson.status == false) {
                    console.log('읽은적없음');

                    Popup.show({
                        type: 'confirm',
                        textBody: '열람을 위해서는 100포인트가 차감됩니다.',
                        buttonText: '열람',
                        confirmText: '취소',
                        okButtonStyle: {backgroundColor: '#8EB3EE'},
                        iconEnabled: false,
                        callback: () => {
                            Popup.hide()

                            fetch(`${url}/usePoint`, {
                                method: 'POST',
                                body: JSON.stringify({
                                userID: userID,
                                usePoint: 100,
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
                                    console.log('포인트 차감 완료');
                                    // console.log('잔여 포인트도 보내주면 좋을둣!!');
                                    Popup.show({
                                        type: 'success',
                                        title: '포인트 차감 완료',
                                        textBody: '잔여 포인트는 얼마 입니다.' ,
                                        buttonText: '확인',
                                        okButtonStyle: {backgroundColor: '#0000CD'},
                                        iconEnabled: false,
                                        callback: () => {
                                            Popup.hide()
                                            props.navigation.navigate('BudgetDetail', {budgetPlanningID: props.budgetPlanningID});
                                        }
                                    })
                                } else{
                                    console.log('포인트 부족');
                                    Popup.show({
                                        type: 'success',
                                        title: '포인트 부족',
                                        textBody: '사용자의 포인트는 얼마로, 얼마의 포인트가 부족합니다.',
                                        buttonText: '확인',
                                        okButtonStyle: {backgroundColor: '#0000CD'},
                                        iconEnabled: false,
                                        callback: () => Popup.hide()
                                    })
                                }
                            })
                            .catch((e)=>{
                                console.error(e);
                            })
                        }
                    })

                }
                else {
                    console.log('fail to get status');
                    return;
                }
            })
          
        } 
    }
    
    

    return (
        <TouchableOpacity
            style={styles.container}
            // onPress={() => props.navigation.navigate('BudgetDetail', {budgetPlanningID: props.budgetPlanningID})}
            onPress={handlePressed}

        >
            <View style={styles.itemContainer}>
                <View style={styles.item1}>
                    <TierImage userTier={props.userTier}/>
                    <Text>{props.userTier.toUpperCase()}</Text>
                </View>

                <View style={styles.mbtiContainer}>
                    <Text style={{fontSize: 10}}>소비MBTI</Text>
                    <View style={styles.mbtiInnerContainer}>
                        <Text style={styles.mbtiText}>{props.userMbti}</Text>
                    </View>
                </View>

                <View style={styles.item2}>
                    <Text>나이: {props.userAge}세</Text>
                    <Text>수입: {props.userIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    <Text>직업: {props.userJob}</Text>
                    {/* <Text>고정지출: {props.userFixedExpense}원</Text>
                    <Text>변동지출: {props.userVariableExpense}원</Text> */}
                </View>

                <View style={styles.nextCotainer}>
                    <Icon name={'chevron-forward-outline'} size={20} color={'#203864'}/>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      margin: 10,
      borderRadius: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 100,
    },
    item1: {
      width: 100,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRightWidth: 1,
      borderRightColor: '#8EB3EE',
    },
    item2: {
    marginRight: 20,
      justifyContent: 'space-between',
    },
    tierDesign: {
      width: 50,
      height: 50,
    },
    mbtiContainer: {
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    mbtiInnerContainer: {
        backgroundColor: 'pink',
        padding: 3,
        borderRadius: 5,
        width: 50,
        alignItems: 'center',
    },
    mbtiText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
    nextCotainer: {
        marginRight: 15,
    },
  });

export default BudgetItem;