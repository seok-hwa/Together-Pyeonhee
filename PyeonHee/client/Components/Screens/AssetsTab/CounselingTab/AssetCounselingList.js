import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../../config';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import AssetConsultItem from './AssetConsultItem';

const url = config.url;
const AssetCounseling = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [assetCounselingData, setAssetCounselingData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    //for test
    // let assetCounselingData = [
    //     {
    //         consult_number: 1,
    //         counselor_name: '김아주',   
    //         counselor_corp: '우리은행',     //상담사 소속 회사 정보 필요
    //         counselor_like: 8220,            //상담사 평점? 또는 좋아요 정보
    //         counselor_rank: 1,
    //     },
    //     {
    //         consult_number: 2,
    //         counselor_name: '이아주',
    //         counselor_corp: '카카오뱅크',
    //         counselor_like: 303,
    //         counselor_rank: 2,
    //     },
    //     {
    //         consult_number: 3,
    //         counselor_name: '변아주',
    //         counselor_corp: 'IBK기업은행',
    //         counselor_like: 55,
    //         counselor_rank: 3,
    //     },
        
    //     {
    //         consult_number: 4,
    //         counselor_name: '강한엔밝은빛',
    //         consult_title: '상담 제목3',
    //         counselor_corp: '새마을금고',
    //         counselor_like: 55,
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
            console.log(`${url}/Counseling/AssetManagement`);
            fetch(`${url}/Counseling/AssetManagement`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setConsultData(responseJson);

                //consult_number: 상담 고유id
                //counselor_name: 상담사 이름
                //consult_title : 상담 제목
                //consult_part  : 상담 분야
                //consult_price : 상담 가격

            })
            .then(()=>{
                setLoading(true);
            })  

            // setLoading(true); //for test
        })
    }, [])

    const loadCounselor = () => {
        setRefresh(true);
        fetch(`${url}/Counseling/AssetManagement`)   //get
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

    if(loading === true ){
        return (
            <View style={styles.appSize}>
                <View style={styles.categoryContainer}>
                    <View style={{width: 105, alignItems: 'center'}}><Text style={styles.categoryText}>소속</Text></View>
                    <View style={{width: 80, alignItems: 'center'}}><Text style={styles.categoryText}>상담사</Text></View>
                    <View style={{width: 55, alignItems: 'center'}} ><Text style={styles.categoryText}>좋아요</Text></View>
                </View>
                <View>
                    <FlatList
                    keyExtractor={item => item.counselor_id}
                    data={assetCounselingData}
                    renderItem={({item}) => <AssetConsultItem consultNumber={item.counselor_id} counselorName={item.name} 
                        counselorCorp={item.company} counselorLike={item.like_count} navigation={navigation} counselorRank={item.counselor_rank} 
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

export default AssetCounseling;

const styles = StyleSheet.create({
    appSize: {
        flex: 1,
    },
    categoryContainer: {
        flexDirection: 'row',
        paddingLeft: 45, 
        paddingRight: 40, 
        alignItems: 'center',
        marginVertical: 5, 
        height: 35, 
        backgroundColor: '#203864',
        justifyContent: 'space-between',
    },
    categoryText: {
        color: 'white',
    },
});