import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default class BackButton extends Component{
  static defaultProps = {
    onPress: () => null,
  }
  constructor(props){
    super(props);
  }
  render(){
    return(
        <Icon name="arrow-back-outline" size={30} color={'gray'} onPress={this.props.onPress}></Icon>
    );
  }
}