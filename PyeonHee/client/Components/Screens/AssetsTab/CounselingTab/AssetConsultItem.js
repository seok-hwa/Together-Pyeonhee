import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import RankingLogo from './RankingLogo';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast';
import config from '../../../../config';

const url = config.url;
const AssetConsultItem = (props) => {
    const sendMail = () =>{
        console.log('상담사 id: ',props.consultNumber);
        Popup.show({
            type: 'confirm',
            title: '상담매칭',
            textBody: `500P를 사용하여 ${props.counselorName} 상담사에게 상담 매칭 요청을 하시겠습니까?`,
            buttonText: 'yes',
            confirmText: 'no',
            okButtonStyle: {backgroundColor: '#0000CD'},
            iconEnabled: false,
            callback: () => {
                fetch(`${url}/requestMatching`, {
                    method: 'POST',
                    body: JSON.stringify({
                      userID: props.userID,
                      counselorName: props.counselorName,
                    }),
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type':'application/json',
                    },
                })
                .then((response)=>response.json())
                .then((responseJson)=>{
                    if(responseJson.status==='lowBalance'){
                        Popup.show({
                            type: 'success',
                            textBody: '포인트가 부족합니다.',
                            buttonText: '확인',
                            okButtonStyle: {backgroundColor: '#0000CD'},
                            iconEnabled: false,
                            callback: () => Popup.hide()
                        })
                    }
                    else if(responseJson.status==='success'){
                        Popup.show({
                            type: 'success',
                            textBody: '매칭 요청 메시지를 보냈습니다.',
                            buttonText: '확인',
                            okButtonStyle: {backgroundColor: '#0000CD'},
                            iconEnabled: false,
                            callback: () => Popup.hide()
                        })
                    }
                    else{
                        alert('요청 실패');
                    }
                })
            }
        })
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={sendMail}
            // onPress={() => props.navigation.navigate('FinancialConsult', {consultNumber: props.consultNumber})}
        >
            <View style={styles.itemContainer}>
                <View style={styles.rankingLogoContainer}>
                    <RankingLogo rank={props.counselorRank}/>
                </View>

                <View style={styles.item2}>
                    
                    <View style={{width: 105, alignItems: 'center'}}> 
                        <Text> {props.counselorCorp}</Text> 
                    </View>

                    <View style={{width: 80, alignItems: 'center'}}> 
                        <Text>{props.counselorName}</Text> 
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', width: 55, }}>
                        <Image source={require('../../assets/redHeart.png')} style={styles.likeLogo}/>
                        <Text style={{marginLeft: 5, fontSize: 10, }}>{props.counselorLike.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                </View>

                <View>
                    <Icon name={'chevron-forward-outline'} size={20} color={'#8EB3EE'}/>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
      },
      itemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 3, 
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      rankingLogoContainer: {
          width: 30,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
        },
      item2: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 300,
          paddingVertical: 20,
      },
      likeLogo: {
          width: 10,
          height:10,
      },
  });

export default AssetConsultItem;