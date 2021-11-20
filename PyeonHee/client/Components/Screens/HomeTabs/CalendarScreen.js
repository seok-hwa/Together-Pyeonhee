import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CalendarDayComponent from './calendarComponent/CalendarDayComponent';
import moment, { relativeTimeThreshold } from 'moment';

import TransactionList from './calendarComponent/TransactionList';

import config from '../../../config';

const url = config.url;

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

      monthlyData: {},
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
    // this.setState({ dateChanged: date.day }); 

    // this.setState({ isPressed: true })
    // this.setState({ dayChanged: temp })
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
        console.log(`${url}/calendar?userID=${this.state.userID}`);

        fetch(`${url}/calendar?userID=${this.state.userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
          console.log('캘린더 정보 받아오기!');
          console.log(responseJson);

          this.setState({ monthlyData: responseJson});
          // setLoading(true);
        })  
        .catch((error) => {
          console.log(error)
        }); 
    })
  }

  render () {   
    // const {closeUpdate} = this.closeUpdate;

    return (
        <ScrollView style={styles.appSize}>
            <Calendar
                current={this.state.calendarDate}

                dayComponent={CalendarDayComponent}

                // onPressListView={this.onPressListView}
                // onPressGridView={this.onPressGridView}


                //for test
                // markedDates={{
                //   '2021-11-19': {sum: 2000},
                //   '2021-11-20': {sum: -2125000},
                //   '2021-11-25': {sum: 0},
                //   '2021-11-26': {sum: 5000}
                // }}

                markedDates={this.state.monthlyData}



                onDayPress={this.onDayPress}
                hideExtraDays={true}
                onMonthChange={(month) => {console.log('month changed', month)}}
                monthFormat={'MM월'}
            />
            <View style={styles.transactionContainer}>
              {/* {this.state.isPressed === true && 
                <TransactionList pressedDate={this.state.dateChanged} pressedDay={this.state.dayChanged} 
                isChanged={this.state.isPressed}/>
              } */}
              <TransactionList pressedDate={this.state.dateChanged} pressedDay={this.state.dayChanged} 
              isChanged={this.state.isPressed}/>
            </View>
        </ScrollView>
    );
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
      // backgroundColor: 'pink',
      borderTopWidth: 5,
      borderTopColor: '#F2F2F2',

    }
  });