/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './Components/Screens/MainScreen';
import LoginScreen from './Components/Screens/LoginScreen';
import JoinScreen from './Components/Screens/JoinScreen';
import SurveyScreen from './Components/Screens/SurveyScreen';
import Iamport from './IamportComponents/App';
import IamportID from './IamportComponents/AppID';
import IamportPassword from './IamportComponents/AppPassword';
import AsyncStorage from '@react-native-community/async-storage';
import BudgetInfoScreen from './Components/Screens/RecommendedPlanningScreen';
import WriteBudgetScreen from './Components/Screens/BudgetTabs/WriteBudgetScreen'; //for budget writing test
import BudgetScreen from './Components/Screens/BudgetScreen';
import AccountLinkScreen from './Components/Screens/AccountLinkScreen';
import SetCategoryScreen from './Components/Screens/SetCategoryScreen'
import SelectedAccountScreen from './Components/Screens/SelectedAccountScreen';
import MonthReportScreen from './Components/Screens/MonthReport/MonthReportScreen';
import PushNotification from 'react-native-push-notification';
import ItemLink from './Components/Screens/AssetsTab/BankingProductTabs/ItemLink';
import NoticeList from './Components/Screens/Notice/NoticeList';
import ServiceCenter from './Components/Screens/ServiceCenter/QueryList';
import NoticeBoard from './Components/Screens/Notice/NoticeBoard';
import QueryBoard from './Components/Screens/ServiceCenter/QueryBoard';
import QueryWrite from './Components/Screens/ServiceCenter/QueryWrtie';
import FindIDResult from './Components/Screens/Find/FindIDResult';
import FindPasswordResult from './Components/Screens/Find/FindPasswordResult';
import FinancialCounselorDetail from './Components/Screens/AssetsTab/CounselingTab/FinancialConsultDetail';

import messaging from '@react-native-firebase/messaging';

