import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FindPassword } from './NavigationFindPassword';

function AppPassword() {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <FindPassword />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

export default AppPassword;