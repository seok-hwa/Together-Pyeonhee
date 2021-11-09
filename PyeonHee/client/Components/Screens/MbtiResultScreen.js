import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView, StyleSheet, Text, View, Button, } from 'react-native';
import { StackedBarChart } from 'react-native-svg-charts';

const MbtiScreen = ({navigation, route}) => {
  const [url, setUrl] = useState('');
  const [userID, setUserID] = useState('');
  const [mbtiType, setMbtiType] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    let tempID;
    let tempUrl;
    AsyncStorage.getItem("userID")
    .then(
        (value) => {
            if (value !== null){
                tempID=value
                setUserID(tempID);
            }
        }
    )
    .then( () => {
        AsyncStorage.getItem("url")
        .then((value) => {
            if (value !== null){
              tempUrl=value;
              setUrl(tempUrl);
            }
        })
        .then(()=>{
            console.log(tempID);
            console.log(tempUrl);
            fetch(`${tempUrl}/mbti-info?userID=${tempID}`)   //get
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('Mbti Info');
                console.log(responseJson);
                setMbtiType(responseJson.mbtiType);

                setLoading(true);
            })  
        })
    })
    .catch((error)=>{
        console.error(error);
    })
  }, [])  

  var data1 = [{
    left: route.params.mbti1Score,
    right: 100-route.params.mbti1Score
  },]
  var data2 = [{
    left: route.params.mbti2Score,
    right: 100-route.params.mbti2Score
  },]
  var data3 = [{
    left: route.params.mbti3Score,
    right: 100-route.params.mbti3Score
  },]
  var data4 = [{
    left: route.params.mbti4Score,
    right: 100-route.params.mbti4Score
  },]


  return (
    <View style={styles.appSize}>

      <View style={styles.appTopBar}>
        <View style={styles.barTop}>
          <Text style={styles.logoMbti}>소비 성향 MBTI 테스트 결과</Text>
        </View>
      </View>

      <ScrollView style={styles.appBody}>
        <View>
            <View style={styles.typeBox}>
                <Text style={styles.typeText}>소비 성향 MBTI: {mbtiType} 형</Text>
            </View>

            <View style={styles.resultBox}>
                <View style={styles.resultDivBox}>
                    <View style={styles.resultName}>
                        <Text style={styles.resultTag}>소비중심</Text>
                    </View>
                    <View style={styles.graphContainer}>
                        <View style={styles.graphTag}>
                            <Text>즉흥(I)</Text>
                            <Text>({route.params.mbti1Score}%)</Text>
                        </View>
                        <View style={styles.graphPos}>
                            <View style={{width: 200 }}>
                                <StackedBarChart
                                    style={{ height: 10 }}
                                    keys={['left', 'right']}
                                    colors={
                                        (route.params.mbti1Score > 50) ? ['#AD61CB', '#E5CDEF'] : ['#E5CDEF', '#AD61CB']}
                                    data={data1}
                                    showGrid={false}
                                    horizontal= {true}
                                />
                            </View>
                        </View>
                        <View style={styles.graphTag}>
                            <Text>계획(P)</Text>
                            <Text>({100-route.params.mbti1Score}%)</Text>
                        </View>
                    </View>

                    <View style={styles.graphContainer}>
                        <View style={styles.graphTag}>
                            <Text>소비형(C)</Text>
                            <Text>({route.params.mbti2Score}%)</Text>
                        </View>
                        <View style={styles.graphPos}>
                            <View style={{width: 200 }}>
                                <StackedBarChart
                                    style={{ height: 10 }}
                                    keys={['left', 'right']}
                                    colors={
                                        (route.params.mbti2Score > 50) ? ['#AD61CB', '#E5CDEF'] : ['#E5CDEF', '#AD61CB']}
                                    data={data2}
                                    showGrid={false}
                                    horizontal= {true}
                                />
                            </View>
                        </View>
                        <View style={styles.graphTag}>
                            <Text>절약형(H)</Text>
                            <Text>({100-route.params.mbti2Score}%)</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.resultDivBox}>
                    <View style={styles.resultName}>
                        <Text style={styles.resultTag}>소비습관</Text>
                    </View>
                    <View style={styles.graphContainer}>
                        <View style={styles.graphTag}>
                            <Text>본인(S)</Text>
                            <Text>({route.params.mbti3Score}%)</Text>
                        </View>
                        <View style={styles.graphPos}>
                            <View style={{width: 200 }}>
                                <StackedBarChart
                                    style={{ height: 10 }}
                                    keys={['left', 'right']}
                                    colors={
                                        (route.params.mbti3Score > 50) ? ['#AD61CB', '#E5CDEF'] : ['#E5CDEF', '#AD61CB']}
                                    data={data3}
                                    showGrid={false}
                                    horizontal= {true}
                                />
                            </View>
                        </View>
                        <View style={styles.graphTag}>
                            <Text>타인(O))</Text>
                            <Text>({100-route.params.mbti3Score}%)</Text>
                        </View>
                    </View>

                    <View style={styles.graphContainer}>
                        <View style={styles.graphTag}>
                            <Text>경험(E)</Text>
                            <Text>({route.params.mbti4Score}%)</Text>
                        </View>
                        <View style={styles.graphPos}>
                            <View style={{width: 200 }}>
                                <StackedBarChart
                                    style={{ height: 10 }}
                                    keys={['left', 'right']}
                                    colors={
                                        (route.params.mbti4Score > 50) ? ['#AD61CB', '#E5CDEF'] : ['#E5CDEF', '#AD61CB']}
                                    data={data4}
                                    showGrid={false}
                                    horizontal= {true}
                                />
                            </View>
                        </View>
                        <View style={styles.graphTag}>
                            <Text>물질(M)</Text>
                            <Text>({100-route.params.mbti4Score}%)</Text>
                        </View>

                    </View>
                </View>
            </View>
        </View>
      </ScrollView>

    </View>
  )
}
const styles = StyleSheet.create({
  appSize: {
      flex: 1,
  },
  appTopBar: {
      height: 100,
  },
  barTop: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
  },
  logoMbti:{
    marginTop: 30,
    fontSize: 25,
    fontWeight: 'bold',
  },
  appBody: {
    borderTopWidth: 2,
    borderColor: '#DCDCDC',
    height: 1200,
  },
  typeBox: {
    margin: 8,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
  },
  typeText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3861AA',
  },
  resultBox: {
    margin: 8,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
  },
  resultDivBox: {
    margin: 8,
    alignItems: 'center',
  },
  resultName: {
    margin: 10,
    height: 30,
    width: 80,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resultNameStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
  resultTag: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
  graphContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  graphPos: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
  },
  graphTag: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
  },
});
export default MbtiScreen;