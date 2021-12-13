import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import FinancialConsultItem from './FinancialConsultItem';
import RNPickerSelect from 'react-native-picker-select';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast'
import { counselingFinancialProductCategory, counselingFinancialProduct } from '../../../api';

const FinancialCounseling = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [financialCounselingData, setFinancialCounselingData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

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
            counselingFinancialProduct()
            .then((responseJson)=>{
                console.log('response data');
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
        counselingFinancialProduct()
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
        counselingFinancialProductCategory(value)
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
                        keyExtractor={item => item.counselor_id}
                        data={financialCounselingData}
                        renderItem={({item, index}) => <FinancialConsultItem key= {item.counselor_id} consultNumber={item.counselor_id} counselorName={item.name} consultPart={item.part} 
                            counselorCorp={item.company} counselorLike={item.like_count} navigation={navigation} userID={userID}
                            counselorRank={index+1}
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