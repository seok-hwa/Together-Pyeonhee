import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';

const DailyScreen = (props) => {
    return (
        <View style={styles.dailyText}>
            <Text>{props.cState}) Daily page</Text>
        </View>
    )
}

export default DailyScreen;

const styles = StyleSheet.create({
    dailyText: {
      flex: 1,
      padding: 8,
      textAlign: 'center',
    },
});