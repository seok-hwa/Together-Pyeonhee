import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import BudgetScreen from './BudgetScreen';
import AssetsScreen from './AssetsScreen';
import MyPageScreen from './MyPageScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { Root, Popup, SPSheet } from 'react-native-popup-confirm-toast';

const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation}) => {

  const [userID, setUserID] = useState('');

  useEffect(()=>{
    console.log('메인 렌더링');
    AsyncStorage.getItem('userID', (err, result) => {
      const tempID = result;
      if(tempID!= null){
        setUserID(tempID);
      }
    });
  })

  return (
    <Root>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({color, size }) => {
          let iconName;

          if (route.name === '편히') {
            iconName = 'person-outline'
          } else if (route.name === '가계부') {
            iconName = 'folder-outline';
          } else if (route.name === '자산') {
            iconName = 'card-outline';
          } else if (route.name === '마이페이지') {
            iconName = 'menu-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2B6CA7',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen name="편히" component={HomeScreen} initialParams={{ menuID: 0 }}/>
        <Tab.Screen name="가계부" component={BudgetScreen} initialParams={{ menuID: 1 }}/>
        <Tab.Screen name="자산" component={AssetsScreen} initialParams={{ menuID: 2 }}/>
        <Tab.Screen name="마이페이지" component={MyPageScreen} initialParams={{ menuID: 3 }}/>
      </Tab.Navigator>
      </Root>
  );
};

export default MainScreen;