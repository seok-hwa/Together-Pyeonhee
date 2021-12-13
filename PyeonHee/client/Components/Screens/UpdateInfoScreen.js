import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { JOBS, INCOMES } from './constants';
import RNPickerSelect from 'react-native-picker-select';
import BackButton from '../Buttons/BackButton';
import UpdateUserInfoButton from '../Buttons/UpdateUserInfoButton';
import Icon from 'react-native-vector-icons/Ionicons';
import PasswordCheckButton from '../Buttons/PasswordCheckButton';
import PasswordUpdateButton from '../Buttons/PasswordUpdateButton';
import { passwordCheckApi, updateUserInfoApi, passwordUpdateApi} from '../api';
import Loading from '../Screens/Loading';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';

const UpdateInfoScreen = ({navigation, route}) => {
  const [userAge, setUserAge] = useState(route.params.userAge);
  const [userJob, setUserJob] = useState(route.params.userJob);

  const [userPassword, setUserPassword] = useState('');
  const [userNewPassword, setUserNewPassword] = useState('');
  const [userNewPasswordCheck, setUserNewPasswordCheck] = useState('');

  const [passwordCheckModalVisible, setPasswordCheckModalVisible] = useState(false);
  const [passwordUpdateModalVisible, setPasswordUpdateModalVisible] = useState(false);

  const placeholder = '선택';

  const handleInfo = () => {
    if(!userAge){
        alert('나이를 입력해주세요.');
      return;
    }
    if(!userJob){
        alert('직업군을 선택해주세요.');
      return;
    }

    updateUserInfoApi(route.params.userID, userAge, userJob)
    .then((responseJson)=>{
        console.log(responseJson);
        if(responseJson.status === 'success'){
            alert('수정 완료');
        }else{
            alert('수정 실패');
        }
    })
  }

  const handlePasswordCheck = () => {
    passwordCheckApi(route.params.userID, userPassword)
    .then((responseJson)=>{
        console.log(responseJson);
        if(responseJson.status === 'success'){
            setPasswordCheckModalVisible(false);
            setPasswordUpdateModalVisible(true);
        }
        else{
            alert('비밀번호가 일치하지 않습니다.');
        }
    })
  }

  const handlePasswordUpdate = () =>{
    if(!userNewPassword){
        alert('비밀번호를 입력해주세요.')
        return;
    }
    var pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if(!pwCheck.test(userNewPassword)){
        alert('비밀번호는 8~25자의 영문자, 숫자, 특수문자의\n조합으로 입력해야 합니다.')
        return;
    }
    if(!userNewPasswordCheck){
        alert('비밀번호 확인을 입력해주세요.');
        return;
    }
    if(userNewPassword != userNewPasswordCheck){
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }
    passwordUpdateApi(route.params.userID, userNewPassword, userNewPasswordCheck)
    .then((responseJson)=>{
        console.log(responseJson);
        if(responseJson.status === 'success'){
            alert('비밀번호 변경 완료');
            setPasswordUpdateModalVisible(false);
        }
        else{
            alert('비밀번호 변경 실패')
        }
    })

  }

  return (
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
                        <View style={styles.passwordRow}>
                            <Text>현재 비밀번호</Text>
                        </View>
                        <View style={styles.passwordInputDiv}>
                            <TextInput 
                            secureTextEntry={true}
                            style={styles.passwordInputDesign}
                            maxLength ={20}
                            placeholder='비밀번호 입력'
                            onChangeText={(password) => setUserPassword(password)}
                            />
                        </View>
                        <View>
                            <PasswordCheckButton onPress={handlePasswordCheck}/>
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
                        <View style={styles.passwordRow}>
                            <Text>새 비밀번호</Text>
                        </View>
                        <View style={styles.passwordInputDiv}>
                            <TextInput 
                            secureTextEntry={true}
                            style={styles.passwordInputDesign}
                            maxLength ={25}
                            placeholder='8~25자 영문자, 숫자, 특수문자 조합'
                            onChangeText={(password) => setUserNewPassword(password)}
                            />
                        </View>
                        <View style={styles.passwordRow}>
                            <Text>새 비밀번호 확인</Text>
                        </View>
                        <View style={styles.passwordInputDiv}>
                            <TextInput 
                            secureTextEntry={true}
                            style={styles.passwordInputDesign}
                            maxLength ={25}
                            placeholder='새 비밀번호 입력 확인'
                            onChangeText={(password) => setUserNewPasswordCheck(password)}
                            />
                        </View>
                        <View>
                            <PasswordUpdateButton onPress={handlePasswordUpdate}/>
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
                label: '선택',
                color: 'gray',
                }}
                onValueChange={(userJob) => setUserJob(userJob)}
                items={JOBS}
                value={userJob}
                />    
            </View>
        </View>
        <View style={styles.appFooter}>
            <UpdateUserInfoButton onPress={handleInfo}/>
            <TouchableOpacity style={styles.passwordUpdateDiv} onPress={()=>{setPasswordCheckModalVisible(true)}}>
                <Text>비밀번호 변경</Text>
            </TouchableOpacity>
        </View> 
    </View>
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
    flex: 3,
    alignItems: 'center',
    borderColor: 'black',
  },
  innerTextAlign: {
    flexDirection: 'row',
    width: 240,
    marginTop: 30,
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
    flex: 1,
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
        width: 300,
        height: 250,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalPasswordUpdateBodySize: {
        width: 300,
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
        width: 250,
        borderRadius: 3,
        backgroundColor: '#DCDCDC',
    },
    passwordInputDiv:{
        marginBottom: 10,
    },
    passwordRow: {
        width: 250,
        alignItems: 'flex-start',
    }
});
export default UpdateInfoScreen;