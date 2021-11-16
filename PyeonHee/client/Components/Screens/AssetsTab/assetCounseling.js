import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../config';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';

const url = config.url;
const AssetCounseling = ({navigation}) => {
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
        <View style={styles.dailyText}>
            <Text>Asset Counseling</Text>
        </View>
    )
}

export default AssetCounseling;

const styles = StyleSheet.create({
    dailyText: {
      flex: 1,
      padding: 8,
      textAlign: 'center',
    },
});