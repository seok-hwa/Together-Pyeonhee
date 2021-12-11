import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import TransactionItem from '../../TransactionItem';
import { totalTranList } from '../../../api';

const TotalTransactionScreen = ({navigation}) => {
    const [userID, setUserID] = useState('');
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
            totalTranList(tempID)
            .then((responseJson)=>{
                console.log('거래 내역');
                console.log(responseJson);

                setTranList(responseJson);
            })
            .then(()=>{
                setLoading(true);
            })
        })
    },[])
    if(loading === true){
    return (
        <View style={styles.appSize}>
            <View style={styles.TranBox}>
                <View style={styles.graphTitle}>
                    <View style={styles.BankNameDiv}><Text style={styles.graphFont}>은행</Text></View>
                    <View style={styles.OrganizationNameDiv}><Text style={styles.graphFont}>상호명</Text></View>
                    <View style={styles.tranDate}><Text style={styles.graphFont}>거래일자</Text></View>
                    <View style={styles.tranPrice}><Text style={styles.graphFont}>거래금액</Text></View>
                    <View style={styles.tranCate}><Text style={styles.graphFont}>종류</Text></View>
                </View>
                <ScrollView style={{flex: 1,}}>
                    {tranList.map((item, index)=> {
                        return <TransactionItem key={index} bankName={item.bank_name} branchName={item.branch_name} tranDate={item.tran_date} 
                        tranPrice={item.tran_amt} tranTime={item.tran_time} tranCate={item.tran_type} tranID={item.tranID} navigation={navigation}
                        inoutType={item.inout_type} fintech={item.fintech_use_num} organizationName={item.print_content} account_num={item.account_num_masked}
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

export default TotalTransactionScreen;

const styles = StyleSheet.create({
    appSize: {
      flex: 1,
      padding: 4,
      marginTop: 10,
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