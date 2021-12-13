import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import AssetConsultItem from './AssetConsultItem';
import { counselingAssetManagement } from '../../../api';

const AssetCounseling = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [assetCounselingData, setAssetCounselingData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [like, setLike] = useState(false);

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
            counselingAssetManagement()
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setAssetCounselingData(responseJson);
                setLike(false);
            })
            .then(()=>{
                setLoading(true);
            })  
        })
    }, [like])

    const loadCounselor = () => {
        setRefresh(true);
        counselingAssetManagement()
        .then((responseJson)=>{
            console.log('response data');
            console.log(responseJson);
            setAssetCounselingData(responseJson);
        })
        .then(()=>{
            setRefresh(false);
        })  
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
                    renderItem={({item, index}) => <AssetConsultItem consultNumber={item.counselor_id} counselorName={item.name} 
                        counselorCorp={item.company} counselorLike={item.like_count} navigation={navigation} counselorRank={index+1} 
                        userID={userID} key={item.counselor_id}
                        setLike={setLike}
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