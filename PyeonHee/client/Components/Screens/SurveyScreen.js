import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import BasicSurveyScreen from './BasicSurveyScreen';
import Mbti1Screen from './Mbti1Screen';
import Mbti2Screen from './Mbti2Screen';
import Mbti3Screen from './Mbti3Screen';
import Mbti4Screen from './Mbti4Screen';
import MbtiResultScreen from './MbtiResultScreen';

const Stack = createNativeStackNavigator();

const SurveyScreen = ({ navigation}) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="Basic"
        component={BasicSurveyScreen}
        options={{
            headerShown: false,
        }} 
        />
        <Stack.Screen
        name="Mbti1"
        component={Mbti1Screen}
        options={{
            headerShown: false,
        }} 
        />
        <Stack.Screen
        name="Mbti2"
        component={Mbti2Screen}
        options={{
            headerShown: false,
        }} 
        />
        <Stack.Screen
        name="Mbti3"
        component={Mbti3Screen}
        options={{
            headerShown: false,
        }} 
        />
        <Stack.Screen
        name="Mbti4"
        component={Mbti4Screen}
        options={{
            headerShown: false,
        }} 
        />
        <Stack.Screen
        name="MbtiResult"
        component={MbtiResultScreen}
        options={{
            headerShown: false,
        }} 
        />
    </Stack.Navigator>
  );
};

export default SurveyScreen;