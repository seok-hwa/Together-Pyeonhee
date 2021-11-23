import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
const AccountItem = (props) => {

    return (
        <TouchableOpacity onPress={()=>props.navigation.navigate('SelectedAccount', {accountCate: props.accountCate, accountNum: props.accountNum, accountAlias: props.accountAlias, accountBalance: props.accountBalance, fintech_use_num: props.fintech_use_num,})}>
                <View style={styles.accountCard}>
                    <AccountLogo accountCate={props.accountCate}/>
                    <View style={styles.accountContent}>
                        <View style={styles.accountInnerContent}>
                            <Text style={styles.accountCate}>{props.accountCate}({props.accountNum})/{props.accountAlias}</Text>
                            <Text style={styles.accountMoney}>{props.accountBalance}원</Text>
                        </View>
                    </View>
                </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    accountCard: {
        backgroundColor: 'white',
        padding: 7,
        borderTopWidth: 1,
        borderTopColor: 'gray',
        flexDirection:'row',
        margin: 2,
    },
    accountImage: {
        height: 60,
        width: 60,
        borderWidth: 1,
        borderRadius: 30,
    },
    accountContent: {
        flex: 1,
        flexDirection: 'row-reverse',
    },
    accountCate: {
        fontSize: 15,
        marginRight: 10,
        width: 250,
        textAlign: 'right',
    },
    accountInnerContent: {
        flexDirection: 'column',
    },
    accountMoney: {
        marginTop: 8,
        fontSize: 17,
        width: 250,
        textAlign: 'right',
    },
  });

export default AccountItem;