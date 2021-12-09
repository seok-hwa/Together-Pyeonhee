import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';

const AccountLogo = (props) => {
    const accountCate = props.accountCate;
    if(accountCate === 'NH농협은행'){
        return(
            <Image source={require('./accounts/nonghyeob.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '부산은행'){
        return(
            <Image source={require('./accounts/busan.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '씨티은행'){
        return(
            <Image source={require('./accounts/citi.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '대구은행'){
        return(
            <Image source={require('./accounts/daegu.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '광주은행'){
        return(
            <Image source={require('./accounts/gwangju.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '하나은행'){
        return(
            <Image source={require('./accounts/hana.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'IBK기업은행'){
        return(
            <Image source={require('./accounts/ibk.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SC제일은행'){
        return(
            <Image source={require('./accounts/sc.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '제주은행'){
        return(
            <Image source={require('./accounts/jeju.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SBI저축은행'){
        return(
            <Image source={require('./accounts/sbi.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'KB국민은행'){
        return(
            <Image source={require('./accounts/kb.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'Kbank'){
        return(
            <Image source={require('./accounts/kbank.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'KDB'){
        return(
            <Image source={require('./accounts/kdb.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '카카오뱅크'){
        return(
            <Image source={require('./accounts/kakao.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '새마을금고'){
        return(
            <Image source={require('./accounts/mg.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SJ산림은행'){
        return(
            <Image source={require('./accounts/sj.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SBI저축은행'){
        return(
            <Image source={require('./accounts/sbi.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '신한은행'){
        return(
            <Image source={require('./accounts/shinhan.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '신협은행'){
        return(
            <Image source={require('./accounts/sinhyeob.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '수협은행'){
        return(
            <Image source={require('./accounts/suhyeob.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '토스'){
        return(
            <Image source={require('./accounts/toss.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '우체국'){
        return(
            <Image source={require('./accounts/uche.png')} style={styles.accountImage}/>
        )
    }
    else if(accountCate === '우리은행'){
        return(
            <Image source={require('./accounts/uri.png')} style={styles.accountImage}/>
        )
    }
    else if(accountCate === '오픈은행'){
        return(
            <Image source={require('./accounts/open.png')} style={styles.accountImage}/>
        )
    }
    else{
          return(
              <View style={styles.accountImage} />
          )
      }
}

const styles = StyleSheet.create({
    accountImage: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderRadius: 30,
    },
});

export default AccountLogo;