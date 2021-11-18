import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AccountItem = (props) => {

    return (
        <TouchableOpacity>
                <View style={styles.accountCard}>
                    <View style={styles.accountImage}>

                    </View>
                    <View style={styles.accountContent}>
                        <View style={styles.accountInnerContent}>
                            <Text style={styles.accountCate}>{props.accountCate}({props.accountNum})</Text>
                            <Text style={styles.accountMoney}>{props.accountBalance}원</Text>
                        </View>
                    </View>
                </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    accountCard: {
        backgroundColor: 'white',
        padding: 7,
        borderTopWidth: 1,
        borderTopColor: 'gray',
        flexDirection:'row',
        margin: 2,
    },
    accountImage: {
        height: 60,
        width: 60,
        borderWidth: 1,
        borderRadius: 30,
    },
    accountContent: {
        flex: 1,
        flexDirection: 'row-reverse',
    },
    accountCate: {
        fontSize: 15,
        marginRight: 10,
        width: 250,
        textAlign: 'right',
    },
    accountInnerContent: {
        flexDirection: 'column',
    },
    accountMoney: {
        marginTop: 8,
        fontSize: 17,
        width: 250,
        textAlign: 'right',
    },
  });

export default AccountItem;