import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../config';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';

const url = config.url;
const AccountLogo = (props) => {
    const accountCate = props.bankName;
    if(accountCate === '농협'){
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

const SetCategoryScreen = ({navigation, route}) => {
    const [userID, setUserID] = useState('');
    //route.params.tranID  거래 아이디 
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
            <View style={styles.appOutBody}>
            <AccountLogo bankName={route.params.bankName}/>
            <View style={styles.appBody}>
            <View style={styles.lowDiv}>
                <Text style={styles.tranTitle}>계좌 번호: </Text>
                <Text style={styles.tranContent}>123412</Text>
            </View>
            <View style={styles.lowDiv}>
                <Text style={styles.tranTitle}>계좌 별명: </Text>
                <Text style={styles.tranContent}>나나</Text>
            </View>
            <View style={styles.lowDiv}>
                <Text style={styles.tranTitle}>거래 일자: </Text>
                <Text style={styles.tranContent}>{route.params.tranDate}</Text>
            </View>
            <View style={styles.lowDiv}>
                <Text style={styles.tranTitle}>거래 시간: </Text>
                <Text style={styles.tranContent}>{route.params.tranTime}</Text>
            </View>
            <View style={styles.lowDiv}>
                <Text style={styles.tranTitle}>거래 금액: </Text>
                <Text style={styles.tranContent}>{route.params.tranPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
            </View>
            <View style={styles.lowDiv}>
                <Text style={styles.tranTitle} >상호명: </Text>
                <Text style={styles.tranContent}>{route.params.organizationName}</Text>
            </View>
            <View style={styles.lowDiv}>
                <Text style={styles.tranTitle}>종류: </Text>
                <Text style={styles.tranContent}>{route.params.tranCate}</Text>
            </View>
            </View>
            </View>
        </View>
    )
}

export default SetCategoryScreen;

const styles = StyleSheet.create({
    appSize: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    appOutBody:{
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    appBody: {
        margin: 30,
    },
    lowDiv: {
        flexDirection: 'row',
        width: 250,
        marginTop: 10,
    },
    accountImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
    },
    tranTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        width: 80,
    },
    tranContent: {
        textAlign: 'right',
        width: 170,
        fontSize: 17,
    },
});
