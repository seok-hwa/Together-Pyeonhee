import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AccountItem from './AccountItem';
import setCategoryScreen from './SetCategoryScreen';
import { convertAbsoluteToRem } from 'native-base/lib/typescript/theme/tools';

const AccountLogo = (props) => {
    const accountCate = props.bankName;
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
const TransactionItem = (props) => {
    return (
        <TouchableOpacity onPress={()=>props.navigation.navigate('SetCategory', {fintech: props.fintech, bankName: props.bankName, organizationName: props.organizationName, tranDate: props.tranDate, tranTime: props.tranTime, tranPrice: props.tranPrice, tranCate: props.tranCate, inoutType: props.inoutType, branchName: props.branchName, account_num: props.account_num,})}>
        <View style={styles.TranContentBox}>
            <View style={styles.BankNameDiv}><AccountLogo bankName={props.bankName}/></View>
            <View style={styles.OrganizationNameDiv}><Text style={styles.BankFont}>{props.organizationName}</Text><Text style={styles.BankInFont}>{props.branchName}</Text></View>
            <View style={styles.tranDate}><Text style={styles.tranDateFont}>{props.tranDate.substring(0,4)+'-'+props.tranDate.substring(4,6)+'-'+props.tranDate.substring(6,8)}</Text><Text style={styles.tranDateFont}>{props.tranTime}</Text></View>
            <View style={styles.tranPrice}>
            {props.inoutType === '입금' ? <Text style={styles.tranInPriceFont}>{props.tranPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>:
            <Text style={styles.tranOutPriceFont}>{props.tranPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
            </View>
            <View style={styles.tranCate}><Text style={styles.cateFont}>{props.tranCate}</Text></View>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    BankNameDiv: {
        width: 65,
        alignContent: 'center',
        justifyContent: 'center',
        borderLeftColor: 'gray',
    },
    OrganizationNameDiv: {
        flex: 2.5,
        alignContent: 'center',
        justifyContent: 'center',
        borderLeftColor: 'gray',
    },
    tranDate:{
        flex: 3,
        alignContent: 'center',
        justifyContent: 'center',
        borderLeftColor: 'gray',

    },
    tranPrice:{
        flex: 4,
        alignContent: 'center',
        justifyContent: 'center',
        borderLeftColor: 'gray',
    },
    tranCate:{
        flex: 2,
        alignContent: 'center',
        justifyContent: 'center',
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
        borderTopWidth: 1,
        borderTopColor: 'gray',
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
    BankInFont: {
        fontSize: 10,
        textAlign: 'center',
    },
    tranDateFont:{
        fontSize: 11,
        textAlign: 'center',
    },
    tranInPriceFont:{
        fontSize: 12,
        textAlign: 'right',
        fontWeight: 'bold',
        color: 'blue',
    },
    tranOutPriceFont:{
        fontSize: 12,
        textAlign: 'right',
        fontWeight: 'bold',
        color: 'red',
    },
    cateFont:{
        fontSize: 12,
        textAlign: 'center',
    },
});

export default TransactionItem;