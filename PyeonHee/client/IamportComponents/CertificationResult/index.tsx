import React from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../NavigationService';
import { Icon, IconButton, List, Text } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ControlledPropUpdatedSelectedItem } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';

type Props = StackScreenProps<RootStackParamList, 'CertificationResult'>;

function CertificationResult({ route, navigation }: Props) {
  const success = route.params?.response.success;
  const imp_uid = route.params?.response.imp_uid;
  const merchant_uid = route.params?.response.merchant_uid;
  const error_msg = route.params?.response.error_msg;
  const name = route.params?.data.name;
  const phone = route.params?.data.phone;
  const carrier = route.params?.data.carrier;
  console.log(name, phone, carrier);
  console.log(route.params);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        borderTopWidth: 1, 
        borderColor: 'gray',
      }}
    >
      {success ? (
        <Icon
          as={FontAwesome}
          name={'check-circle'}
          size={20}
          color={'#52c41a'}
        />
      ) : (
        <Icon as={FontAwesome} name={'warning'} size={20} color={'#f5222d'} />
      )}
      <Text fontSize={25} fontWeight={'bold'} mb={20}>{`본인인증에 ${
        success ? '성공' : '실패'
      }하였습니다`}</Text>
      <List width={'90%'} mb={50} borderRadius={3}>
        <List.Item>
            <Text w={'40%'}>에러메시지</Text>
            <Text w={'60%'}>{error_msg}</Text>
        </List.Item>
      </List>
      <IconButton
        icon={<Icon as={FontAwesome} name={'arrow-left'} size={10} />}
        /* @ts-ignore */
        onPress={() => navigation.navigate('CertificationTest')}
      >
        <Text>처음으로</Text>
      </IconButton>
    </SafeAreaView>
  );
}

export default CertificationResult;