import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../../config';
import { SafeAreaView, StyleSheet, Text, View, Button, Image, ScrollView, Modal, TextInput,} from 'react-native';
import UpdateAccountButton from '../../../Buttons/UpdateAliasButton';
import { Root, Popup } from 'react-native-popup-confirm-toast';
import TransactionItemInAccount from '../../TransactionItemInAccount';
import SubmitAliasButton from '../../../Buttons/SubmitAliasButton';
import BackButton from '../../../Buttons/BackButton';
const url = config.url;
const AccountLogo = (props) => {
    const accountCate = props.accountCate;
    if(accountCate === 'NH농협은행'){
        return(
            <Image source={require('./assets/accounts/nonghyeob.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '부산은행'){
        return(
            <Image source={require('./assets/accounts/busan.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '씨티은행'){
        return(
            <Image source={require('./assets/accounts/citi.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '대구은행'){
        return(
            <Image source={require('./assets/accounts/daegu.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '광주은행'){
        return(
            <Image source={require('./assets/accounts/gwangju.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '하나은행'){
        return(
            <Image source={require('./assets/accounts/hana.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'IBK기업은행'){
        return(
            <Image source={require('./assets/accounts/ibk.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SC제일은행'){
        return(
            <Image source={require('./assets/accounts/sc.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '제주은행'){
        return(
            <Image source={require('./assets/accounts/jeju.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SBI저축은행'){
        return(
            <Image source={require('./assets/accounts/sbi.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'KB국민은행'){
        return(
            <Image source={require('./assets/accounts/kb.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'Kbank'){
        return(
            <Image source={require('./assets/accounts/kbank.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'KDB'){
        return(
            <Image source={require('./assets/accounts/kdb.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '카카오뱅크'){
        return(
            <Image source={require('./assets/accounts/kakao.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '새마을금고'){
        return(
            <Image source={require('./assets/accounts/mg.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SJ산림은행'){
        return(
            <Image source={require('./assets/accounts/sj.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === 'SBI저축은행'){
        return(
            <Image source={require('./assets/accounts/sbi.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '신한은행'){
        return(
            <Image source={require('./assets/accounts/shinhan.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '신협은행'){
        return(
            <Image source={require('./assets/accounts/sinhyeob.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '수협은행'){
        return(
            <Image source={require('./assets/accounts/suhyeob.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '토스'){
        return(
            <Image source={require('./assets/accounts/toss.png')} style={styles.accountImage}/>
        )
    }else if(accountCate === '우체국'){
        return(
            <Image source={require('./assets/accounts/uche.png')} style={styles.accountImage}/>
        )
    }
    else if(accountCate === '우리은행'){
        return(
            <Image source={require('./assets/accounts/uri.png')} style={styles.accountImage}/>
        )
    }
    else if(accountCate === '오픈은행'){
        return(
            <Image source={require('./assets/accounts/open.png')} style={styles.accountImage}/>
        )
    }
    else{
          return(
              <View style={styles.accountImage} />
          )
      }
  }

const SelectedAccountScreen = ({navigation, route}) => {
    const [userID, setUserID] = useState('');
    //route.params.tranID  거래 아이디 
    const [accountHistory, setAccountHistory] = useState('');
    const [loadging, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [accountAlias, setAccountAlias] = useState('');
    const [tempAccountAlias, setTempAccountAlias] = useState('');

    const handleSubmitButton = () => {
        if(!tempAccountAlias){
            setModalVisible(false);
            Popup.show({
                type: 'success',
                textBody: '별명을 입력해주세요.',
                buttonText: '확인',
                okButtonStyle: {backgroundColor: '#0000CD'},
                iconEnabled: false,
                callback: () => Popup.hide()
              })
          return;
        }
        if(tempAccountAlias === accountAlias){
            setModalVisible(false);
            Popup.show({
                type: 'success',
                textBody: '기존의 계좌 별명과 같습니다.',
                buttonText: '확인',
                okButtonStyle: {backgroundColor: '#0000CD'},
                iconEnabled: false,
                callback: () => Popup.hide()
              })
          return;
        }
        
        fetch(`${url}/update_info`, {
          method: 'POST',
          body: JSON.stringify({
              userID: userID,
              fintech_use_num: route.params.fintech_use_num,
              newAlias: tempAccountAlias,
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json',
          },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
          console.log(responseJson);
          if(responseJson.status === 'success'){
            setAccountAlias(tempAccountAlias);
            setModalVisible(false);
            Popup.show({
                type: 'success',
                textBody: '변경이 완료 되었습니다.',
                buttonText: '확인',
                okButtonStyle: {backgroundColor: '#0000CD'},
                iconEnabled: false,
                callback: () => Popup.hide()
            })
            //console.log(userID, userPassword, '계좌 별명 변경 완료');
              console.log(userID, '계좌 별명 변경 완료');
          }else{
            setModalVisible(false);
            alert('계좌 별명 변경 실패')
            console.log('fail to update.');
          }
        })
        .catch((error)=>{
          console.error(error);
        })
    }

    useEffect(()=>{
        let tempID;

        AsyncStorage.getItem('userID', (err, result) => {
            tempID = result;
            if(tempID!= null){
                setUserID(tempID);
            }
        })
        .then(()=>{
            setAccountAlias(route.params.accountAlias);
            console.log(`${url}/selectedAccountHistory`);
            
            fetch(`${url}/selectedAccountHistory`, {
                method: 'POST',
                body: JSON.stringify({
                    userID: tempID,
                    fintech_use_num: route.params.fintech_use_num,
                }),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type':'application/json',
                },
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log(responseJson);
                setAccountHistory(responseJson);
                
            })
            .then(()=>{
                setLoading(true);
            })
            
        })
    }, [])

    if(loadging === true){
    return (
        <Root>
        <View style={styles.appSize}>
            <Modal
                    animationType="slide"
                    transparent={true} // 배경 투명 하게 
                    visible={modalVisible}

                    onRequestClose={() => {
                        setModalVisible(false);
            }}>
                <View style={styles.modalSize}>
                    <View style={styles.modalBodySize}>
                        <View style={styles.modalTopBar}>
                            <Text style={styles.modalTitle}>계좌 별명 변경</Text>
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={{fontSize: 16, fontWeight: 'bold',}}> 계좌 별명</Text>
                            <TextInput
                                style={styles.textInputDesign}
                                placeholder={accountAlias}
                                onChangeText={(tempAccountAlias) => setTempAccountAlias(tempAccountAlias)}
                                maxLength ={20}
                            />
                        </View>
                        <View style={styles.modalBottom}>
                            <SubmitAliasButton onPress={handleSubmitButton}/>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.appTopBar}>
                <BackButton onPress={()=>{navigation.goBack()}}/>
                <View style={styles.headerDiv}>
                  <Text style={styles.topFont}>계좌 정보</Text>
                </View>
                <View style={styles.headerRightDiv}></View>
            </View>
            <View style={styles.appInnerSize}>
            <View style={styles.appTopDiv}>
                <View style={styles.appTopLeftDiv}>
                    <AccountLogo accountCate={route.params.accountCate}/>
                    <Text style={{fontSize: 12,}}>{route.params.accountCate}</Text>
                    <Text style={styles.aliasFont}>{accountAlias}</Text>
                </View>
                <View style={styles.appTopRightDiv}>
                    <View style={styles.appTopRightTop}>
                        <UpdateAccountButton onPress={()=>{setModalVisible(true)}}/>
                    </View>
                    <View style={styles.appTopRightBottom}>
                        <Text style={styles.aliasFont}>계좌 번호: {route.params.accountNum}</Text>
                        {
                            accountHistory.length === 0 ?
                            <Text style={styles.aliasFont}>계좌 잔액: 0원</Text>:
                            <Text style={styles.aliasFont}>계좌 잔액: {accountHistory[0].after_balance_amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        }
                    </View>
                </View>
            </View>
            <View style={{flex: 4,}}>
            <Text style={styles.titleFont}>거래 내역</Text>
            <View style={styles.latestTranBox}>
                <View style={styles.graphTitle}>
                    <View style={styles.OrganizationNameDiv}><Text style={styles.graphFont}>상호명</Text></View>
                    <View style={styles.tranDate}><Text style={styles.graphFont}>거래일자</Text></View>
                    <View style={styles.tranPrice}><Text style={styles.graphFont}>거래금액</Text></View>
                    <View style={styles.tranCate}><Text style={styles.graphFont}>종류</Text></View>
                </View>
                <ScrollView style={{flex: 1,}}>
                    {
                        accountHistory.length === 0 ?
                        <View style={{alignItems: 'center', marginTop: 10,}}>
                        <Text>거래 내역이 없습니다.</Text>
                        </View> :
                        accountHistory.map((item, index) => {
                        return <TransactionItemInAccount key={index} bankName={item.bank_name} branchName={item.branch_name} tranDate={item.tran_date} 
                        tranPrice={item.tran_amt} tranTime={item.tran_time} tranCate={item.tran_type} tranID={item.tranID}
                        inoutType={item.inout_type} fintech={item.fintech_use_num} organizationName={item.print_content}
                        />})
                    }
                </ScrollView>
            </View>
            </View>
        </View>
        </View>
        </Root>
    )
                }
    else{
        return(
            <Root>
        <View style={styles.appSize}>
            <Modal
                    animationType="slide"
                    transparent={true} // 배경 투명 하게 
                    visible={modalVisible}

                    onRequestClose={() => {
                        setModalVisible(false);
            }}>
                <View style={styles.modalSize}>
                    <View style={styles.modalBodySize}>
                        <View style={styles.modalTopBar}>
                            <Text style={styles.modalTitle}>계좌 별명 변경</Text>
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={{fontSize: 16, fontWeight: 'bold',}}> 계좌 별명</Text>
                            <TextInput
                                style={styles.textInputDesign}
                                placeholder={accountAlias}
                                onChangeText={(tempAccountAlias) => setTempAccountAlias(tempAccountAlias)}
                                maxLength ={20}
                            />
                        </View>
                        <View style={styles.modalBottom}>
                            <SubmitAliasButton onPress={handleSubmitButton}/>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.appTopBar}>
                <BackButton onPress={()=>{navigation.goBack()}}/>
                <View style={styles.headerDiv}>
                  <Text style={styles.topFont}>계좌 정보</Text>
                </View>
                <View style={styles.headerRightDiv}></View>
            </View>
            <View style={styles.appInnerSize}>
            <View style={styles.appTopDiv}>
                <View style={styles.appTopLeftDiv}>
                    <AccountLogo accountCate={route.params.accountCate}/>
                    <Text style={{fontSize: 12,}}>{route.params.accountCate}</Text>
                    <Text style={styles.aliasFont}>{accountAlias}</Text>
                </View>
                <View style={styles.appTopRightDiv}>
                    <View style={styles.appTopRightTop}>
                        <UpdateAccountButton onPress={()=>{setModalVisible(true)}}/>
                    </View>
                    <View style={styles.appTopRightBottom}>
                        <Text style={styles.aliasFont}>계좌 번호: {route.params.accountNum}</Text>
                        <Text style={styles.aliasFont}>계좌 잔액: {route.params.accountBalance}원</Text>
                    </View>
                </View>
            </View>
            <View style={{flex: 4,}}>
            <Text style={styles.titleFont}>거래 내역</Text>
            <View style={styles.latestTranBox}>
                <View style={styles.graphTitle}>
                    <View style={styles.OrganizationNameDiv}><Text style={styles.graphFont}>상호명</Text></View>
                    <View style={styles.tranDate}><Text style={styles.graphFont}>거래일자</Text></View>
                    <View style={styles.tranPrice}><Text style={styles.graphFont}>거래금액</Text></View>
                    <View style={styles.tranCate}><Text style={styles.graphFont}>종류</Text></View>
                </View>
                <ScrollView style={{flex: 1,}}>
                </ScrollView>
            </View>
            </View>
        </View>
        </View>
        </Root>
        )
    }
}

export default SelectedAccountScreen;

const styles = StyleSheet.create({
    appSize: {
      flex: 1,
    },
    appInnerSize: {
        flex: 1,
        padding: 10,
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

    appTopDiv:{
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
    },
    appTopLeftDiv:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: 'gray',
    },
    appTopRightDiv:{
        flex: 2,
        flexDirection: 'column',
    },
    appTopRightTop: {
        flex: 1,
        flexDirection: 'row-reverse',
        padding: 5,
    },
    appTopRightBottom:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    titleFont: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 5,
    },
    latestTranBox: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    graphTitle:{
        height: 25,
        backgroundColor: '#203864',
        flexDirection: 'row',
        borderColor: 'gray',
    },
    BankNameDiv: {
        width: 65,
        alignContent: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
    },
    OrganizationNameDiv: {
        flex: 2.5,
        alignContent: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
    },
    tranDate:{
        flex: 3,
        alignContent: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',

    },
    tranPrice:{
        flex: 4,
        alignContent: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
    },
    tranCate:{
        flex: 2,
        alignContent: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
    },
    graphFont:{
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    accountImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
    },
    aliasFont: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    modalSize: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.50)',
    },
    modalBodySize: {
        width: '75%',
        height: '40%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTopBar: {
        flex: 1,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle:{
        fontSize: 17,
        fontWeight: 'bold',
    },
    modalContent:{
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputDesign: {
        marginTop: 10,
        paddingHorizontal: 10,
        height: 40,
        width: 200,
        borderRadius: 5,
        backgroundColor: '#DCDCDC',
    },
    modalBottom: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});