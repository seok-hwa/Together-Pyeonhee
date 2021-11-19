import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CalendarDayComponent from './calendarComponent/CalendarDayComponent';
import moment from 'moment';

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
      calendarDate: calendarDate.format('YYYY-MM-DD'),
      horizontal: false
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
  }

  updateCalendarDate() {
    this.setState({
      calendarDate: calendarDate.format('YYYY-MM-DD')
    });
  }

  render () {   

    return (
        <ScrollView style={styles.appSize}>
            <Calendar
                current={this.state.calendarDate}

                dayComponent={CalendarDayComponent}

                // onPressListView={this.onPressListView}
                // onPressGridView={this.onPressGridView}


                //for test
                markedDates={{
                  '2021-11-19': {sum: 2000},
                  '2021-11-20': {sum: -2125000},
                  '2021-11-25': {sum: 0},
                  '2021-11-26': {sum: 5000}
                }}
                onDayPress={this.onDayPress}
                hideExtraDays={true}
                onMonthChange={(month) => {console.log('month changed', month)}}
                monthFormat={'MM월'}
                    
            />
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
});