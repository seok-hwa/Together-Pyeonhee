import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../config';
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

const testScreen = () => {

    return (
        <WebView
        source={{uri: 'https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=f2126f98-9b2b-4c72-8978-42f5e8bd836c&redirect_uri=https://localhost:8000/Together&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0'}}
        style={{marginTop: 20}}
        />
    )
}

export default testScreen;