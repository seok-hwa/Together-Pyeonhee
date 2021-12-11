import React, { useEffect, useState } from 'react';
import config from '../../../config'
import { SafeAreaView, StyleSheet, Text, View, Button, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CabinetReportWithPlan = (props) => {
    let savingDif = props.saving - props.planSaving;

    let rentDif = props.rent - props.planRent;
    let insuranceDif = props.insurance - props.planInsurance;
    let communicationDif = props.communication - props.planCommunication;
    let subscribeDif = props.subscribe - props.planSubscribe;

    let dinnerDif = props.dinner - props.planDinner;
    let trafficDif = props.traffic - props.planTraffic;
    let hobbyDif = props.hobby - props.planHobby;
    let shoppingDif = props.shopping - props.planShopping;
    let educationDif = props.education - props.planEducation;
    let medicalDif = props.medical - props.planMedical;
    let eventDif = props.event - props.planEvent;
    let ectDif = props.ect - props.planEct;

    let planFixedSum = props.planRent + props.planInsurance + props.planCommunication + props.planSubscribe;
    let fixedSum =  props.rent + props.insurance + props.communication + props.subscribe;

    let planPlannedSum = props.planDinner + props.planTraffic + props.planHobby + props.planShopping + 
    props.planEducation + props.planMedical + props.planEvent + props.planEct;
    let plannedSum = props.dinner + props.traffic + props.hobby + props.shopping + 
    props.education + props.medical + props.event + props.ect;

    let fixedDif = fixedSum - planFixedSum;
    let plannedDif = plannedSum - planPlannedSum;

    return(
        <ScrollView>
            <View style={styles.titleContainer}><Text style={{fontSize: 17, fontWeight: 'bold', color: '#203864', margin:10}}>저금</Text></View>
            <View style={styles.monthDiv}>
                <Text style={styles.monthText}>계획</Text>
                <Text style={styles.monthText}>실제</Text>
            </View>

            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/budget.png')} style={{width: 15, height: 15, tintColor: '#8EB3EE'}}/>
                    </View>
                    <Text>저금 총합</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.planSaving.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                <View style={styles.moneyDiv}><Text>{props.saving.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
            </View>
            <View style={styles.difDiv}>
                { savingDif > 0 && <Icon name={'caret-up-outline'} size={12} color={'red'}/> }
                { savingDif < 0 && <Icon name={'caret-down-outline'} size={12} color={'blue'}/> }
                { savingDif === 0 && <Icon name={'remove-outline'} size={12}/> }

                { savingDif != 0 && <Text style={styles.divText}> {Math.abs(savingDif)}</Text>}
            </View>

            <View style={styles.titleContainer}>
                <Text style={{fontSize: 17, fontWeight: 'bold', color: '#203864', margin:10}}>고정지출</Text>
            </View>
            <View style={styles.monthDiv}>
                <Text style={styles.monthText}>계획</Text>
                <Text style={styles.monthText}>실제</Text>
            </View>

            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Icon name={'log-out-outline'} size={15} color={'#8EB3EE'}/>
                    </View>
                    <Text>월세</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.planRent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
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
                <View style={styles.moneyDiv}><Text>{props.planInsurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
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
                <View style={styles.moneyDiv}><Text>{props.planCommunication.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
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
                <View style={styles.moneyDiv}><Text>{props.planSubscribe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
                <View style={styles.moneyDiv}><Text>{props.subscribe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
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
                    <View style={styles.moneyDiv}><Text style={styles.sumMoneyText}>{planFixedSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
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
                <Text style={styles.monthText}>계획</Text>
                <Text style={styles.monthText}>실제</Text>
            </View>

            <View style={styles.categoryDiv}>
                <View style={styles.leftDiv}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/category/spoon.png')} style={{width: 15, height: 15, tintColor: '#8EB3EE'}}/>
                    </View>
                    <Text>식비</Text>
                </View>
                <View style={styles.moneyDiv}><Text>{props.planDinner.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
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
                <View style={styles.moneyDiv}><Text>{props.planTraffic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
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
                <View style={styles.moneyDiv}><Text>{props.planHobby.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
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
                <View style={styles.moneyDiv}><Text>{props.planShopping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
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
                <View style={styles.moneyDiv}><Text>{props.planEducation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
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
                <View style={styles.moneyDiv}><Text>{props.planMedical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
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
                <View style={styles.moneyDiv}><Text>{props.planEvent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
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
                <View style={styles.moneyDiv}><Text>{props.planEct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
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
                    <View style={styles.moneyDiv}><Text style={styles.sumMoneyText}>{planPlannedSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text></View>
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

export default CabinetReportWithPlan;

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
    sumLogoContainer: {
        padding: 5,
        borderRadius: 20,
        marginRight: 13, 
    },
    sumMoneyText: {
        color: '#203864',
        fontSize: 15,
    }
});