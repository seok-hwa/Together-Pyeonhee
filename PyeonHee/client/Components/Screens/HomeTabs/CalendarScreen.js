import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';

const CalendarScreen = (props) => {
    return (
        <View style={styles.dailyText}>
            <Text>{props.cState}) Calendar page</Text>
        </View>
    )
}

export default CalendarScreen;

const styles = StyleSheet.create({
    dailyText: {
      flex: 1,
      padding: 8,
      textAlign: 'center',
    },
});