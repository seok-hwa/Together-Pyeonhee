import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Certification from './Certification';
import CertificationTest from './CertificationTest';
import CertificationResult from './CertificationResult';
import type { IMPData } from 'iamport-react-native';

export interface CertificationParams {
  params: IMPData.CertificationData;
  tierCode?: string;
}

export type RootStackParamList = {
  Home: undefined;
  Certification: CertificationParams | undefined;
  CertificationTest: undefined;
  CertificationResult: any;
  Join: any;
};

const RootStack = createStackNavigator<RootStackParamList>();

function IamportNavigation() {
  return (
      <RootStack.Navigator
        initialRouteName="CertificationTest"
        // screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Certification"
          component={Certification}
        />
        <RootStack.Screen
          options={{
            headerTitle: '회원가입',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'black',
            },
            headerTintColor: '#fff',
            headerBackTitle: ' ',
          }}
          name="CertificationTest"
          component={CertificationTest}
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

export { RootStack, IamportNavigation };