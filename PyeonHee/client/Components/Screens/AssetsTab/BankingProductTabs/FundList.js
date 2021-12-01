import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../../config';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

const url = config.url;
const FundProduct = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [check, setCheck] = useState(false);

    useEffect(()=>{
        AsyncStorage.getItem('userID', (err, result) => {
            const tempID = result;
            if(tempID!= null){
                setUserID(tempID);
            }
        })
    })

    const checkHandler = () => {
        setCheck(!check);
    }

    return (
        <View style={styles.appSize}>
            <View style={styles.wrapper}>
                    <CheckBox value={check} onChange={checkHandler} />
                    <Text style={styles.text}>
                        나에게 맞는 펀드 찾기
                    </Text>
            </View>
            <TouchableOpacity style={styles.container}>
            <View style={styles.itemContainer}>
                <View style={styles.item1}>
                    <Text style={styles.fundNameFont}>브이아이 중소형주플러스 증권자투자신탁1호</Text>
                    <Text style={styles.fundBankFont}>브이아이자산운용</Text>
                </View>
                <View style={styles.item2}>
                    <View style={styles.infoRow}> 
                        <Text style={styles.rowFontSize}>3개월 수익률: </Text>
                        <Text style={styles.highlightFont}>17%</Text>
                    </View>
                    <View style={styles.infoRow}> 
                        <Text style={styles.rowFontSize}>6개월 수익률: </Text>
                        <Text style={styles.highlightFont}>24%</Text>
                    </View>
                    <View style={styles.infoRow}> 
                        <Text style={styles.rowFontSize}>1년 수익률: </Text>
                        <Text style={styles.highlightFont}>49%</Text>
                    </View>
                    <View style={styles.infoRow}> 
                        <Text style={styles.rowFontSize}>합성총보수비용(연): </Text>
                        <Text style={styles.highlightFont}>1.5%</Text>
                    </View>
                    <View style={styles.infoRow}> 
                        <Text style={styles.rowFontSize}>선취판매 수수료: </Text>
                        <Text style={styles.highlightFont}>1%</Text>
                    </View>
                    <View style={styles.infoRow}> 
                        <Text style={styles.rowFontSize}>펀드 규모: </Text>
                        <Text style={styles.realHighlightFont}>22억</Text>
                    </View>
                </View>
                <View style={styles.nextCotainer}>
                    <Text style={styles.nextText}> {'>'} </Text>
                </View>
            </View>
        </TouchableOpacity>
        </View>
    )
}

export default FundProduct;

const styles = StyleSheet.create({
    appSize: {
      flex: 1,
    },
    container: {
        height: 140,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
      },
      itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 140,
      },
      item1: {
        width: 160,
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
        fontSize: 13,
      },
      fundBankFont: {
        marginTop: 5,
        fontSize: 12,
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

      wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        paddingVertical: 5,
    },
    text: {
        lineHeight: 30,
        marginLeft: 10,
    },
});