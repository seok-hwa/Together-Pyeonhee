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

            })
            .then(()=>{
                setLoading(true);
            })
        })
    }, []) 
    function TierImage(){
        if(userTier === 'Bronze'){
            return(
                <Image source={require('./assets/tier/Bronze_single.png')} style={styles.tierDesign}/>
            )
        }else if(userTier === 'Silver'){
            return(
                <Image source={require('./assets/tier/Silver_single.png')} style={styles.tierDesign}/>
            )
        }else if(userTier === 'Gold'){
            return(
                <Image source={require('./assets/tier/Gold_single.png')} style={styles.tierDesign}/>
            )
        }else if(userTier === 'Platinum'){
            return(
                <Image source={require('./assets/tier/Platinum_single.png')} style={styles.tierDesign}/>
            )
        }else if(userTier === 'Diamond'){
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
              navigation.reset({routes: [{name: 'Login'}]})
            })
          }
        })
      }
    if(loading === true){
        return(
            <Root>
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
                    <TouchableOpacity onPress={()=>alert('자산 관리 페이지 이동')}>
                        <Text style={styles.assetBudgetBoard} >자산 연동 및 관리</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>alert('자산 상담 페이지 이동')}>
                        <Text style={styles.assetBudgetBoard} >자산 상담 예약</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.assetBudgetDiv}>
                    <Text style={styles.assetBudgetTitle}>예산</Text>
                    <TouchableOpacity onPress={()=>alert('예산 계획서 보관 페이지 이동')}>
                        <Text style={styles.assetBudgetBoard} >예산 계획서 보관함</Text>
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
            </Root>
        );
    }
    else{
        return(
            <Root>
            <View style={styles.appSize}>
            </View>
            </Root>
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
        marginTop: 20,
    },
    stampDiv: {
        flexDirection: 'row',
    },
    pointDiv: {
        flexDirection: 'row',
        marginTop: 25,
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
})
export default MyPageScreen;