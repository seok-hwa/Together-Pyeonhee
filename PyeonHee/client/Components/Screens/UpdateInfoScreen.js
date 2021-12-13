import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { JOBS, INCOMES } from './constants';
import RNPickerSelect from 'react-native-picker-select';
import { Root, Popup } from 'react-native-popup-confirm-toast';
import BackButton from '../Buttons/BackButton';
import UpdateUserInfoButton from '../Buttons/UpdateUserInfoButton';
import Icon from 'react-native-vector-icons/Ionicons';
import PasswordCheckButton from '../Buttons/PasswordCheckButton';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
const UpdateInfoScreen = ({navigation, route}) => {
  const [userMonthlyIncome, setUserMonthlyIncome] = useState('250');
  const [userAge, setUserAge] = useState(26);
  const [userJob, setUserJob] = useState('자영업');

  const [userPassword, setUserPassword] = useState('');
  const [userNewPassword, setUserNewPassword] = useState('');
  const [userNewPasswordCheck, setUserNewPasswordCheck] = useState('');

  const [passwordCheckModalVisible, setPasswordCheckModalVisible] = useState(false);
  const [passwordUpdateModalVisible, setPasswordUpdateModalVisible] = useState(false);

  const placeholder = '선택';
  
  useEffect(()=>{

  }, [])
  const checkPassword = () => {
    setPasswordCheckModalVisible(false);
    setPasswordUpdateModalVisible(true);
  }
  const handleSubmitButton = () => {
    if(!userAge){
      Popup.show({
        type: 'success',
        textBody: '나이를 입력해주세요.',
        buttonText: '확인',
        okButtonStyle: {backgroundColor: '#0000CD'},
        iconEnabled: false,
        callback: () => Popup.hide()
      })
      return;
    }
    var ageCheck = /^[0-9]{1,3}$/;
    if(!ageCheck.test(userAge)){
        Popup.show({
          type: 'success',
          textBody: '숫자만 입력가능합니다.',
          buttonText: '확인',
          okButtonStyle: {backgroundColor: '#0000CD'},
          iconEnabled: false,
          callback: () => Popup.hide()
        })
        return;
    }
    if(!userJob){
      Popup.show({
        type: 'success',
        textBody: '직업군을 선택해주세요.',
        buttonText: '확인',
        okButtonStyle: {backgroundColor: '#0000CD'},
        iconEnabled: false,
        callback: () => Popup.hide()
      })
      return;
    }
    if(!userMonthlyIncome){
      Popup.show({
        type: 'success',
        textBody: '월 수입을 선택해주세요.',
        buttonText: '확인',
        okButtonStyle: {backgroundColor: '#0000CD'},
        iconEnabled: false,
        callback: () => Popup.hide()
      })
      return;
    }
    navigation.navigate('Mbti1', {
      userAge: userAge,
      userMonthlyIncome: userMonthlyIncome,
      userJob: userJob,
    });
  }
  return (
    <Root>
    <View style={styles.appSize}>
        <Modal
            animationType="fade"
            transparent={true} // 배경 투명 하게 
            visible={passwordCheckModalVisible}

            onRequestClose={() => {
                setPasswordCheckModalVisible(false);
        }}>
            <View style={styles.modalSize}>
                <View style={styles.modalPasswordCheckBodySize}>
                    <View style={styles.exDiv}>
                        <TouchableOpacity onPress={()=>{setPasswordCheckModalVisible(false)}}>
                            <Icon name="close-outline" size={25}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalTopBar}>
                        <Text>비밀번호 확인</Text>
                    </View>
                    <View style={styles.modalContent}>
                        <View style={styles.passwordInputDiv}>
                            <TextInput 
                            style={styles.passwordInputDesign}
                            maxLength ={20}
                            placeholder='비밀번호 입력'
                            onChangeText={(password) => setUserPassword(password)}
                            />
                        </View>
                        <View>
                            <PasswordCheckButton onPress={checkPassword}/>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
        <Modal
            animationType="fade"
            transparent={true} // 배경 투명 하게 
            visible={passwordUpdateModalVisible}

            onRequestClose={() => {
                setPasswordUpdateModalVisible(false);
        }}>
            <View style={styles.modalSize}>
                <View style={styles.modalPasswordUpdateBodySize}>
                    <View style={styles.exDiv}>
                        <TouchableOpacity onPress={()=>{setPasswordUpdateModalVisible(false)}}>
                            <Icon name="close-outline" size={25}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalTopBar}>
                        <Text>비밀번호 변경</Text>
                    </View>
                    <View style={styles.modalContent}>
                        <View style={styles.passwordInputDiv}>
                            <TextInput 
                            style={styles.passwordInputDesign}
                            maxLength ={20}
                            placeholder='새 비밀번호 입력'
                            onChangeText={(password) => setUserNewPassword(password)}
                            />
                        </View>
                        <View style={styles.passwordInputDiv}>
                            <TextInput 
                            style={styles.passwordInputDesign}
                            maxLength ={20}
                            placeholder='새 비밀번호 입력 확인'
                            onChangeText={(password) => setUserNewPasswordCheck(password)}
                            />
                        </View>
                        <View>
                            <PasswordCheckButton />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

        <View style={styles.appTopBar}>
            <BackButton onPress={()=>{navigation.goBack()}}/>
            <View style={styles.headerDiv}>
            <Text style={styles.topFont}>개인 정보 수정</Text>
            </View>
            <View style={styles.headerRightDiv}></View>
        </View>
        <View style={styles.appBody}>
            <View style={styles.innerTextAlign}>
                <Text style={styles.questText}>ID</Text>
            </View>
            <View style={styles.idDiv}>
                <Text style={styles.idText}>{route.params.userID}</Text>
            </View>
            <View style={styles.innerTextAlign}>
                <Text style={styles.questText}>이름</Text>
            </View>
            <View style={styles.idDiv}>
                <Text style={styles.idText}>{route.params.userName}</Text>
            </View>
            <View style={styles.innerTextAlign}>
                <Text style={styles.questText}>나이</Text>
            </View>
            <View style={styles.textDiv}>
                <TextInput 
                style={styles.textInputDesign}
                maxLength ={3}
                placeholder='숫자만 입력'
                onChangeText={(userAge) => setUserAge(userAge)}
                value={userAge.toString()}
                />
                <Text style={styles.wonText}>세</Text>
            </View>
            <View style={styles.innerTextAlign}>
                <Text style={styles.questText}>직업</Text>
            </View>  
            <View style={styles.pickerDiv}>
                <RNPickerSelect
                placeholder={{
                    label: placeholder,
                    color: 'gray',
                }}
                onValueChange={(value) => setUserJob(value)}
                items={JOBS}
                value={userJob}
                />    
            </View>
            <View style={styles.innerTextAlign}>
                <Text style={styles.questText}>월 수입</Text>
            </View>
            <View style={styles.pickerDiv}>
                <RNPickerSelect
                placeholder={{
                    label: placeholder,
                    color: 'gray',
                }}
                onValueChange={(value) => setUserMonthlyIncome(value)}
                items={INCOMES}
                />
            </View>
        </View>
        <View style={styles.appFooter}>
            <UpdateUserInfoButton />
            <TouchableOpacity style={styles.passwordUpdateDiv} onPress={()=>{setPasswordCheckModalVisible(true)}}>
                <Text>비밀번호 변경</Text>
            </TouchableOpacity>
        </View> 
    </View>
    </Root>
  )
}
const styles = StyleSheet.create({
  appSize: {
    flex: 1,
  },
  appTopBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerDiv: {
      height: 40,
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
  },
  headerRightDiv:{
    width: 30,
  },
  topFont: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  questText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  wonText: {
    fontSize: 15,
    marginTop: 20,
  },
  appBody: {
    flex: 7,
    alignItems: 'center',
    borderColor: 'black',
  },
  innerTextAlign: {
    flexDirection: 'row',
    width: 240,
    marginTop: 20,
  },
  textDiv:{
    flexDirection: 'row',
  },
  textInputDesign: {
    marginTop: 10,
    paddingHorizontal: 10,
    height: 40,
    width: 220,
    borderRadius: 3,
    backgroundColor: '#DCDCDC',
  },
  appFooter: {
    flex: 2,
    alignItems: 'center',
  },
  idDiv:{
    marginTop: 10,
    paddingHorizontal: 10,
    height: 40,
    width: 240,
    borderRadius: 3,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
  },
  idText: {
    fontSize: 17,
  },
  pickerDiv: {
    backgroundColor: '#DCDCDC',
    marginTop: 10,
    paddingHorizontal: 10,
    height: 40,
    width: 240,
    borderRadius: 3,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
  },
  passwordUpdateDiv: {
    marginTop: 5,
  },
  modalSize: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.50)',
    },
    modalPasswordCheckBodySize: {
        width: 270,
        height: 250,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalPasswordUpdateBodySize: {
        width: 270,
        height: 300,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTopBar: {
        height: 30,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent:{
        flex: 10,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    exDiv: {
        alignItems: 'flex-end',
    },
    passwordInputDesign: {
        marginTop: 10,
        paddingHorizontal: 10,
        height: 40,
        width: 180,
        borderRadius: 3,
        backgroundColor: '#DCDCDC',
    },
    passwordInputDiv:{
        marginBottom: 10,
    },
});
export default UpdateInfoScreen;