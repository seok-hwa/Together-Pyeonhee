import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CertificationID from './CertificationID';
import CertificationTestID from './CertificationTestID';
import CertificationResult from './CertificationResult';
import type { IMPData } from 'iamport-react-native';

export interface CertificationParams {
  params: IMPData.CertificationData;
  tierCode?: string;
}

export type RootStackParamList = {
  Home: undefined;
  CertificationID: CertificationParams | undefined;
  CertificationTestID: undefined;
  CertificationResult: any;
  FindIDResult: any;
};

const RootStack = createStackNavigator<RootStackParamList>();

function FindID() {
  return (
      <RootStack.Navigator
        initialRouteName="CertificationTestID"
        // screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen
          options={{ headerShown: false }}
          name="CertificationID"
          component={CertificationID}
        />
        <RootStack.Screen
          options={{
            headerTitle: '아이디 찾기',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'black',
            },
            headerTintColor: '#fff',
            headerBackTitle: ' ',
          }}
          name="CertificationTestID"
          component={CertificationTestID}
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

export { RootStack, FindID };