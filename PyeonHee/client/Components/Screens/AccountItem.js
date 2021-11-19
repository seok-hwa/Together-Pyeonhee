import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const AccountLogo = (props) => {
    const accountCate = props.accountCate;
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
const AccountItem = (props) => {


    return (
        <TouchableOpacity>
                <View style={styles.accountCard}>
                    <AccountLogo accountCate={props.accountCate}/>
                    <View style={styles.accountContent}>
                        <View style={styles.accountInnerContent}>
                            <Text style={styles.accountCate}>{props.accountCate}({props.accountNum})</Text>
                            <Text style={styles.accountMoney}>{props.accountAlias}</Text>
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