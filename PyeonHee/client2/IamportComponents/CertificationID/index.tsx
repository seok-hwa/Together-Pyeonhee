import React from 'react';
import IMP from 'iamport-react-native';
import type { RootStackParamList } from '../NavigationFindID';
import type { StackScreenProps } from '@react-navigation/stack';
import { getUserCode } from '../utils';
import Loading from '../Loading';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = StackScreenProps<RootStackParamList, 'CertificationID'>;

function CertificationID({ route, navigation }: Props) {
  const params = route.params?.params;
  const tierCode = route.params?.tierCode;
  const userCode = getUserCode('danal', tierCode, 'certification');
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <IMP.Certification
        userCode={userCode}
        tierCode={tierCode}
        data={params}
        loading={<Loading />}
        callback={(response) => {
            if (response.success === false){
          navigation.replace('CertificationResult', {
              data: params,
              response: response,
          })
        }
        else{
            navigation.replace('FindIDResult', {
                data: params,
                response: response,
            })
        }
        }
        }
      />
    </SafeAreaView>
  );
}

export default CertificationID;