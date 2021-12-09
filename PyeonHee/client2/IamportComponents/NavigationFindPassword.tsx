import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CertificationPassword from './CertificationPassword';
import CertificationTestPassword from './CertificationTestPassword';
import CertificationResult from './CertificationResult';
import type { IMPData } from 'iamport-react-native';

export interface CertificationParams {
  params: IMPData.CertificationData;
  tierCode?: string;
}

export type RootStackParamList = {
  Home: undefined;
  CertificationPassword: CertificationParams | undefined;
  CertificationTestPassword: undefined;
  CertificationResult: any;
  FindPasswordResult: any;
};

const RootStack = createStackNavigator<RootStackParamList>();

function FindPassword() {
  return (
      <RootStack.Navigator
        initialRouteName="CertificationTestPassword"
        // screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen
          options={{ headerShown: false }}
          name="CertificationPassword"
          component={CertificationPassword}
        />
        <RootStack.Screen
          options={{
            headerTitle: '비밀번호 찾기',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'black',
            },
            headerTintColor: '#fff',
            headerBackTitle: ' ',
          }}
          name="CertificationTestPassword"
          component={CertificationTestPassword}
        />
        <RootStack.Screen
          options={{
            headerTitle: '본인인증 실패',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'black',
            },
            headerLeft: () => null,
          }}
          name="CertificationResult"
          component={CertificationResult}
        />
      </RootStack.Navigator>
  );
}

export { RootStack, FindPassword };