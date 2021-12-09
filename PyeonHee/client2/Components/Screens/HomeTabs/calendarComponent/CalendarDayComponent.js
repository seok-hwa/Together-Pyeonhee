import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// const weekDaysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class CalendarDayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onDayPress = this.onDayPress.bind(this);
  }

  getContentStyle() {
    const { state, marking = {}, date, current } = this.props;
    const style= {
      content: {
        borderRadius: 0,
        borderWidth: 0,
        borderColor: '181c26',
      },
      text: {
        color: '#181c26',
      }
    };

    if (state === 'today') {
      style.text.color = '#00f';
    } else if (current === date.dateString) {
      style.content.borderRadius = 50;
      style.content.borderWidth = 1;
      style.content.borderColor = '#216bc9';
    }

    return style;
  }

  getSum() {
    const { marking = {} } = this.props;
    if (typeof marking === 'object') {
      if(marking.inout_type === '입금') {
      if (marking.daily_amt > 0) {
        let temp = marking.daily_amt;

        return temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else if (marking.daily_amt < 0) {
        let temp = marking.daily_amt;

        return temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
    return '';
  }
  return;
  }

  minusSum() {
    const { marking = {} } = this.props;
    if (typeof marking === 'object') {
      if(marking.inout_type === '출금') {
      if (marking.daily_amt > 0) {
        let temp = marking.daily_amt;

        return temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else if (marking.daily_amt < 0) {
        let temp = marking.daily_amt;

        return temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
    return '';
  }
  return;
  }

  onDayPress() {
    this.props.onPress(this.props.date);
  }

  render() {
    const contentStyle = this.getContentStyle();

    return (
      <View style={styles.container}>

        <TouchableOpacity
          style={[styles.content, contentStyle.content]}
          onPress={this.onDayPress}
        >
          <Text style={[styles.contentText, contentStyle.text]}>
            {String(this.props.children)}
          </Text>
          <View>
            <Text style={styles.sumText}>
              {this.getSum()}
            </Text>
            <Text style={styles.minusText}>
              {this.minusSum()}
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

CalendarDayComponent.propTypes = {
  children: PropTypes.any,
  state: PropTypes.string,
  marking: PropTypes.any,
  horizontal: PropTypes.bool,
  date: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  current: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: 53,
    height: 48,
    // backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentText: {
    fontSize: 15
  },
  sumText: {
    marginTop: 5,
    fontSize: 10,
    color: 'blue',
  },
  minusText: {
    marginTop: 5,
    fontSize: 10,
    color: 'red',
  }
});

export default CalendarDayComponent;