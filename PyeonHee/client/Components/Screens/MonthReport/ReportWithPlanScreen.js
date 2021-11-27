import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../../config';
import { StackedBarChart, ProgressChart } from 'react-native-chart-kit';
import { SafeAreaView, StyleSheet, Text, View, Button, ScrollView } from 'react-native';

const url = config.url;
const ReportWithPlanScreen = (props) => {
    const [userID, setUserID] = useState('');
    const [loading, setLoading] = useState(false);

    const [realRent, setRealRent] = useState(200000);
    const [realInsurance, setRealInsurance] = useState(100000);
    const [realCommunication, setRealCommunication] = useState(100000);
    const [realSubscribe, setRealSubscribe] = useState(50000);

    const [realTraffic, setRealTraffic] = useState(100000);
    const [realMedical, setRealMedical] = useState(120000);
    const [realEducation, setRealEducation] = useState(100000);
    const [realEct, setRealEct] = useState(100000);

    const [realShopping, setRealShopping] = useState(300000);
    const [realHobby, setRealHobby] = useState(150000);
    const [realEvent, setRealEvent] = useState(210000);
    const [realDinner, setRealDinner] = useState(100000);

    const [planRent, setPlanRent] = useState(200000);
    const [planInsurance, setPlanInsurance] = useState(100000);
    const [planCommunication, setPlanCommunication] = useState(120000);
    const [planSubscribe, setPlanSubscribe] = useState(40000);

    const [planTraffic, setPlanTraffic] = useState(130000);
    const [planMedical, setPlanMedical] = useState(150000);
    const [planEducation, setPlanEducation] = useState(90000);
    const [planEct, setPlanEct] = useState(60000);

    const [planShopping, setPlanShopping] = useState(210000);
    const [planHobby, setPlanHobby] = useState(150000);
    const [planEvent, setPlanEvent] = useState(280000);
    const [planDinner, setPlanDinner] = useState(60000);

    const realFixTotal = realRent+realInsurance+realCommunication+realSubscribe;
    const planFixTotal = planRent+planInsurance+planCommunication+planSubscribe;

    const realVariableTotal1 = realTraffic+realMedical+realEducation+realEct;
    const planVariableTotal1 = planTraffic+planMedical+planEducation+planEct;

    const realVariableTotal2 = realShopping+realHobby+realEvent+realDinner;
    const planVariableTotal2 = planShopping+planHobby+planEvent+planDinner;

    const realTotal = realFixTotal+realVariableTotal1+realVariableTotal2;
    const planTotal = planFixTotal+planVariableTotal1+planVariableTotal2;

    const [realProgress, setRealProgress] = useState(26);
    const [plannedProgress, setPlannedProgress] = useState(30);

    const progressPercentage = realProgress/plannedProgress;

    const difRent = realRent - planRent < 0 ? " -"+ Math.abs(realRent - planRent).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(realRent - planRent).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difInsurance = realInsurance - planInsurance < 0? " -"+ Math.abs(realInsurance - planInsurance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(realInsurance - planInsurance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difCommunication = realCommunication - planCommunication < 0? " -"+ Math.abs(realCommunication - planCommunication).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(realCommunication - planCommunication).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difSubscribe = realSubscribe - planSubscribe < 0? " -"+ Math.abs(realSubscribe - planSubscribe).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(realSubscribe - planSubscribe).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difMedical = realMedical - planMedical < 0? " -"+ Math.abs(realMedical - planMedical).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(realMedical - planMedical).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difTraffic = realTraffic - planTraffic < 0? " -"+ Math.abs(realTraffic - planTraffic).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(realTraffic - planTraffic).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difEducation = realEducation - planEducation < 0? " -"+ Math.abs(realEducation - planEducation).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(realEducation - planEducation).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difEvent = realEvent - planEvent < 0? " -"+ Math.abs(realEvent - planEvent).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(realEvent - planEvent).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difHobby = realHobby - planHobby < 0? " -"+ Math.abs(realHobby - planHobby).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(realHobby - planHobby).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difShopping = realShopping - planShopping < 0? " -"+ Math.abs(realShopping - planShopping).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(realShopping - planShopping).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difDinner = realDinner - planDinner < 0? " -"+ Math.abs(realDinner - planDinner).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(realDinner - planDinner).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const difEct = realEct - planEct < 0? " -"+ Math.abs(realEct - planEct).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : " +"+ Math.abs(realEct - planEct).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const progressConfig = {
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(50, 50, 100, ${opacity})`,
        style: {
          borderRadius: 30
        },
    };
    const progressChartData = {
        labels: ["이행률"], // optional
        data: [progressPercentage]
    };
    const fixData = {
        labels: ["예산 계획", "실제 지출"],
        legend: [`월세${difRent}`, `보험${difInsurance}`, `통신${difCommunication}`, `구독${difSubscribe}`],
        data: [[planRent, planInsurance, planCommunication, planSubscribe], [realRent, realInsurance, realCommunication, realSubscribe]],
        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be", "#9494a4"]
      };
    const fixConfig = {
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
    };
    const variable1Data = {
        labels: ["예산 계획","실제 지출"],
        legend: [`기타${difEct}`, `의료${difMedical}`, `교통${difTraffic}`, `교육${difEducation}`],
        data: [[planEct, planMedical, planTraffic, planEducation], [realEct, realMedical, realTraffic, realEducation]],
        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be", "#9494a4"]
    }
    const variable2Data = {
        labels: ["예산 계획", "실제 지출"],
        legend: [`식비${difDinner}`, `쇼핑${difShopping}`, `취미${difHobby}`, `경조사${difEvent}`],
        data: [[planDinner, planShopping, planHobby, planEvent], [realDinner, realShopping, realHobby, realEvent]],
        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be", "#9494a4"]
    }
    const totalData = {
        labels: ["예산 계획", "실제 지출"],
        legend: ["총액"],
        data: [[planTotal], [realTotal]],
        barColors: ["#ced6e0"]
    }

    useEffect(()=>{
        AsyncStorage.getItem('userID', (err, result) => {
            const tempID = result;
            if(tempID!= null){
                setUserID(tempID);
            }
        })
        .then(()=>{
            /*
            fetch(`${url}/monthReportWithplan?userID=${tempID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                setRealRent(responseJson.realRent);
                setRealInsurance(responseJson.realInsurance);
                setRealCommunication(responseJson.realCommunication);
                setRealSubscribe(responseJson.realSubscribe);
                setRealTraffic(responseJson.realTraffic);
                setRealMedical(responseJson.realMedical);
                setRealEducation(responseJson.realEducation);
                setRealEct(responseJson.realEct);
                setRealShopping(responseJson.realShopping);
                setRealHobby(responseJson.realHobby);
                setRealEvent(responseJson.realEvent);
                setRealDinner(responseJson.realDinner);

                setPlanRent(responseJson.planRent);
                setPlanInsurance(responseJson.planInsurance);
                setPlanCommunication(responseJson.planCommunication);
                setPlanSubscribe(responseJson.planSubscribe);
                setPlanTraffic(responseJson.planTraffic);
                setPlanMedical(responseJson.planMedical);
                setPlanEducation(responseJson.planEducation);
                setPlanEct(responseJson.planEct);
                setPlanShopping(responseJson.planShopping);
                setPlanHobby(responseJson.planHobby);
                setPlanEvent(responseJson.planEvent);
                setPlanDinner(responseJson.planDinner);

                setRealProgress(responseJson.realProgress);
                setPlannedProgress(responseJson.plannedProgress);
            })
            .then(()=>{
                setLoading(true);
            })*/

            //for test
            setLoading(true);
          })
    })

    if(loading === true){
    return (
        <ScrollView style={styles.appSize}>
            <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>{props.month}월 예산 계획 이행률</Text>
                <View style={styles.tempRow}>
                <ProgressChart
                data={progressChartData}
                width={300}
                height={150}
                chartConfig={progressConfig}
                hideLegend={false}
                />
                </View>
                <View style={styles.progressDiv}>
                    <Text>총 </Text>
                    <Text>{plannedProgress}</Text>
                    <Text>일 중 </Text>
                    <Text style={styles.realProgressFont}>{realProgress}</Text>
                    <Text>일 이행</Text>
                </View>
            </View>
            <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>고정지출</Text>
                <View style={styles.tempRow}>
                    <StackedBarChart
                    data={fixData}
                    width={350}
                    height={250}
                    chartConfig={fixConfig}
                    withHorizontalLabels={false}
                />
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>실제 지출</Text>
                    <Text style={styles.priceFont}>{realFixTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>예산 계획</Text>
                    <Text style={styles.priceFont}>{planFixTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text>계획 대비</Text>
                    {realFixTotal - planFixTotal > 0 ?
                        <Text style={styles.upFont}>+{Math.abs(realFixTotal - planFixTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> :
                        <Text style={styles.downFont}>-{Math.abs(realFixTotal - planFixTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    }
                </View>
            </View>
            <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>계획지출(경조사+취미+쇼핑+식비)</Text>
                <View style={styles.tempRow}>
                    <StackedBarChart
                    data={variable2Data}
                    width={350}
                    height={250}
                    chartConfig={fixConfig}
                    withHorizontalLabels={false}
                />
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>실제 지출</Text>
                    <Text style={styles.priceFont}>{realVariableTotal2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>예산 계획</Text>
                    <Text style={styles.priceFont}>{planVariableTotal2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text>계획 대비</Text>
                    {realVariableTotal2 - planVariableTotal2 > 0 ?
                        <Text style={styles.upFont}>+{Math.abs(realVariableTotal2 - planVariableTotal2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> :
                        <Text style={styles.downFont}>-{Math.abs(realVariableTotal2 - planVariableTotal2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    }
                </View>
            </View>
            <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>계획지출(교육+교통+의료+기타)</Text>
                <View style={styles.tempRow}>
                    <StackedBarChart
                    data={variable1Data}
                    width={350}
                    height={250}
                    chartConfig={fixConfig}
                    withHorizontalLabels={false}
                />
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>실제 지출</Text>
                    <Text style={styles.priceFont}>{realVariableTotal1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>예산 계획</Text>
                    <Text style={styles.priceFont}>{planVariableTotal1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text>계획 대비</Text>
                    {realVariableTotal1 - planVariableTotal1 > 0 ?
                        <Text style={styles.upFont}>+{Math.abs(realVariableTotal1 - planVariableTotal1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> :
                        <Text style={styles.downFont}>-{Math.abs(realVariableTotal1 - planVariableTotal1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    }
                </View>
            </View>
            <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>총지출</Text>
                <View style={styles.tempRow}>
                    <StackedBarChart
                    data={totalData}
                    width={350}
                    height={250}
                    chartConfig={fixConfig}
                    withHorizontalLabels={false}
                />
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>실제 지출</Text>
                    <Text style={styles.priceFont}>{realTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>예산 계획</Text>
                    <Text style={styles.priceFont}>{planTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text>계획 대비</Text>
                    {realTotal - planTotal >= 0 ?
                        <Text style={styles.upFont}>+{Math.abs(realTotal - planTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> :
                        <Text style={styles.downFont}>-{Math.abs(realTotal - planTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    }
                </View>
            </View>
        </ScrollView>
    )
    }else{
        return(
            <View style={styles.appSize}>
                
            </View>
        )
    }
}

export default ReportWithPlanScreen;

const styles = StyleSheet.create({
    appSize: {
      flex: 1,
    },
    cateFont: {
        fontSize: 17,
        fontWeight: 'bold',
        margin: 10,
    },
    tempRow: {
        alignItems: 'center',
    },
    fixDiv: {
        marginTop: 20,
        margin: 10,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    monthRow: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    monthFont: {
        width: 90,
    },
    priceFont:{
        width: 140,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    upFont:{
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
        width: 130,
        textAlign: 'right',
    },
    downFont:{
        color: 'blue',
        fontSize: 14,
        fontWeight: 'bold',
        width: 130,
        textAlign: 'right',
    },
    resultDiv: {
        flexDirection: 'row',
        padding: 10,
    },
    nameHighlight: {
        fontWeight: 'bold',
    },
    mbtiHighlight:{
        fontWeight: 'bold',
        color: 'blue',
    },
    realProgressFont: {
        fontWeight: 'bold',
        color: 'blue',
    },
    progressDiv: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonDiv: {
        alignItems: 'center',
    },
    descriptionDiv:{
        padding: 10,
    },
});