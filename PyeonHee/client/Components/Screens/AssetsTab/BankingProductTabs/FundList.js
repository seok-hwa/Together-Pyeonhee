import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../../config';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import FundItem from './FundItem';

const url = config.url;
const FundProduct = ({navigation}) => {
    const [userID, setUserID] = useState('');
    const [check, setCheck] = useState(false);
    const [read, setRead] = useState(false);
    const [allFundList, setAllFundList] = useState([]);
    const [myFundList, setMyFundList] = useState([]);

    //for test
    const tempAll = [
        {
            product_name: '브이아이 중소형주플러스 증권자투자신탁1호',
            bank_name: '브이아이자산운용',
            interest_3: '17%',
            interest_6: '24%',
            interest_12: '49%',
            fund_sum: '22억',
            link: 'https://www.daishin.com/g.ds?p=1257&v=825&m=1697&ast_utlz_scty_fnd_cod=KR5104766708',
        },
        {
            product_name: '한국투자중소성장증권투자신탁1호',
            bank_name: '한국투자신탁운용',
            interest_3: '7%',
            interest_6: '10%',
            interest_12: '36%',
            fund_sum: '60억',
            link: 'https://www.daishin.com/g.ds?p=1257&v=825&m=1697&ast_utlz_scty_fnd_cod=KR5101AQ5090',
        },
    ]
    const tempMy = [
        {
            product_name: '한국투자중소성장증권투자신탁1호',
            bank_name: '한국투자신탁운용',
            interest_3: '7%',
            interest_6: '10%',
            interest_12: '36%',
            fund_sum: '60억',
            link: 'https://www.daishin.com/g.ds?p=1257&v=825&m=1697&ast_utlz_scty_fnd_cod=KR5101AQ5090',
        },
    ]

    useEffect(()=>{
        let tempID;
        AsyncStorage.getItem('userID', (err, result) => {
            tempID = result;
            if(tempID!= null){
                setUserID(tempID);
            }
        })
        /*
        .then(()=>{
            console.log(tempID);
            console.log(`${url}/allFundList`);
            fetch(`${url}/allFundList`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setAllFundList(responseJson);
            })  
        })*/
    })

    const checkHandler = () => {
        setCheck(!check);
        /*
        if(check === false && read === false) {
            setRead(true);
            fetch(`${url}/myFundList?userID=${userID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('response data');
                console.log(responseJson);
                setMyFundList(responseJson);
            })
        }*/
    }

    return (
        <View style={styles.appSize}>
            <View style={styles.wrapper}>
                    <CheckBox value={check} onChange={checkHandler} />
                    <Text style={styles.text}>
                        나에게 맞는 펀드 찾기
                    </Text>
            </View>
            {
                check === false && 
                    tempAll.map(item => {
                    return <FundItem key={item.product_name} product_name={item.product_name} bank_name={item.bank_name} fund_sum={item.fund_sum}
                    interest_3={item.interest_3} interest_6={item.interest_6} interest_12={item.interest_12} link={item.link} navigation={navigation}
                    />;
                })}
                {check === true && 
                    tempMy.map(item => {
                    return <FundItem key={item.product_name} product_name={item.product_name} bank_name={item.bank_name} fund_sum={item.fund_sum}
                    interest_3={item.interest_3} interest_6={item.interest_6} interest_12={item.interest_12} link={item.link} navigation={navigation}
                    />;
                })
            }
        </View>
    )
}

export default FundProduct;

const styles = StyleSheet.create({
    appSize: {
      flex: 1,
    },

      wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        paddingVertical: 5,
    },
    text: {
        lineHeight: 30,
        marginLeft: 10,
    },
});