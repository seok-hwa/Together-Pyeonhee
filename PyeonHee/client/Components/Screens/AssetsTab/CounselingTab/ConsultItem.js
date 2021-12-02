import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountLogo from '../../assets/AccountLogo';

const ConsultItem = (props) => {

    return (
        <TouchableOpacity
            style={styles.container}
            // onPress={() => props.navigation.navigate('BudgetDetail', {budgetPlanningID: props.budgetPlanningID})}
        >
            <View style={styles.itemContainer}>
                <View style={styles.accountLogoContainer}>
                    <AccountLogo accountCate={props.counselorCorp}/>
                    <Text>{props.counselorCorp}</Text>
                </View>


                <View style={styles.item2}>
                    <Text style={styles.title} >"{props.consultTitle}"</Text>
                    <Text>상담 분야: {props.consultPart}</Text>
                    <Text>상담사: {props.counselorName}</Text>
                    <Text>좋아요: {props.counselorLike}</Text>
                    {/* <Text>상담 가격: {props.consultPrice}</Text> */}
                </View>

                <View style={styles.nextCotainer}>
                    <Icon name={'chevron-forward-outline'} size={20} color={'#8EB3EE'}/>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      margin: 10,
      borderRadius: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 100,
    },
    accountLogoContainer: {
      width: 90,
      height: 90,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      borderWidth: 1,
      borderColor: 'gray',
    },
    item2: {
        marginRight: 20,
        // justifyContent: 'space-between',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',

    },
    mbtiContainer: {
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    mbtiInnerContainer: {
        backgroundColor: 'pink',
        padding: 3,
        borderRadius: 5,
    },
    mbtiText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
    nextCotainer: {
        marginRight: 15,
    },
    nextText: {
        fontSize: 20,
        color: '#A7A3A3'
    },
  });

export default ConsultItem;