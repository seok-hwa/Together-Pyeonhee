import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CabinetReportWithLast = (props) => {
    let savingDif = props.saving - props.lastSaving;

    let rentDif = props.rent - props.lastRent;
    let insuranceDif = props.insurance - props.lastInsurance;
    let communicationDif = props.communication - props.lastCommunication;
    let subscribeDif = props.subscribe - props.lastSubscribe;

    let dinnerDif = props.dinner - props.lastDinner;
    let trafficDif = props.traffic - props.lastTraffic;
    let hobbyDif = props.hobby - props.lastHobby;
    let shoppingDif = props.shopping - props.lastShopping;
    let educationDif = props.education - props.lastEducation;
    let medicalDif = props.medical - props.lastMedical;
    let eventDif = props.event - props.lastEvent;
    let ectDif = props.ect - props.lastEct;

    let lastFixedSum = props.lastRent + props.lastInsurance + props.lastCommunication + props.lastSubscribe;
    let fixedSum =  props.rent + props.insurance + props.communication + props.subscribe;

    let lastPlannedSum = props.lastDinner + props.lastTraffic + props.lastHobby + props.lastShopping + 
        props.lastEducation + props.lastMedical + props.lastEvent + props.lastEct;
    let plannedSum = props.dinner + props.traffic + props.hobby + props.shopping + 
        props.education + props.medical + props.event + props.ect;



    let fixedDif = fixedSum - lastFixedSum;
    let plannedDif = plannedSum - lastPlannedSum;

    return(
        <ScrollView>
            <View style={styles.titleContainer}><Text style={{fontSize: 17, fontWeight: 'bold', color: '#203864', margin:10}}>저금</Text></View>
            <View style={styles.monthDiv}>
                <Text style={styles.monthText}>{props.prevMonth}월</Text>
                <Text style={styles.monthText}>{props.month}월</Text>
            </View>
            

            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/budget.png')} style={{width: 15, height: 15, tintColor: '#8EB3EE'}}/>
                    </View>
                    <Text>저금 총합</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.lastSaving.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                <View style={styles.moneyDiv}><Text>{props.saving.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
            </View>
            
            <View style={styles.difDiv}>
                { savingDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                { savingDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                { savingDif === 0 && <Icon name={'remove-outline'} size={12}/> }

                { savingDif != 0 && <Text style={styles.divText}> {Math.abs(savingDif).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
            </View>

            <View style={styles.titleContainer}>
                <Text style={{fontSize: 17, fontWeight: 'bold', color: '#203864', margin:10}}>고정지출</Text>
            </View>
            <View style={styles.monthDiv}>
                <Text style={styles.monthText}>{props.prevMonth}월</Text>
                <Text style={styles.monthText}>{props.month}월</Text>
            </View>

            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Icon name={'log-out-outline'} size={15} color={'#8EB3EE'}/>
                    </View>
                    <Text>월세</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.lastRent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                <View style={styles.moneyDiv}><Text>{props.rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
            </View>
            <View style={styles.difDiv}>
                { rentDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                { rentDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                { rentDif === 0 && <Icon name={'remove-outline'} size={12}/> }

                { rentDif != 0 && <Text style={styles.divText}> {Math.abs(rentDif).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
            </View>
            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/category/health-insurance.png')} style={{width: 15, height: 15, tintColor: '#8EB3EE'}}/>
                    </View>
                    <Text>보험료</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.lastInsurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                <View style={styles.moneyDiv}><Text>{props.insurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
            </View>
            <View style={styles.difDiv}>
                { insuranceDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                { insuranceDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                { insuranceDif === 0 && <Icon name={'remove-outline'} size={12}/> }
                
                { insuranceDif != 0 && <Text style={styles.divText}> {Math.abs(insuranceDif).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
            </View>
            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Icon name={'phone-portrait-outline'} size={15} color={'#8EB3EE'}/>
                    </View>
                    <Text>통신비</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.lastCommunication.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                <View style={styles.moneyDiv}><Text>{props.communication.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
            </View>
            <View style={styles.difDiv}>
                { communicationDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                { communicationDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                { communicationDif === 0 && <Icon name={'remove-outline'} size={12}/> }
                
                { communicationDif != 0 && <Text style={styles.divText}> {Math.abs(communicationDif).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
            </View>
            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/category/subscribe.png')} style={{width: 15, height: 15, tintColor: '#8EB3EE'}}/>
                    </View>
                    <Text>구독료</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.lastSubscribe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text></View>
                <View style={styles.moneyDiv}><Text>{props.subscribe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text></View>
            </View>
            <View style={styles.difDiv}>
                { subscribeDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                { subscribeDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                { subscribeDif === 0 && <Icon name={'remove-outline'} size={12}/> }
                
                { subscribeDif != 0 && <Text style={styles.divText}> {Math.abs(subscribeDif).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
            </View>
            <View style={styles.sumContainer}>
                <View style={styles.categoryDiv}>
                    <View style={styles.leftDiv}>
                        <View style={styles.sumLogoContainer}>
                            <Icon name={'add-outline'} size={15}/>
                        </View>
                        <Text style={{color: '#203864'}}>총합</Text>
                    </View>
                    <View style={styles.moneyDiv}><Text style={styles.sumMoneyText}>{lastFixedSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                    <View style={styles.moneyDiv}><Text style={styles.sumMoneyText}>{fixedSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                </View>
                <View style={styles.difDiv}>
                    { fixedDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                    { fixedDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                    { fixedDif === 0 && <Icon name={'remove-outline'} size={12}/> }
                    
                    { fixedDif != 0 && <Text style={[styles.sumMoneyText, {fontWeight: 'bold'}]}> {Math.abs(fixedDif).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
                </View>
            </View>

            <View style={styles.titleContainer}>
                <Text style={{fontSize: 17, fontWeight: 'bold', color: '#203864', margin:10}}>계획지출</Text>
            </View>
            <View style={styles.monthDiv}>
                <Text style={styles.monthText}>{props.prevMonth}월</Text>
                <Text style={styles.monthText}>{props.month}월</Text>
            </View>

            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/category/spoon.png')} style={{width: 15, height: 15, tintColor: '#8EB3EE'}}/>
                    </View>
                    <Text>식비</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.lastDinner.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                <View style={styles.moneyDiv}><Text>{props.dinner.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
            </View>
            <View style={styles.difDiv}>
                { dinnerDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                { dinnerDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                { dinnerDif === 0 && <Icon name={'remove-outline'} size={12}/> }

                { dinnerDif != 0 && <Text style={styles.divText}> {Math.abs(dinnerDif).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
            </View>
            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Icon name={'log-out-outline'} size={15} color={'#8EB3EE'}/>
                    </View>
                    <Text>교통비</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.lastTraffic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                <View style={styles.moneyDiv}><Text>{props.traffic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
            </View>
            <View style={styles.difDiv}>
                { trafficDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                { trafficDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                { trafficDif === 0 && <Icon name={'remove-outline'} size={12}/> }

                { trafficDif != 0 && <Text style={styles.divText}> {Math.abs(trafficDif).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
            </View>

            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/category/leisure.png')} style={{width: 15, height: 15, tintColor: '#8EB3EE'}}/>
                    </View>
                    <Text>문화/취미/여행</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.lastHobby.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                <View style={styles.moneyDiv}><Text>{props.hobby.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
            </View>
            <View style={styles.difDiv}>
                { hobbyDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                { hobbyDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                { hobbyDif === 0 && <Icon name={'remove-outline'} size={12}/> }
                
                { hobbyDif != 0 && <Text style={styles.divText}> {Math.abs(hobbyDif).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
            </View>
            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/category/shopping.png')} style={{width: 15, height: 15, tintColor: '#8EB3EE'}}/>
                    </View>
                    <Text>뷰티/미용/쇼핑</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.lastShopping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                <View style={styles.moneyDiv}><Text>{props.shopping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
            </View>
            <View style={styles.difDiv}>
                { shoppingDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                { shoppingDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                { shoppingDif === 0 && <Icon name={'remove-outline'} size={12}/> }
                
                { shoppingDif != 0 && <Text style={styles.divText}> {Math.abs(shoppingDif).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
            </View>
            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/category/education.png')} style={{width: 15, height: 15, tintColor: '#8EB3EE'}}/>
                    </View>
                    <Text>교육</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.lastEducation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                <View style={styles.moneyDiv}><Text>{props.education.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
            </View>
            <View style={styles.difDiv}>
                { educationDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                { educationDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                { educationDif === 0 && <Icon name={'remove-outline'} size={12}/> }
                
                { educationDif != 0 && <Text style={styles.divText}> {Math.abs(educationDif).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
            </View>
            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/category/medical.png')} style={{width: 15, height: 15, tintColor: '#8EB3EE'}}/>
                    </View>
                    <Text>의료비</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.lastMedical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                <View style={styles.moneyDiv}><Text>{props.medical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
            </View>
            <View style={styles.difDiv}>
                { medicalDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                { medicalDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                { medicalDif === 0 && <Icon name={'remove-outline'} size={12}/> }
                
                { medicalDif != 0 && <Text style={styles.divText}> {Math.abs(medicalDif).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
            </View>
            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/category/event.png')} style={{width: 15, height: 15, tintColor: '#8EB3EE'}}/>
                    </View>
                    <Text>경조사/선물</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.lastEvent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                <View style={styles.moneyDiv}><Text>{props.event.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
            </View>
            <View style={styles.difDiv}>
                { eventDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                { eventDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                { eventDif === 0 && <Icon name={'remove-outline'} size={12}/> }
                
                { eventDif != 0 && <Text style={styles.divText}> {Math.abs(eventDif).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
            </View>

            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Icon name={'ellipsis-horizontal-outline'} size={15} color={'#8EB3EE'}/>
                    </View>
                    <Text>기타</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.lastEct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                <View style={styles.moneyDiv}><Text>{props.ect.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
            </View>
            <View style={styles.difDiv}>
                { ectDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                { ectDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                { ectDif === 0 && <Icon name={'remove-outline'} size={12}/> }
                
                { ectDif != 0 && <Text style={styles.divText}> {Math.abs(ectDif).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
            </View>
            <View style={styles.sumContainer}>
                <View style={styles.categoryDiv}>
                    <View style={styles.leftDiv}>
                        <View style={styles.sumLogoContainer}>
                            <Icon name={'add-outline'} size={15}/>
                        </View>
                        <Text style={{color: '#203864'}}>총합</Text>
                    </View>
                    <View style={styles.moneyDiv}><Text style={styles.sumMoneyText}>{lastPlannedSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                    <View style={styles.moneyDiv}><Text style={styles.sumMoneyText}>{plannedSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                </View>
                <View style={styles.difDiv}>
                    { plannedDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                    { plannedDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                    { plannedDif === 0 && <Icon name={'remove-outline'} size={12}/> }
                    
                    { plannedDif != 0 && <Text style={[styles.sumMoneyText, {fontWeight: 'bold'}]}> {Math.abs(plannedDif).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
                </View>
            </View>
   
            

        </ScrollView>
    );
}

export default CabinetReportWithLast;

const styles = StyleSheet.create({
    titleContainer:{
        borderTopWidth: 5,
        borderTopColor: '#F0F4FA',
    },
    monthDiv: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    monthText: {
        marginRight: 20,
        width: 108,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    categoryDiv: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    logoContainer: {
        padding: 5,
        borderRadius: 20,
        marginRight: 13, 
        borderColor: '#8EB3EE',
        borderWidth: 1,
    },
    sumLogoContainer: {
        padding: 5,
        borderRadius: 20,
        marginRight: 13, 
    },
    leftDiv: {
        width: 95,
        flexDirection:'row',
        alignItems: 'center',
    },
    moneyDiv:{
        width: 85,
        alignItems:'flex-end',
    },
    difDiv: {
        flexDirection: 'row',
        justifyContent:'flex-end',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 5, 
    },
    divText: {
        fontSize: 12,
    },
    sumContainer:{
        borderTopWidth: 1,
        borderTopColor: '#8EB3EE',
        marginVertical: 10,
        paddingTop: 13,
        paddingBottom: 5,
        
    },
    sumMoneyText: {
        color: '#203864',
        fontSize: 15,
    }
});