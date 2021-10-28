import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const JoinScreen = ({navigation}) => {
    return(
        <View style={styles.appSize}>
            <Text>회원가입 화면</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    appSize: {
        flex: 1,
    }
});
export default JoinScreen;