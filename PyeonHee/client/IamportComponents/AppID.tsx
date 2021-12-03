import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FindID } from './NavigationFindID';

function AppID() {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <FindID />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

export default AppID;