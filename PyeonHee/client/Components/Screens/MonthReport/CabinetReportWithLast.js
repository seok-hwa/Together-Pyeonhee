import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, ScrollView, } from 'react-native';

const CabinetReportWithLast = (props) => {
    return(
        <ScrollView>
            <View>
                <Text>{props.month}월</Text>
                <Text>{props.prevMonth}월</Text>
            </View>

        </ScrollView>
    );
}

export default CabinetReportWithLast;
