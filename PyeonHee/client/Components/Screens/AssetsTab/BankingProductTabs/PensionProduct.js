import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../../config';
import { SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

const url = config.url;
const PensionProduct = ({navigation}) => {
    const [userID, setUserID] = useState('');

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
            <TouchableOpacity style={styles.container}>
            <View style={styles.itemContainer}>
                <View style={styles.item1}>
                    <Text style={styles.fundNameFont}>연금저축신탁 안정형</Text>
                    <Text style={styles.fundBankFont}>신한은행</Text>
                </View>
                <View style={styles.item2}>
                    <Text>유형: 안정형</Text>
                    <View style={styles.infoRow}> 
                        <Text>중도해지가능여부 : </Text>
                        <Text style={styles.highlightFont}>가능</Text>
                    </View>
                    <View style={styles.infoRow}> 
                        <Text>수익률: </Text>
                        <Text style={styles.highlightFont}>1.13%</Text>
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

export default PensionProduct;

const styles = StyleSheet.create({
    appSize: {
        flex: 1,
      },
      container: {
          height: 100,
          backgroundColor: 'white',
          margin: 10,
          borderRadius: 10,
        },
        itemContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 100,
        },
        item1: {
          width: 150,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRightWidth: 1,
          borderRightColor: 'gray',
        },
        item2: {
        marginRight: 20,
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
        },
        fundBankFont: {
          fontSize: 12,
        },
        infoRow: {
            flexDirection: 'row',
        },
        highlightFont: {
          color: 'blue',
          fontWeight: 'bold',
        },
});