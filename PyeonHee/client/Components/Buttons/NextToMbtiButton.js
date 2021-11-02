import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class NextToMbtiButton extends Component{
  static defaultProps = {
    onPress: () => null,
  }
  constructor(props){
    super(props);
  }
  render(){
    return(
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Text style={styles.title}>소비성향 MBTI 테스트 진행하기</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0000CD',
        width: 300,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 5,
      },
      title: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
      },
})