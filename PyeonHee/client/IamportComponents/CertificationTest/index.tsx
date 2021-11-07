import React, { useState } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type {
  CertificationParams,
  RootStackParamList,
} from '../NavigationService';
import { CARRIERS } from '../constants';
import {
  Button,
  FormControl,
  Input,
  ScrollView,
  Select,
  Stack,
  Text,
} from 'native-base';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from 'styled-system';

type Props = StackScreenProps<RootStackParamList, 'CertificationTest'>;

function CertificationTest({ navigation }: Props) {
  const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`);
  const [company, setCompany] = useState('아임포트');
  const [carrier, setCarrier] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [minAge, setMinAge] = useState('');
  const [tierCode, setTierCode] = useState('');

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', paddingTop: -insets.top, borderTopWidth: 1, borderColor: 'gray',}}
    >
      <ScrollView m={2} backgroundColor={'#fff'}>
        <FormControl p={'5%'} borderRadius={3}>
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              통신사
            </FormControl.Label>
            <Select
              mb={2}
              flex={1}
              borderColor={'transparent'}
              selectedValue={carrier}
              onValueChange={(value) => setCarrier(value)}
            >
              {CARRIERS.map(({ label, value }, index) => {
                return <Select.Item label={label} value={value} key={index} />;
              })}
            </Select>
          </Stack>
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              이름
            </FormControl.Label>
            <Input
              mb={2}
              flex={1}
              value={name}
              onChangeText={(value) => setName(value)}
            />
          </Stack>
          <Stack direction={'row'}>
            <FormControl.Label alignItems={'center'} mb={2} w={'18%'}>
              전화번호
            </FormControl.Label>
            <Input
              mb={2}
              flex={1}
              value={phone}
              keyboardType="number-pad"
              returnKeyType={'done'}
              onChangeText={(value) => setPhone(value)}
            />
          </Stack>
          <Button
            style={{marginTop: 20,}}
            bgColor={'#0000CD'}
            /* @ts-ignore */
            onPress={() => {
                if(carrier === ''){
                    alert('통신사를 선택해주세요.');
                    return;
                }
                if(name === ''){
                    alert('이름을 입력해주세요.');
                    return;
                }
                if(phone === ''){
                    alert('핸드폰 번호를 입력해주세요.');
                    return;
                }
                var phoneCheck = /^[0-9]{11}$/;
                if(!phoneCheck.test(phone)){
                    alert('전화번호를 다시 확인해주세요.');
                    return;
                }
                
              const data: CertificationParams = {
                params: {
                  merchant_uid: merchantUid,
                  company,
                  carrier,
                  name,
                  phone,
                  min_age: minAge,
                },
                tierCode,
              };
              navigation.navigate('Certification', data);
            }}
          >
            <Text fontWeight={'bold'} color={'#fff'}>
              본인인증 하기
            </Text>
          </Button>
        </FormControl>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CertificationTest;