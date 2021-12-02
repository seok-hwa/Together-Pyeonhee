import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';

const RankingLogo = (props) => {
    const ranking = props.rank;
    if(ranking === 1){
        return(
            <Image source={require('../../assets/ranking/first.png')} style={styles.accountImage}/>
        )
    }else if(ranking === 2){
        return(
            <Image source={require('../../assets/ranking/second.png')} style={styles.accountImage}/>
        )
    }else if(ranking === 3){
        return(
            <Image source={require('../../assets/ranking/third.png')} style={styles.accountImage}/>
        )
    }
    else{
        return(
            <View style={styles.accountImage} />
        )
    }
}

const styles = StyleSheet.create({
    accountImage: {
        height: 25,
        width: 25,
        // borderWidth: 1,
        // borderRadius: 2,
    },
});

export default RankingLogo;