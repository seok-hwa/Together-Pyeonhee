import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AccountItem from './AccountItem';
const AccountLogo = (props) => {
    const accountCate = props.bankName;
    if(accountCate === '농협'){
        return(
            <Image source={require('./assets/accounts/nong.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '부산'){
        return(
            <Image source={require('./assets/accounts/busan.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '씨티'){
        return(
            <Image source={require('./assets/accounts/citi.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '대구'){
        return(
            <Image source={require('./assets/accounts/daeku.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '광주'){
        return(
            <Image source={require('./assets/accounts/Gwangju.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '하나'){
        return(
            <Image source={require('./assets/accounts/hana.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'IBK'){
        return(
            <Image source={require('./assets/accounts/ibk.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '제일'){
        return(
            <Image source={require('./assets/accounts/Jeil.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '제주'){
        return(
            <Image source={require('./assets/accounts/jeju.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '저축'){
        return(
            <Image source={require('./assets/accounts/jeochook.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'KB'){
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
            <Image source={require('./assets/accounts/kkobank.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '새마을'){
        return(
            <Image source={require('./assets/accounts/saema.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '산림'){
        return(
            <Image source={require('./assets/accounts/sanreem.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SBI'){
        return(
            <Image source={require('./assets/accounts/sbi.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '신한'){
        return(
            <Image source={require('./assets/accounts/shinhan.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '신협'){
        return(
            <Image source={require('./assets/accounts/shinhyeob.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '수협'){
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
    else if(accountCate === '우리'){
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
const TransactionItem = (props) => {

    return (
        <View style={styles.TranContentBox}>
            <View style={styles.BankNameDiv}><AccountLogo bankName={props.bankName}/></View>
            <View style={styles.OrganizationNameDiv}><Text style={styles.BankFont}>{props.organizationName}</Text></View>
            <View style={styles.tranDate}><Text style={styles.tranDateFont}>{props.tranDate}</Text></View>
            <View style={styles.tranPrice}><Text style={styles.tranPriceFont}>{props.tranPrice}원</Text></View>
            <View style={styles.tranCate}><Text style={styles.cateFont}>{props.tranCate}</Text></View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    TranBox: {
        flex: 2,
        backgroundColor: 'white',
        borderRadius: 5,
        
    },
    TranContentBox:{
        height: 65,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'gray',
    },
    accountImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
    },
    BankFont: {
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tranDateFont:{
        fontSize: 12,
        textAlign: 'center',
    },
    tranPriceFont:{
        fontSize: 12,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    cateFont:{
        fontSize: 12,
        textAlign: 'center',
    },
});

export default TransactionItem;