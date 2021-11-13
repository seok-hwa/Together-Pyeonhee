import React, { Component, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
const EctScreen = ({navigation}) => {
    const [userID, setUserID] = useState('');
    useEffect(()=>{
      AsyncStorage.getItem('userID', (err, result) => {
        const tempID = result;
        if(tempID!= null){
          setUserID(tempID);
        }
      });
    })
    return (
        <View style={styles.appSize}>
            <View style={styles.tempDiv}>
                <Text style={styles.tempTitle}>메뉴</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('MyPage')}>
                    <Text style={styles.tempBoard}>마이페이지</Text>
                </TouchableOpacity>
            </View>
        </View>
      )
}
const styles = StyleSheet.create({
    appSize: {
        flex: 1,
    },
    tempTitle:{
            margin: 10,
            fontWeight: '900',
            fontSize: 15,
            color: 'black',
    },
    tempBoard: {
        fontSize: 15,
        margin: 10,
    },
    tempDiv: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 120,
        backgroundColor: 'white',
    },
})
export default EctScreen;