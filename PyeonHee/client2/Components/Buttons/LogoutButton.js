import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class LoginButton extends Component{
  static defaultProps = {
    onPress: () => null,
  }
  constructor(props){
    super(props);
  }
  render(){
    return(
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Text style={styles.title}>로그아웃</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0000CD',
        width: 250,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
      },
      title: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
      },
})