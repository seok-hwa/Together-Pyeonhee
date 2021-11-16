import React, { useEffect, useState, Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../config';
import { WebView } from 'react-native-webview';
import {
    SafeAreaView,
} from 'react-native';
import Loading from './Loading';

const url = config.url;
const openBankingURL = encodeURI(config.openBankingURL);

class testScreen extends Component {
  
  render() {
    function authProgress(data) {
        // access code는 url에 붙어 장황하게 날아온다.
        // substringd으로 url에서 code=뒤를 substring하면 된다.
        const exp = "code=";
        var condition = data.indexOf(exp);
        if (condition != -1) {
          var request_code = data.substring(condition + exp.length);
          // console.log("access code :: " + request_code);
          // 토큰값 받기
          requestToken(request_code);
        }
    }  
    return (
      <WebView
        source={{ uri: openBankingURL }}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
        originWhitelist={['*']}
        scalesPageToFit={false}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onMessage={(event) => { authProgress(event.nativeEvent["url"]); }}
      />
    );
  }
}

export default testScreen