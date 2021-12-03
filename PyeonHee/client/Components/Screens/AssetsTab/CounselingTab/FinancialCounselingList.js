import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../../config';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import FinancialConsultItem from './FinancialConsultItem';
import RNPickerSelect from 'react-native-picker-select';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast'

const url = config.url;
const FinancialCounseling = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [financialCounselingData, setFinancialCounselingData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    //for test
    // let financialCounselingData = [
    //     {
    //         consult_number: 1,
    //         counselor_name: '김아주',
    //         consult_title: '상담 제목1',    //상담사가 자기를 표현하는 한 줄로 했으면 좋겠음
    //         consult_part: '재무/회계',
    //         counselor_corp: '카카오뱅크',     //상담사 소속 회사 정보 필요
    //         counselor_like: 20,            //상담사 평점? 또는 좋아요 정보
    //         counselor_rank: 1,
    //     },
    //     {
    //         consult_number: 2,
    //         counselor_name: '이아주',
    //         consult_title: '상담 제목2',
    //         consult_part: '편드',
    //         counselor_corp: 'SBI저축은행',
    //         counselor_like: 330,
    //         counselor_rank: 2,
    //     },
    //     {
    //         consult_number: 3,
    //         counselor_name: '남궁아주',
    //         consult_title: '상담 제목3',
    //         consult_part: '연금',
    //         counselor_corp: 'IBK기업은행',
    //         counselor_like: 7300,
    //         counselor_rank: 3,
    //     },
    //     {
    //         consult_number: 4,
    //         counselor_name: '홍아주',
    //         consult_title: '상담 제목3',
    //         consult_part: '연금',
    //         counselor_corp: '새마을금고',
    //         counselor_like: 2513,
    //         counselor_rank: 4,
    //     },
    // ]

    useEffect(()=>{
        let tempID;

        AsyncStorage.getItem('userID', (err, result) => {
            tempID = result;
            if(tempID!= null){
                setUserID(tempID);
            }
        })
        .then(()=>{
            console.log(tempID);
            console.log(`${url}/Counseling/FinancialProduct`);
            fetch(`${url}/Counseling/FinancialProduct`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('아아 response data');
                console.log(responseJson);
                setFinancialCounselingData(responseJson);

            })
            .then(()=>{
                setLoading(true);
            })  

            // setLoading(true); //for test
        })
    }, [])

    const loadCounselor = () => {
        setRefresh(true);
        fetch(`${url}/Counseling/FinancialProduct`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log('response data');
            console.log(responseJson);
            setConsultData(responseJson);
        })
        .then(()=>{
            setRefresh(false);
        })  
        // setRefresh(false); //for test

    }

    const hadlePressed = (value) => {
        console.log(`Pressed!`);
        console.log(`${url}/Counseling/FinancialProduct/Category`);
        fetch(`${url}/Counseling/FinancialProduct/Category`, {
            method: 'POST',
            body: JSON.stringify({
                categoryName: value,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log('response data');
            console.log(responseJson);
            setFinancialCounselingData(responseJson);
        })
    }

    if(loading === true ){
        return (
            <View style={styles.appSize}>
                <View style={styles.categoryContainer}>
                    <View style={{width: 65, alignItems: 'center'}}><Text style={styles.categoryText}>상담분야</Text></View>
                    <View style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center',}}>
                        <RNPickerSelect
                            onValueChange={(value) => hadlePressed(value)}
                            placeholder={{ label: "선택", value: null }}
                            dropdownIconColor={'white'}
                            items={[
                                { label: '펀드', value: '펀드' },
                                { label: '적금', value: '적금' },
                                { label: '연금', value: '연금' },
                                { label: '보험', value: '보험' },
                                { label: '대출', value: '대출' },
                            ]}
                        />
                    </View>
                    <View style={{width: 80, alignItems: 'center'}}><Text style={styles.categoryText}>소속</Text></View>
                    <View style={{width: 80, alignItems: 'center'}}><Text style={styles.categoryText}>상담사</Text></View>
                    <View style={{width: 55, alignItems: 'center'}}><Text style={styles.categoryText}>좋아요</Text></View>
                </View>
                <View>
                    <FlatList
                        keyExtractor={item => item.consult_number}
                        data={financialCounselingData}
                        renderItem={({item}) => <FinancialConsultItem key= {item.counselor_id} consultNumber={item.counselor_id} counselorName={item.name} consultPart={item.part} 
                            counselorCorp={item.company} counselorLike={item.like_count} navigation={navigation}
                            counselorRank={item.counselor_rank}
                        />}
                        refreshing={refresh}
                        onRefresh={loadCounselor}
                    />
                </View>                
        </View>
        )
    } else {
        return (
            <View style={styles.appSize}>
                <Text>..</Text>
            </View>
        )
    }
}

export default FinancialCounseling;

const styles = StyleSheet.create({
    appSize: {
        flex: 1,
    },
    categoryContainer: {
        flexDirection: 'row',
        paddingLeft: 35, 
        alignItems: 'center',
        marginVertical: 5, 
        height: 35, 
        backgroundColor: '#203864',
    },
    categoryText: {
        color: 'white',
    },
    spsText: {
        width: 390, 
        height: 45,
        alignItems: 'center', 
        justifyContent: 'center', 
        // backgroundColor: 'yellow'
    }
});