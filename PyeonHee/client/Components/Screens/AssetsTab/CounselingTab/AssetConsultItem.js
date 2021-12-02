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

                <View style={styles.item2}>
                    
                    <View style={{width: 105, alignItems: 'center'}}> 
                        <Text> {props.counselorCorp}</Text> 
                    </View>

                    <View style={{width: 80, alignItems: 'center'}}> 
                        <Text>{props.counselorName}</Text> 
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', width: 55, }}>
                        <Image source={require('../../assets/redHeart.png')} style={styles.likeLogo}/>
                        <Text style={{marginLeft: 5, fontSize: 10, }}>{props.counselorLike.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                </View>

                <View>
                    <Icon name={'chevron-forward-outline'} size={20} color={'#8EB3EE'}/>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
      },
      itemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 3, 
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      rankingLogoContainer: {
          width: 30,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
        },
      item2: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 300,
          paddingVertical: 20,
      },
      likeLogo: {
          width: 10,
          height:10,
      },
  });

export default AssetConsultItem;