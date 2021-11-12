import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';

const TransactionScreen = (props) => {
    return (
        <View style={styles.dailyText}>
            <Text>{props.cState}) Transactional information page</Text>
        </View>
    )
}

export default TransactionScreen;

const styles = StyleSheet.create({
    dailyText: {
      flex: 1,
      padding: 8,
      textAlign: 'center',
    },
});