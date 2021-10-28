import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class JoinButton extends Component{
  static defaultProps = {
    onPress: () => null,
  }
  constructor(props){
    super(props);
  }
  render(){
    return(
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Text style={styles.title}>회원가입</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F8F8FF',
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  title: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
})