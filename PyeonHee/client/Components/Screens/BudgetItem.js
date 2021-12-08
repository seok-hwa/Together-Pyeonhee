import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, Modal, Alert} from 'react-native';
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
    const [modalVisible, setModalVisible] = useState(false);


    const handlePress = () => {
        console.log('${url}/openCheck');
        fetch(`${url}/openCheck`, {
            method: 'POST',
            body: JSON.stringify({
              userID: props.userID,
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

            if(responseJson.status === true) {
                console.log('읽은적있음');
                setModalVisible(false);

                // let alertMessage = '잔여포인트는 ' + '100포인트 입니다.';
                // // console.log('잔여 포인트도 보내주면 좋을둣!!');
                // Alert.alert(' ',alertMessage);

                props.navigation.navigate('BudgetDetail', {budgetPlanningID: props.budgetPlanningID});

            } else {
                console.log('읽은적없음');
                setModalVisible(true);
            }                 
        })
    }

    const handleOKButton = () => {
        setModalVisible(false);
        console.log('OK 버튼 함수!')

        fetch(`${url}/usePoint`, {
            method: 'POST',
            body: JSON.stringify({
            userID: props.userID,
            usePoint: 100,
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
            if(responseJson.status === true){
                console.log('포인트 차감 완료');

                let alertMessage = '잔여포인트는 ' + `${responseJson.restPoint}` + '포인트 입니다.';
                // console.log('잔여 포인트도 보내주면 좋을둣!!');
                Alert.alert('포인트 차감완료',alertMessage);
                props.navigation.navigate('BudgetDetail', {budgetPlanningID: props.budgetPlanningID});
            } else{
                console.log('포인트 부족');

                let alertMessage = '현재 보유 포인트는 ' + `${responseJson.restPoint}` + '포인트 입니다.';
                alert('포인트 부족', alertMessage);
                // Popup.show({
                //     type: 'success',
                //     title: '포인트 부족',
                //     textBody: '사용자의 포인트는 얼마로, 얼마의 포인트가 부족합니다.',
                //     buttonText: '확인',
                //     okButtonStyle: {backgroundColor: '#0000CD'},
                //     iconEnabled: false,
                //     callback: () => Popup.hide()
                // })
            }
        })
        .catch((e)=>{
            console.error(e);
        })


        // props.navigation.navigate('BudgetDetail', {budgetPlanningID: props.budgetPlanningID});
    }
    
    

    return (
        <View>
            <Modal
                animationType = {"slide"}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                //  alert('Modal has now been closed.');
                 setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>열람을 위해 100포인트가 차감됩니다.</Text>
                        <View style={{flexDirection: 'row', marginTop: 20,}}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => {setModalVisible(!modalVisible)}}
                            >
                                <Text style={{color: '#203864', fontWeight: 'bold'}}>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.openButton}
                                onPress={handleOKButton}
                            >
                                <Text style={{color: '#203864', fontWeight: 'bold'}}>열람</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Modal>

        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
        >
            <View style={styles.itemContainer}>
                <View style={styles.item1}>
                    <TierImage userTier={props.userTier}/>
                    <Text>{props.userTier.toUpperCase()}</Text>
                </View>

                <View style={styles.mbtiContainer}>
                    <Text style={{fontSize: 10}}>소비 성향</Text>
                    <View style={styles.mbtiInnerContainer}>
                        <Text style={styles.mbtiText}>{props.userMbti}</Text>
                    </View>
                </View>

                <View style={styles.item2}>
                    <Text>나이: {props.userAge}세</Text>
                    <Text>수입: {props.userIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    <Text>직업: {props.userJob}</Text>
                </View>

                <View style={styles.nextCotainer}>
                    <Icon name={'chevron-forward-outline'} size={20} color={'#203864'}/>
                </View>

            </View>
        </TouchableOpacity>
        </View>
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 35,
        paddingTop: 50,
        paddingBottom: 25,
        alignItems: 'center',
        borderWidth: 1,
        borderColor:'#203864',
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

});

export default BudgetItem;