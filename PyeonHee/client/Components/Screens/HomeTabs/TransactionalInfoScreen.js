import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import TransactionItem from '../TransactionItem';
import config from '../../../config';

const url = config.url;
const TransactionScreen = (props) => {
    const [userID, setUserID] = useState('');
    const [tranlatestList, setTranLatestList] = useState([]);
    const [tranList, setTranList] = useState([]);
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            //for test
            /*
            console.log(`${url}/latestTranList?userID=${tempID}`);
            fetch(`${url}/latestTranList?userID=${tempID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);

                setTranLatestList(responseJson);
            })
            .then(()=>{
                console.log(`${url}/tranList?userID=${tempID}`);
                fetch(`${url}/tranList?userID=${tempID}`)   //get
                .then((response)=>response.json())
                .then((responseJson)=>{
                    console.log('response data');
                    console.log(responseJson);
    
                    setTranList(responseJson);
                    setLoading(true);
                })
            })
            */
        })
    },[])
    //for test
    const tempLatestData = [
        {
            tranID: 1,
            bankName: '오픈은행',
            organizationName: '스타벅스',
            tranDate: '2021/11/20',
            tranPrice: 3000,
            tranCate: '생활',
        },
    ]
    const tempData = [
        {
            tranID: 2,
            bankName: '오픈은행',
            organizationName: '아디다스',
            tranDate: '2021/11/16',
            tranPrice: 300000,
            tranCate: '생활',
        },
        {
            tranID: 3,
            bankName: '농협',
            organizationName: '아디다스',
            tranDate: '2021/11/15',
            tranPrice: 200000,
            tranCate: '생활',
        },
    ]
    if(loading === true){
    return (
        <View style={styles.appSize}>
            <Text style={styles.titleFont}>최근 거래 내역</Text>
            <View style={styles.latestTranBox}>
                <View style={styles.graphTitle}>
                    <View style={styles.BankNameDiv}><Text style={styles.graphFont}>은행</Text></View>
                    <View style={styles.OrganizationNameDiv}><Text style={styles.graphFont}>상호명</Text></View>
                    <View style={styles.tranDate}><Text style={styles.graphFont}>거래일자</Text></View>
                    <View style={styles.tranPrice}><Text style={styles.graphFont}>거래금액</Text></View>
                    <View style={styles.tranCate}><Text style={styles.graphFont}>종류</Text></View>
                </View>
                <ScrollView style={{flex: 1,}}>
                    {tempLatestData.map(item => {
                        return <TransactionItem key={item.tranID} bankName={item.bankName} organizationName={item.organizationName} tranDate={item.tranDate} 
                        tranPrice={item.tranPrice} tranCate={item.tranCate} tranID={item.tranID}
                        />})
                    }
                </ScrollView>
            </View>
            <Text style={styles.titleFont}>거래 내역</Text>
            <View style={styles.TranBox}>
                <View style={styles.graphTitle}>
                    <View style={styles.BankNameDiv}><Text style={styles.graphFont}>은행</Text></View>
                    <View style={styles.OrganizationNameDiv}><Text style={styles.graphFont}>상호명</Text></View>
                    <View style={styles.tranDate}><Text style={styles.graphFont}>거래일자</Text></View>
                    <View style={styles.tranPrice}><Text style={styles.graphFont}>거래금액</Text></View>
                    <View style={styles.tranCate}><Text style={styles.graphFont}>종류</Text></View>
                </View>
                <ScrollView style={{flex: 1,}}>
                    {tempData.map(item => {
                        return <TransactionItem key={item.tranID} bankName={item.bankName} organizationName={item.organizationName} tranDate={item.tranDate} 
                        tranPrice={item.tranPrice} tranCate={item.tranCate} tranID={item.tranID}
                        />})
                    }
                </ScrollView>
            </View>
        </View>
    )
    }
    else{
        return (
            <View style={styles.appSize}>
                <Text style={styles.titleFont}>최근 거래 내역</Text>
                <View style={styles.latestTranBox}>
                    <View style={styles.graphTitle}>
                        <View style={styles.BankNameDiv}><Text style={styles.graphFont}>은행</Text></View>
                        <View style={styles.OrganizationNameDiv}><Text style={styles.graphFont}>상호명</Text></View>
                        <View style={styles.tranDate}><Text style={styles.graphFont}>거래일자</Text></View>
                        <View style={styles.tranPrice}><Text style={styles.graphFont}>거래금액</Text></View>
                        <View style={styles.tranCate}><Text style={styles.graphFont}>종류</Text></View>
                    </View>
                    <ScrollView style={{flex: 1,}}>
                    </ScrollView>
                </View>
                <Text style={styles.titleFont}>거래 내역</Text>
                <View style={styles.TranBox}>
                    <View style={styles.graphTitle}>
                        <View style={styles.BankNameDiv}><Text style={styles.graphFont}>은행</Text></View>
                        <View style={styles.OrganizationNameDiv}><Text style={styles.graphFont}>상호명</Text></View>
                        <View style={styles.tranDate}><Text style={styles.graphFont}>거래일자</Text></View>
                        <View style={styles.tranPrice}><Text style={styles.graphFont}>거래금액</Text></View>
                        <View style={styles.tranCate}><Text style={styles.graphFont}>종류</Text></View>
                    </View>
                    <ScrollView style={{flex: 1,}}>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default TransactionScreen;

const styles = StyleSheet.create({
    appSize: {
      flex: 1,
      padding: 4,
    },
    titleFont: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 5,
    },
    latestTranBox: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    graphTitle:{
        height: 25,
        backgroundColor: '#8EB3EE',
        flexDirection: 'row',
        borderWidth: 1,
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
    TranBox: {
        flex: 2,
        backgroundColor: 'white',
        borderRadius: 5,
        
    },
    TranContentBox:{
        height: 65,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'gray',
    },
    BankImageView: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
    },
    BankFont: {
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tranDateFont:{
        fontSize: 12,
        textAlign: 'center',
    },
    tranPriceFont:{
        fontSize: 12,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    cateFont:{
        fontSize: 12,
        textAlign: 'center',
    },
});