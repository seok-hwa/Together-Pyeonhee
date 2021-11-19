import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, ScrollView, } from 'react-native';

const TransactionScreen = (props) => {
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
                    <View style={styles.TranContentBox}>
                        <View style={styles.BankNameDiv}><View style={styles.BankImageView}></View></View>
                        <View style={styles.OrganizationNameDiv}><Text style={styles.BankFont}>오픈은행</Text></View>
                        <View style={styles.tranDate}><Text style={styles.tranDateFont}>2021/11/19</Text></View>
                        <View style={styles.tranPrice}><Text style={styles.tranPriceFont}>200000원</Text></View>
                        <View style={styles.tranCate}><Text style={styles.cateFont}>생활</Text></View>
                    </View>
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