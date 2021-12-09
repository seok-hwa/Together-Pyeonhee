import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const QueryItem = (props) => {
//onPress={()=>props.navigation.navigate('SetCategory', {fintech: props.fintech, bankName: props.bankName, organizationName: props.organizationName, tranDate: props.tranDate, tranTime: props.tranTime, tranPrice: props.tranPrice, tranCate: props.tranCate, inoutType: props.inoutType, branchName: props.branchName})}
    return (
        <TouchableOpacity onPress={()=>props.navigation.navigate('QueryBoard', {boardID: props.boardID, user_id: props.user_id})}>
            <View style={styles.boardBox}>
                <View style={styles.cateDiv}><Text style={styles.centerFont}>{props.boardCate}</Text></View>
                <View style={styles.titleDiv}><Text numberOfLines={1} ellipsizeMode="tail">{props.boardTitle}</Text></View>
                <View style={styles.dateDiv}><Text style={styles.centerFont}>{props.boardDate.substring(0,10)}</Text></View>
                {
                    props.comment_check === 1 ?
                    <View style={styles.boardNumberDiv}><Text style={styles.centerFont}>O</Text></View> :
                    <View style={styles.boardNumberDiv}><Text style={styles.centerFont}>X</Text></View>
                }
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    boardBox: {
        height: 50,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'gray',
        backgroundColor: 'white',
    },
    graphTitle:{
        height: 25,
        backgroundColor: '#8EB3EE',
        flexDirection: 'row',
        borderColor: 'gray',
    },
    boardNumberDiv: {
        width: 50,
        alignContent: 'center',
        justifyContent: 'center',
    },
    cateDiv: {
        width: 70,
        alignContent: 'center',
        justifyContent: 'center',
    },
    titleDiv:{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',

    },
    dateDiv:{
        width: 100,
        alignContent: 'center',
        justifyContent: 'center',
    },
    graphFont:{
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    centerFont: {
        textAlign: 'center',
    },
});

export default QueryItem;