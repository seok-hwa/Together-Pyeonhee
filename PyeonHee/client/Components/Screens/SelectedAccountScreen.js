import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../config';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import UpdateAccountButton from '../Buttons/updateAliasButton';
import SetCategoryButton from '../Buttons/SetCategoryButton';
import RNPickerSelect from 'react-native-picker-select';
import { CATEGORY } from './constants';
import { Root, Popup } from 'react-native-popup-confirm-toast';

const url = config.url;
const AccountLogo = (props) => {
    const accountCate = props.accountCate;
    if(accountCate === 'NH농협은행'){
        return(
            <Image source={require('./assets/accounts/nonghyeob.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '부산은행'){
        return(
            <Image source={require('./assets/accounts/busan.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '씨티은행'){
        return(
            <Image source={require('./assets/accounts/citi.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '대구은행'){
        return(
            <Image source={require('./assets/accounts/daegu.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '광주은행'){
        return(
            <Image source={require('./assets/accounts/gwangju.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '하나은행'){
        return(
            <Image source={require('./assets/accounts/hana.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'IBK기업은행'){
        return(
            <Image source={require('./assets/accounts/ibk.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SC제일은행'){
        return(
            <Image source={require('./assets/accounts/sc.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '제주은행'){
        return(
            <Image source={require('./assets/accounts/jeju.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SBI저축은행'){
        return(
            <Image source={require('./assets/accounts/sbi.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'KB국민은행'){
        return(
            <Image source={require('./assets/accounts/kb.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'Kbank'){
        return(
            <Image source={require('./assets/accounts/kbank.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'KDB'){
        return(
            <Image source={require('./assets/accounts/kdb.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '카카오뱅크'){
        return(
            <Image source={require('./assets/accounts/kakao.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '새마을금고'){
        return(
            <Image source={require('./assets/accounts/mg.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SJ산림은행'){
        return(
            <Image source={require('./assets/accounts/sj.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SBI저축은행'){
        return(
            <Image source={require('./assets/accounts/sbi.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '신한은행'){
        return(
            <Image source={require('./assets/accounts/shinhan.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '신협은행'){
        return(
            <Image source={require('./assets/accounts/sinhyeob.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '수협은행'){
        return(
            <Image source={require('./assets/accounts/suhyeob.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '토스'){
        return(
            <Image source={require('./assets/accounts/toss.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '우체국'){
        return(
            <Image source={require('./assets/accounts/uche.png')} style={styles.accountImage}/>
        )
    }
    else if(accountCate === '우리은행'){
        return(
            <Image source={require('./assets/accounts/uri.png')} style={styles.accountImage}/>
        )
    }
    else if(accountCate === '오픈은행'){
        return(
            <Image source={require('./assets/accounts/open.png')} style={styles.accountImage}/>
        )
    }
    else{
          return(
              <View style={styles.accountImage} />
          )
      }
  }

const SelectedAccountScreen = ({navigation, route}) => {
    const [userID, setUserID] = useState('');
    //route.params.tranID  거래 아이디 
    const [category, setCategory] = useState('');
    useEffect(()=>{
        AsyncStorage.getItem('userID', (err, result) => {
            const tempID = result;
            if(tempID!= null){
                setUserID(tempID);
            }
        })
    })

    return (
        <View style={styles.appSize}>
            <View style={styles.appTopDiv}>
                <View style={styles.appTopLeftDiv}>
                    <AccountLogo accountCate={route.params.accountCate}/>
                    <Text style={{fontSize: 12,}}>{route.params.accountCate}</Text>
                    <Text style={styles.aliasFont}>{route.params.accountAlias}</Text>
                </View>
                <View style={styles.appTopRightDiv}>
                    <View style={styles.appTopRightTop}>
                        <UpdateAccountButton />
                    </View>
                    <View style={styles.appTopRightBottom}>
                        <Text style={styles.aliasFont}>계좌 번호: {route.params.accountNum}</Text>
                        <Text style={styles.aliasFont}>계좌 잔액: {route.params.accountBalance}원</Text>
                    </View>
                </View>
            </View>
            <View style={{flex: 4,}}>
            <Text style={styles.titleFont}>거래 내역</Text>
            <View style={styles.latestTranBox}>
                <View style={styles.graphTitle}>
                    <View style={styles.OrganizationNameDiv}><Text style={styles.graphFont}>상호명</Text></View>
                    <View style={styles.tranDate}><Text style={styles.graphFont}>거래일자</Text></View>
                    <View style={styles.tranPrice}><Text style={styles.graphFont}>거래금액</Text></View>
                    <View style={styles.tranCate}><Text style={styles.graphFont}>종류</Text></View>
                </View>
                <ScrollView style={{flex: 1,}}>
                </ScrollView>
            </View>
            </View>
        </View>
    )
}

export default SelectedAccountScreen;

const styles = StyleSheet.create({
    appSize: {
      flex: 1,
      padding: 10,
    },
    appTopDiv:{
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
    },
    appTopLeftDiv:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: 'gray',
    },
    appTopRightDiv:{
        flex: 2,
        flexDirection: 'column',
    },
    appTopRightTop: {
        flex: 1,
        flexDirection: 'row-reverse',
        padding: 5,
    },
    appTopRightBottom:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    titleFont: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 5,
    },
    latestTranBox: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    graphTitle:{
        height: 25,
        backgroundColor: '#8EB3EE',
        flexDirection: 'row',
        borderColor: 'gray',
    },
    BankNameDiv: {
        width: 65,
        alignContent: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
    },
    OrganizationNameDiv: {
        flex: 2.5,
        alignContent: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
    },
    tranDate:{
        flex: 3,
        alignContent: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',

    },
    tranPrice:{
        flex: 4,
        alignContent: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
    },
    tranCate:{
        flex: 2,
        alignContent: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
    },
    graphFont:{
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    accountImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
    },
    aliasFont: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
});