import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert
} from 'react-native';
import BackButton from '../../Buttons/BackButton';

const Manual = ({navigation, route}) => {
    const [selectedIdx, setSelectedIdx] = useState(0);

    const handLeftBotton = () => {
        if(selectedIdx - 1 < 0){
            return;
        } else {
            setSelectedIdx(selectedIdx - 1);
        }
    }

    const handRightBotton = () => {
        if(selectedIdx + 1 > 7){
            return;
        } else {
            setSelectedIdx(selectedIdx + 1);
        }
    }

    return (
        <View style={styles.appSize}>
            <View style={styles.appTopBar}>
                    <BackButton onPress={()=>{navigation.goBack()}}/>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={styles.appTopBarText}>편히가계</Text>
                        <Text style={{color: 'black'}}> 란?</Text>
                    </View>
                    
            </View>
            
            <View style={styles.rowContainer}>
                {
                    selectedIdx > 0 ? 
                    <TouchableOpacity
                        onPress={handLeftBotton}
                    >
                        <Icon name={'chevron-back-outline'} size={20} color={'#203864'}/>
                    </TouchableOpacity> :
                    <Icon name={'chevron-back-outline'} size={20} color={'white'}/>
                }
                {
                    selectedIdx === 0 && 
                    <View>
                        <Text style={styles.titleText}>1. 편히-데일리: 일일 내역 확인</Text>
                        <Image source={require('../assets/manual/pyeonhee_daily.jpg')} style={styles.manualImage}/>
                    </View>
                    
                    
                }
                {
                    selectedIdx === 1 && 
                    <View>
                        <Text style={styles.titleText}>2. 가계부-타인: 타인 예산계획서 열람</Text>
                        <Image source={require('../assets/manual/budget_others.jpg')} style={styles.manualImage}/>
                    </View>
                }
                {
                    selectedIdx === 2 && 
                    
                    <View>
                        <Text style={styles.titleText}>3. 가계부-본인: 예산계획서 작성 및 수정</Text>
                        <Image source={require('../assets/manual/budget_mybudget.jpg')} style={styles.manualImage}/>
                    </View>
                }
                {
                    selectedIdx === 3 && 
                    
                    <View>
                        <Text style={styles.titleText}>4. 자산-계좌연동: 계좌연동 및 해지</Text>
                        <Image source={require('../assets/manual/asset_linking.jpg')} style={styles.manualImage}/>
                    </View>
                    
                }
                {
                    selectedIdx === 4 && 
                    <View>
                        <Text style={styles.titleText}>5. 편히-거래내역: 거래내역 확인</Text>
                        <Image source={require('../assets/manual/pyeonhee_transaction.jpg')} style={styles.manualImage}/>
                    </View>
                    
                }
                {
                    selectedIdx === 5 && 
                    <View>
                        <Text style={styles.titleText}>6. 월별 소비 분석 리포트</Text>
                        <Image source={require('../assets/manual/monthlyReport.jpg')} style={styles.manualImage}/>
                    </View>
                }
                {
                    selectedIdx === 6 && 
                    <View>
                        <Text style={styles.titleText}>7. 자산-금융상품: 금융상품 추천 서비스</Text>
                        <Image source={require('../assets/manual/asset_financialProduct.jpg')} style={styles.manualImage}/>
                    </View>
                }
                {
                    selectedIdx === 7 && 
                    <View>
                        <Text style={styles.titleText}>8. 자산-상담사: 자산 상담가 매칭 서비스</Text>
                        <Image source={require('../assets/manual/asset_counseling.jpg')} style={styles.manualImage}/>
                    </View>
                }

                {
                    selectedIdx < 7 ?
                    <TouchableOpacity
                        onPress={handRightBotton}
                    >
                        <Icon name={'chevron-forward-outline'} size={20} color={'#203864'}/>
                    </TouchableOpacity>
                    :
                    <Icon name={'chevron-forward-outline'} size={20} color={'white'}/>
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    appSize: {
        flex: 1,
        backgroundColor: 'white',
    },
    appTopBar: {
        height: 45,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        marginBottom: 10, 
    }, 
    appTopBarText: {
        fontSize: 18,
        marginLeft: 10,
        color: 'black'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    manualImage: {
        width: 350,
        height: 650,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#203864'
    },
    lastPage:{
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 25,
        backgroundColor: 'yellow'

    }
});

export default Manual;