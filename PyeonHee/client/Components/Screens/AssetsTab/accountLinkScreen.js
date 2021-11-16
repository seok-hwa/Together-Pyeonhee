import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../config';
import { WebView } from 'react-native-webview';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    Button,
    TouchableOpacity,
    TextInput,
} from 'react-native';

const url = config.url;
const accountLinkScreen = ({navigation}) => {
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Assets: {userID}</Text>
            <Button title="오픈뱅킹 테스트" onPress={()=>navigation.navigate('test')}></Button>
        </View>
    )
}

export default accountLinkScreen;

const styles = StyleSheet.create({
});