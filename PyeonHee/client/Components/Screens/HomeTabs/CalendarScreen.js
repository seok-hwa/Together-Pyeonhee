import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CalendarDayComponent from './calendarComponent/CalendarDayComponent';
import moment, { relativeTimeThreshold } from 'moment';
import { calendarClick, calendarInfo } from '../../api';
import TransactionList from './calendarComponent/TransactionList';

import { ThemeProvider } from 'styled-components';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일', '월','화','수','목','금','토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

let calendarDate = moment();

class CalendarScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      calendarDate: calendarDate.format('YYYY-MM-DD'),

      horizontal: false,
      dateChanged: moment().format('DD'),
      dayChanged: moment().format('YYYYMMDD'),

      isPressed: true,
      todayTransaction: [],
      monthlyData: {},
      loading: false,
      plusSum: 0,
      minusSum: 0,
    };

    this.onPressListView = this.onPressListView.bind(this);
    this.onPressGridView = this.onPressGridView.bind(this);
    this.onDayPress = this.onDayPress.bind(this);
  }

  onPressListView() {
    this.setState({ horizontal: true });
  }

  onPressGridView() {
    this.setState({ horizontal: false });
  }

  onDayPress(date) {
    calendarDate = moment(date.dateString);

    this.updateCalendarDate();

    console.log(this.state.dayChanged);

    console.log('눌린 날짜'); //눌린 날짜
    console.log(date); //눌린 날짜
    let tempDate = date.dateString.split("-");
    let temp = tempDate[0]+tempDate[1]+tempDate[2];


    this.setState({ 
      dayChanged: temp,
      dateChanged: date.day,
      isPressed: true,
     });

    calendarClick(this.state.userID, temp)
    .then((responseJson)=>{
      console.log('오늘의 거래 내역');
      console.log(responseJson);

      this.setState({
        todayTransaction: responseJson,
      })

      console.log(this.state.todayTransaction);

      if(responseJson.length > 0){
        let tempPlusSum = 0;
        let tempMinusSum = 0;
        responseJson.map( item => {
          if(item.inout_type === '출금'){
              tempMinusSum = tempMinusSum + item.tran_amt;
          } else if(item.inout_type === '입금') {
              tempPlusSum = tempPlusSum + item.tran_amt;
          }
        })
        this.setState({
          plusSum: tempPlusSum,
          minusSum: tempMinusSum,
        })

      }
      
    })
  }

  updateCalendarDate() {
    this.setState({
      calendarDate: calendarDate.format('YYYY-MM-DD')
    });
  }

  componentDidMount () {
    AsyncStorage.getItem('userID', (err, result) => {
      const tempID = result;
      if(tempID!= null){
        this.setState({
          userID: tempID,
        });
      }
    })
    .then(()=>{
        console.log(this.state.userID);
        calendarInfo(this.state.userID)
        .then((responseJson)=>{
          console.log('캘린더 정보 받아오기!');
          console.log(responseJson);

          this.setState({ monthlyData: responseJson});
          // setLoading(true);
        })
        .then(()=>{
          let dayChanged = moment().format('YYYYMMDD');
          calendarClick(this.state.userID, dayChanged)
          .then((responseJson)=>{
                    console.log('오늘의 거래 내역');
                    console.log(responseJson);

                    this.setState({
                      todayTransaction: responseJson,
              })

              console.log(this.state.todayTransaction);

              if(responseJson.length > 0){
                let tempPlusSum = 0;
                let tempMinusSum = 0;
                responseJson.map( item => {
                  if(item.inout_type === '출금'){
                      tempMinusSum = tempMinusSum + item.tran_amt;
                  } else if(item.inout_type === '입금') {
                      tempPlusSum = tempPlusSum + item.tran_amt;
                  }
                })
                this.setState({
                  plusSum: tempPlusSum,
                  minusSum: tempMinusSum,
                })
        
              }
          })
          .then(()=>{
            this.setState({loading: true,});
          })
        })  
        .catch((error) => {
          console.log(error)
        }); 
    })
  }

  render () {   
    // const {closeUpdate} = this.closeUpdate;
    if(this.state.loading === true){
    return (
        <ScrollView style={styles.appSize}>
            <Calendar
                current={this.state.calendarDate}

                dayComponent={CalendarDayComponent}

                // onPressListView={this.onPressListView}
                // onPressGridView={this.onPressGridView}


                //for test
                // markedDates={{
                //   // '2021-12-19': {inout_type: '입금', daily_amt: 2000},
                //   '20211219': {inout_type: '출금', daily_amt: -20000},
                //   '20211220': {inout_type: '출금', daily_amt: -2125000},
                //   '20211225': {inout_type: '입금', daily_amt: 0},
                //   '20211226': {inout_type: '입금', daily_amt: 5000}
                // }}

                // markedDates={this.state.monthlyData}



                onDayPress={this.onDayPress}
                hideExtraDays={true}
                onMonthChange={(month) => {console.log('month changed', month)}}
                monthFormat={'MM월'}
            />
            <View style={styles.transactionContainer}>
              <TransactionList pressedDate={this.state.dateChanged} pressedDay={this.state.dayChanged} 
                isChanged={this.state.isPressed} todayTransaction={this.state.todayTransaction} 
                plusSum={this.state.plusSum} minusSum={this.state.minusSum}
              />
            </View>
        </ScrollView>
      );
    }else{
      return(
      <ScrollView style={styles.appSize}>
            <Calendar
                current={this.state.calendarDate}

                dayComponent={CalendarDayComponent}

                // onPressListView={this.onPressListView}
                // onPressGridView={this.onPressGridView}


                //for test
                // markedDates={{
                //   // '2021-12-19': {inout_type: '입금', daily_amt: 2000},
                //   '20211219': {inout_type: '출금', daily_amt: -20000},
                //   '20211220': {inout_type: '출금', daily_amt: -2125000},
                //   '20211225': {inout_type: '입금', daily_amt: 0},
                //   '20211226': {inout_type: '입금', daily_amt: 5000}
                // }}

                // markedDates={this.state.monthlyData}



                onDayPress={this.onDayPress}
                hideExtraDays={true}
                onMonthChange={(month) => {console.log('month changed', month)}}
                monthFormat={'MM월'}
            />
            <View style={styles.transactionContainer}>
            </View>
        </ScrollView>
      )
    }
}
}

export default CalendarScreen;

const styles = StyleSheet.create({
    appSize: {
        flex: 1,
        backgroundColor: 'white',
    },
    monthText: {
        fontSize: 23, 
        fontWeight:'bold', 
        marginLeft: 15, 
        marginTop: 15,
    },
    transactionContainer: {
      borderTopWidth: 5,
      borderTopColor: '#F2F2F2',
    }
  });