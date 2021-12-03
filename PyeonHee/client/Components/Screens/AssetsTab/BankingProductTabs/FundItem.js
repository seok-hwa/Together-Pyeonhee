import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Root, Popup } from 'react-native-popup-confirm-toast';

const AccountLogo = (props) => {
  const accountCate = props.bankName;
  if(accountCate === 'KB자산운용'){
      return(
          <Image source={require('../../assets/accounts/kb.png')} style={styles.accountImage}/>
      )
  }else if(accountCate === 'KTB자산운용'){
    return(
        <Image source={require('../../assets/accounts/ktb.png')} style={styles.accountImage}/>
    )
  }else if(accountCate === 'VI자산운용'){
    return(
        <Image source={require('../../assets/accounts/vi.png')} style={styles.accountImage}/>
    )
  }else if(accountCate === '삼성자산운용'){
    return(
        <Image source={require('../../assets/accounts/samsung.png')} style={styles.accountImage}/>
    )
  }else if(accountCate === '신한자산운용'){
    return(
        <Image source={require('../../assets/accounts/shinhan.png')} style={styles.accountImage}/>
    )
  }else if(accountCate === '한국투자신탁운용'){
    return(
        <Image source={require('../../assets/accounts/han.png')} style={styles.accountImage}/>
    )
  }
  else if(accountCate === '현대자산운용'){
    return(
        <Image source={require('../../assets/accounts/hyeondae.png')} style={styles.accountImage}/>
    )
  }
  else{
        return(
            <View style={styles.accountImage} />
        )
    }
}
const FundItem = (props) => {
    return (
        <TouchableOpacity 
        style={styles.container}
        onPress={() => props.navigation.navigate('ItemLink', {link: props.link})}>
            <View style={styles.itemContainer}>
                <View style={styles.item1}>
                    <AccountLogo bankName={props.bank_name}/>
                    <Text style={styles.fundBankFont}>{props.bank_name}</Text>
                    <Text style={styles.fundNameFont}>{props.product_name}</Text>
                </View>
                <View style={styles.item2}>
                    <View style={styles.infoRow}> 
                        <Text style={styles.rowFontSize}>3개월 수익률: </Text>
                        <Text style={styles.highlightFont}>{props.interest_3}%</Text>
                    </View>
                    <View style={styles.infoRow}> 
                        <Text style={styles.rowFontSize}>6개월 수익률: </Text>
                        <Text style={styles.highlightFont}>{props.interest_6}%</Text>
                    </View>
                    <View style={styles.infoRow}> 
                        <Text style={styles.rowFontSize}>1년 수익률: </Text>
                        <Text style={styles.highlightFont}>{props.interest_12}%</Text>
                    </View>
                    <View style={styles.infoRow}> 
                        <Text style={styles.rowFontSize}>펀드 규모: </Text>
                        <Text style={styles.realHighlightFont}>{props.fund_sum}억</Text>
                    </View>
                </View>
                <View style={styles.nextCotainer}>
                    <Text style={styles.nextText}> {'>'} </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 120,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
      },
      itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 120,
      },
      item1: {
        width: 170,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: 'gray',
        padding: 5,
      },
      item2: {
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
      },
      mbtiText: {
          fontWeight: 'bold',
          fontSize: 15,
          color: 'white',
      },
      nextCotainer: {
          marginRight: 15,
      },
      nextText: {
          fontSize: 20,
          color: '#A7A3A3'
      },


      fundNameFont: {
        fontWeight: 'bold',
        fontSize: 11,
      },
      fundBankFont: {
        marginTop: 5,
        fontSize: 11,
      },
      infoRow: {
          flexDirection: 'row',
      },
      highlightFont: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 12.5,
      },
      realHighlightFont: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 12.5,
      },
      rowFontSize: {
        fontSize: 12.5,
      },

      accountImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
    },
  });

export default FundItem;