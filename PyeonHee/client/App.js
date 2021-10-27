/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
} from 'react-native';

function App(){
  const [text, setText] = useState("Click this button to connect to server");
  const connect =()=>{
    const URL = "http://IPv4주소:로컬서버포트/welcome";
    fetch(URL).then(response => {
        if(response.status == 200){
            return response.text();
        }
        else {
            throw new Error("Something is wrong");
        }
    }).then(responseText => {
        setText(responseText);
    }).catch(error => {
        console.error(error.message);
    })
  }
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Text>{text}</Text>
      <Button title="connect" onPress={connect}></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle:{
    flex: 1,
  }
});

export default App;