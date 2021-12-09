import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RankingLogo from './RankingLogo';
import config from '../../../../config';

const url = config.url;
const FinancialConsultDetail = (props) => {

    const [userID, setUserID] = useState('');
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
            console.log(`${url}/Counseling/FinancialProduct/Detail?consultNumber=${props.consultNumber}`);
            // fetch(`${url}//Counseling/FinancialProduct/Detail?planningID=${planningID}`)   //get
            // .then((response)=>response.json())
            // .then((responseJson)=>{
            //     console.log('response data');
            //     console.log(responseJson);
            //     setFinancialCounselingData(responseJson);

            // })
            // .then(()=>{
            //     setLoading(true);
            // })  

            setLoading(true); //for test
        })
    }, [])

    return (
        <View>
            <View style={styles.itemContainer}>
  


                <View style={styles.item2}>
                    <Text>detail 화면 입니다</Text>
                </View>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    itemContainer: {
      flexDirection: 'row',
      paddingHorizontal: 3, 
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rankingLogoContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
    item2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        paddingVertical: 20,
    },
    likeLogo: {
        width: 10,
        height:10,
    },
  });

export default FinancialConsultDetail; 