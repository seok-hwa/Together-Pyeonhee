import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class BudgetSaveButton extends Component{
  static defaultProps = {
    onPress: () => null,
  }
  constructor(props){
    super(props);
  }
  render(){
    return(
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Text style={styles.title}>저장</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6090FA',
        width: 120,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
      },
      title: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
      },
})