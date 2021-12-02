import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';

const RankingLogo = (props) => {
    const ranking = props.rank;
    if(ranking === 1){
        return(
            <Image source={require('../../assets/ranking/first.png')} style={styles.rankingImage}/>
        )
    }else if(ranking === 2){
        return(
            <Image source={require('../../assets/ranking/second.png')} style={styles.rankingImage}/>
        )
    }else if(ranking === 3){
        return(
            <Image source={require('../../assets/ranking/third.png')} style={styles.rankingImage}/>
        )
    }
    else{
        return(
            <View style={styles.rankContainer} >
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    {ranking}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rankingLogoContainer: {
        width: 30,
        height: 30,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
      },
    rankingImage: {
        height: 30,
        width: 30,
        // borderWidth: 1,
        // borderRadius: 2,
    },
    rankContainer: {
        height: 25,
        width: 25,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default RankingLogo;