import config from './config';

 
import {
   View,
   StyleSheet,
   Text,
 } from 'react-native';

 const Stack = createNativeStackNavigator();
 const url = config.url; //로컬서버 접속 url
 
 function App(){         //navigation
   const [userID, setUserID] = useState('');
   const [loading, setLoading] = useState(false);
   const [hasMbti, setHasMbti] = useState(false);

  const foregroundListener = () => {
    //foreground 메시지 받기
    messaging().onMessage(async message => {
      console.log('Message handled in the foreground!', message);
      PushNotification.createChannel(
        {
          channelId: "com.pyeonhee",
          channelName: "com.pyeonhee",
          channelDescription: "편히가계 푸쉬알림",
          playSound: false,
          soundName: "default",
          vibrate: true,
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
      console.log('푸쉬알림 이벤트');
      PushNotification.localNotification({
        channelId: "com.pyeonhee",
        title: message.notification.title,
        message: message.notification.body,
        ignoreInForeground: false,
      });
    })
  }

   useEffect(()=>{
      foregroundListener();
      let tempID='';
      AsyncStorage.getItem("userID")
      .then(
          (value) => {
              if (value !== null){
                  tempID=value
                  setUserID(tempID);
              }
          }
      )
      .then(()=>{
        /*
        if(tempID != ''){
          fetch(`${url}/getMbti?userID=${tempID}`)   //get
          .then((response)=>response.json())
          .then((responseJson)=>{
            if(responseJson.hasMbti === 'true'){
              setHasMbti(true);
            }else{
              setHasMbti(false);
            }
          })
          .then(()=>{
            setLoading(true);
          })
        }else{
          setLoading(true);
        }*/

        //테스트
        setHasMbti(true);
        setLoading(true);
      })
   }, []);
   
   if(loading === false){
     return(
       <View style={styles.appSize}>
       </View>
     );
   }
   else if(userID === '' && loading === true){
     return(
       <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen
             name="Login"
             component={LoginScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="Survey"
             component={SurveyScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="Main"
             component={MainScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="Iamport"
             component={Iamport}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="IamportID"
             component={IamportID}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="IamportPassword"
             component={IamportPassword}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="Join"
             component={JoinScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen    //for Budget Writing test
             name="WriteBudget"
             component={WriteBudgetScreen}
             options={{
               headerShown: false,
           }} 
           />
          <Stack.Screen
            name="MyBudget"
            component={BudgetScreen}
            options={{
              headerShown: false,
          }} 
          />
           <Stack.Screen     //for BudgetDetail test
             name="BudgetDetail"
             component={BudgetInfoScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="accountLink"
             component={AccountLinkScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="SetCategory"
             component={SetCategoryScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="SelectedAccount"
             component={SelectedAccountScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="MonthReport"
             component={MonthReportScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="ItemLink"
             component={ItemLink}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="NoticeList"
             component={NoticeList}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="ServiceCenter"
             component={ServiceCenter}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="NoticeBoard"
             component={NoticeBoard}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="QueryBoard"
             component={QueryBoard}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="QueryWrite"
             component={QueryWrite}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="FindIDResult"
             component={FindIDResult}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="FindPasswordResult"
             component={FindPasswordResult}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="FinancialCounselorDetail"
             component={FinancialCounselorDetail}
             options={{
               headerShown: false,
           }} 
           />
         </Stack.Navigator>
       </NavigationContainer>
     ); 
   }else if(userID != '' && hasMbti === true && loading === true){
     return(
       <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen
             name="Main"
             component={MainScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="Login"
             component={LoginScreen}
             options={{
               headerShown: false,
           }} 
           />
            <Stack.Screen
             name="Survey"
             component={SurveyScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="Iamport"
             component={Iamport}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="IamportID"
             component={IamportID}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="IamportPassword"
             component={IamportPassword}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="Join"
             component={JoinScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen    //for Budget Writing test
             name="WriteBudget"
             component={WriteBudgetScreen}
             options={{
               headerShown: false,
           }} 
           />
          <Stack.Screen
            name="MyBudget"
            component={BudgetScreen}
            options={{
              headerShown: false,
          }} 
          />
           <Stack.Screen     //for BudgetDetail test
             name="BudgetDetail"
             component={BudgetInfoScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="accountLink"
             component={AccountLinkScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="SetCategory"
             component={SetCategoryScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="SelectedAccount"
             component={SelectedAccountScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="MonthReport"
             component={MonthReportScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="ItemLink"
             component={ItemLink}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="NoticeList"
             component={NoticeList}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="ServiceCenter"
             component={ServiceCenter}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="NoticeBoard"
             component={NoticeBoard}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="QueryBoard"
             component={QueryBoard}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="QueryWrite"
             component={QueryWrite}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="FindIDResult"
             component={FindIDResult}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="FindPasswordResult"
             component={FindPasswordResult}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="FinancialCounselorDetail"
             component={FinancialCounselorDetail}
             options={{
               headerShown: false,
           }} 
           />
         </Stack.Navigator>
       </NavigationContainer>
     );
   }else if(userID != '' && hasMbti === false && loading === true){
    return(
      <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen
             name="Survey"
             component={SurveyScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="Main"
             component={MainScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="Login"
             component={LoginScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="Iamport"
             component={Iamport}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="IamportID"
             component={IamportID}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="IamportPassword"
             component={IamportPassword}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="Join"
             component={JoinScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen    //for Budget Writing test
             name="WriteBudget"
             component={WriteBudgetScreen}
             options={{
               headerShown: false,
           }} 
           />
          <Stack.Screen
            name="MyBudget"
            component={BudgetScreen}
            options={{
              headerShown: false,
          }} 
          />
           <Stack.Screen     //for BudgetDetail test
             name="BudgetDetail"
             component={BudgetInfoScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="accountLink"
             component={AccountLinkScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="SetCategory"
             component={SetCategoryScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="SelectedAccount"
             component={SelectedAccountScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="MonthReport"
             component={MonthReportScreen}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="ItemLink"
             component={ItemLink}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="NoticeList"
             component={NoticeList}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="ServiceCenter"
             component={ServiceCenter}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="NoticeBoard"
             component={NoticeBoard}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="QueryBoard"
             component={QueryBoard}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="QueryWrite"
             component={QueryWrite}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="FindIDResult"
             component={FindIDResult}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="FindPasswordResult"
             component={FindPasswordResult}
             options={{
               headerShown: false,
           }} 
           />
           <Stack.Screen
             name="FinancialCounselorDetail"
             component={FinancialCounselorDetail}
             options={{
               headerShown: false,
           }} 
           />
         </Stack.Navigator>
       </NavigationContainer>
    )
  }
 }
 const styles = StyleSheet.create({
  appSize: {
      flex: 1,
  },
});
 export default App;