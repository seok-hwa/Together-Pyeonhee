import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StackedBarChart, ProgressChart } from 'react-native-chart-kit';
import { SafeAreaView, StyleSheet, Text, View, Button, ScrollView } from 'react-native';

const ReportWithPlanScreen = (props) => {
    const [userID, setUserID] = useState('');
    const [loading, setLoading] = useState(false);

    const [realRent, setRealRent] = useState(parseInt(props.route.params.withPlan.realRent));
    const [realInsurance, setRealInsurance] = useState(parseInt(props.route.params.withPlan.realInsurance));
    const [realCommunication, setRealCommunication] = useState(parseInt(props.route.params.withPlan.realCommunication));
    const [realSubscribe, setRealSubscribe] = useState(parseInt(props.route.params.withPlan.realSubscribe));

    const [realTraffic, setRealTraffic] = useState(parseInt(props.route.params.withPlan.realTraffic));
    const [realMedical, setRealMedical] = useState(parseInt(props.route.params.withPlan.realMedical));
    const [realEducation, setRealEducation] = useState(parseInt(props.route.params.withPlan.realEducation));
    const [realEct, setRealEct] = useState(parseInt(props.route.params.withPlan.realEct));

    const [realShopping, setRealShopping] = useState(parseInt(props.route.params.withPlan.realShopping));
    const [realHobby, setRealHobby] = useState(parseInt(props.route.params.withPlan.realHobby));
    const [realEvent, setRealEvent] = useState(parseInt(props.route.params.withPlan.realEvent));
    const [realDinner, setRealDinner] = useState(parseInt(props.route.params.withPlan.realDinner));

    const [realSaving, setRealSaving] = useState(parseInt(props.route.params.withPlan.realSaving));

    const [planRent, setPlanRent] = useState(parseInt(props.route.params.withPlan.planRent));
    const [planInsurance, setPlanInsurance] = useState(parseInt(props.route.params.withPlan.planInsurance));
    const [planCommunication, setPlanCommunication] = useState(parseInt(props.route.params.withPlan.planCommunication));
    const [planSubscribe, setPlanSubscribe] = useState(parseInt(props.route.params.withPlan.planSubscribe));

    const [planTraffic, setPlanTraffic] = useState(parseInt(props.route.params.withPlan.planTraffic));
    const [planMedical, setPlanMedical] = useState(parseInt(props.route.params.withPlan.planMedical));
    const [planEducation, setPlanEducation] = useState(parseInt(props.route.params.withPlan.planEducation));
    const [planEct, setPlanEct] = useState(parseInt(props.route.params.withPlan.planEct));

    const [planShopping, setPlanShopping] = useState(parseInt(props.route.params.withPlan.planShopping));
    const [planHobby, setPlanHobby] = useState(parseInt(props.route.params.withPlan.planHobby));
    const [planEvent, setPlanEvent] = useState(parseInt(props.route.params.withPlan.planEvent));
    const [planDinner, setPlanDinner] = useState(parseInt(props.route.params.withPlan.planDinner));

    const [planSaving, setPlanSaving] = useState(parseInt(props.route.params.withPlan.planSaving));

    const realFixTotal = realRent+realInsurance+realCommunication+realSubscribe;
    const planFixTotal = planRent+planInsurance+planCommunication+planSubscribe;

    const realVariableTotal1 = realTraffic+realMedical+realEducation+realEct;
    const planVariableTotal1 = planTraffic+planMedical+planEducation+planEct;

    const realVariableTotal2 = realShopping+realHobby+realEvent+realDinner;
    const planVariableTotal2 = planShopping+planHobby+planEvent+planDinner;

    const realTotal = realFixTotal+realVariableTotal1+realVariableTotal2+realSaving;
    const planTotal = planFixTotal+planVariableTotal1+planVariableTotal2+planSaving;

    const progressPercentage = parseInt(props.route.params.daily_count)/props.date;

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
    const totalSaving = {
        labels: ["예산 계획", "실제 지출"],
        legend: ["저금"],
        data: [[planSaving], [realSaving]],
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
                    <Text>{props.date}</Text>
                    <Text>일 중 </Text>
                    <Text style={styles.realProgressFont}>{props.route.params.daily_count}</Text>
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
                <View style={styles.categoryDiv}>
                    <View style={styles.tableHeadRow}>
                        <Text style={styles.tableAtt}></Text>
                        <Text style={styles.tableHead}>예산 계획</Text>
                        <Text style={styles.tableHead}>실제 지출</Text>
                        <Text style={styles.tableCurrentCol}></Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableAtt}>구독</Text>
                        <Text style={styles.tableCol}>{planSubscribe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={styles.tableCol}>{realSubscribe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={parseInt(difSubscribe) <= 0 ? styles.tableCurrentCol : styles.tableCurrentColPlus}>{difSubscribe}원</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableAtt}>통신</Text>
                        <Text style={styles.tableCol}>{planCommunication.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={styles.tableCol}>{realCommunication.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={parseInt(difCommunication) <= 0 ? styles.tableCurrentCol : styles.tableCurrentColPlus}>{difCommunication}원</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableAtt}>보험</Text>
                        <Text style={styles.tableCol}>{planInsurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={styles.tableCol}>{realInsurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={parseInt(difInsurance) <= 0 ? styles.tableCurrentCol : styles.tableCurrentColPlus}>{difInsurance}원</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableAtt}>월세</Text>
                        <Text style={styles.tableCol}>{planRent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={styles.tableCol}>{realRent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={parseInt(difRent) <= 0 ? styles.tableCurrentCol : styles.tableCurrentColPlus}>{difRent}원</Text>
                    </View>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>예산 계획</Text>
                    <Text style={styles.priceFont}>{planFixTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>실제 지출</Text>
                    <Text style={styles.priceFont}>{realFixTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
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
                <View style={styles.categoryDiv}>
                    <View style={styles.tableHeadRow}>
                        <Text style={styles.tableAtt}></Text>
                        <Text style={styles.tableHead}>예산 계획</Text>
                        <Text style={styles.tableHead}>실제 지출</Text>
                        <Text style={styles.tableCurrentCol}></Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableAtt}>경조사</Text>
                        <Text style={styles.tableCol}>{planEvent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={styles.tableCol}>{realEvent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={parseInt(difEvent) <= 0 ? styles.tableCurrentCol : styles.tableCurrentColPlus}>{difEvent}원</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableAtt}>취미</Text>
                        <Text style={styles.tableCol}>{planHobby.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={styles.tableCol}>{realHobby.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={parseInt(difHobby) <= 0 ? styles.tableCurrentCol : styles.tableCurrentColPlus}>{difHobby}원</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableAtt}>쇼핑</Text>
                        <Text style={styles.tableCol}>{planShopping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={styles.tableCol}>{realShopping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={parseInt(difShopping) <= 0 ? styles.tableCurrentCol : styles.tableCurrentColPlus}>{difShopping}원</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableAtt}>식비</Text>
                        <Text style={styles.tableCol}>{planDinner.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={styles.tableCol}>{realDinner.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={parseInt(difDinner) <= 0 ? styles.tableCurrentCol : styles.tableCurrentColPlus}>{difDinner}원</Text>
                    </View>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>예산 계획</Text>
                    <Text style={styles.priceFont}>{planVariableTotal2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>실제 지출</Text>
                    <Text style={styles.priceFont}>{realVariableTotal2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
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
                <View style={styles.categoryDiv}>
                    <View style={styles.tableHeadRow}>
                        <Text style={styles.tableAtt}></Text>
                        <Text style={styles.tableHead}>예산 계획</Text>
                        <Text style={styles.tableHead}>실제 지출</Text>
                        <Text style={styles.tableCurrentCol}></Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableAtt}>교육</Text>
                        <Text style={styles.tableCol}>{planEducation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={styles.tableCol}>{realEducation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={parseInt(difEducation) <= 0 ? styles.tableCurrentCol : styles.tableCurrentColPlus}>{difEducation}원</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableAtt}>교통</Text>
                        <Text style={styles.tableCol}>{planTraffic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={styles.tableCol}>{realTraffic.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={parseInt(difCommunication) <= 0 ? styles.tableCurrentCol : styles.tableCurrentColPlus}>{difCommunication}원</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableAtt}>의료</Text>
                        <Text style={styles.tableCol}>{planMedical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={styles.tableCol}>{realMedical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={parseInt(difMedical) <= 0 ? styles.tableCurrentCol : styles.tableCurrentColPlus}>{difMedical}원</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableAtt}>기타</Text>
                        <Text style={styles.tableCol}>{planEct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={styles.tableCol}>{realEct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                        <Text style={parseInt(difEct) <= 0 ? styles.tableCurrentCol : styles.tableCurrentColPlus}>{difEct}원</Text>
                    </View>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>예산 계획</Text>
                    <Text style={styles.priceFont}>{planVariableTotal1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>실제 지출</Text>
                    <Text style={styles.priceFont}>{realVariableTotal1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
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
                <Text style={styles.cateFont}>저금</Text>
                <View style={styles.tempRow}>
                    <StackedBarChart
                    data={totalSaving}
                    width={350}
                    height={250}
                    chartConfig={fixConfig}
                    withHorizontalLabels={false}
                />
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>예산 계획</Text>
                    <Text style={styles.priceFont}>{planSaving.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>실제 지출</Text>
                    <Text style={styles.priceFont}>{realSaving.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text>계획 대비</Text>
                    {realSaving - planSaving >= 0 ?
                        <Text style={styles.upFont}>+{Math.abs(realSaving - planSaving).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> :
                        <Text style={styles.downFont}>-{Math.abs(realSaving - planSaving).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
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
                    <Text style={styles.monthFont}>예산 계획</Text>
                    <Text style={styles.priceFont}>{planTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>실제 지출</Text>
                    <Text style={styles.priceFont}>{realTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
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
    tableHeadRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableAtt: {
        width: 40,
        fontSize: 12,
        textAlign: 'right',
    },
    tableCol:{
        width: 100,
        textAlign: 'right',
        fontSize: 12,
    },
    tableHead: {
        width: 100,
        textAlign: 'right',
        fontSize: 14,
        fontWeight: 'bold',
    },
    categoryDiv: {
        marginTop: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    tableCurrentCol: {
        width: 100,
        textAlign: 'right',
        fontWeight: 'bold',
        color: 'blue',
        fontSize: 12,
    },
    tableCurrentColPlus: {
        width: 100,
        textAlign: 'right',
        fontWeight: 'bold',
        color: 'red',
        fontSize: 13,
    },
});