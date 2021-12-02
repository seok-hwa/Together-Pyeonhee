import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import RankingLogo from './RankingLogo';

const AssetConsultItem = (props) => {

    return (
        <TouchableOpacity
            style={styles.container}
            // onPress={() => props.navigation.navigate('FinancialConsult', {consultNumber: props.consultNumber})}
        >
            <View style={styles.itemContainer}>
                <View style={styles.rankingLogoContainer}>
                    <RankingLogo rank={props.counselorRank}/>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.item2}>
                        <Text>소속: {props.counselorCorp}</Text>
                        <Text>상담사: {props.counselorName}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Image source={require('../../assets/redHeart.png')} style={styles.likeLogo}/>
                            <Text style={{marginLeft: 5, }}>{props.counselorLike}</Text>
                        </View>
                        
                    </View>

                    <View style={styles.nextContainer}>
                        <Icon name={'chevron-forward-outline'} size={20} color={'#8EB3EE'}/>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      margin: 5,
      borderRadius: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    //   alignItems: 'center',
      height: 90,
    },
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
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    item2: {
        marginRight: 20,
        backgroundColor: 'pink',
        width: 150
        // justifyContent: 'space-between',
    },
    nextContainer: {
        marginRight: 15,
    },
    likeLogo: {
        width: 15,
        height: 15,

    },
  });

export default AssetConsultItem;