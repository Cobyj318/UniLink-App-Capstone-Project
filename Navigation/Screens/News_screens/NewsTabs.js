import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 

import NewsDetailsScreen from './NewsDetails';
import SportsNewsScreen from './SportsNewsScreen';
import LatechNewsScreen from './LatechNewsScreen';

const Tab = createMaterialTopTabNavigator();
const LatechStack = createStackNavigator();

// Stack navigator for LatechNewsScreen
function LatechStackScreen() {
  
  return (
    <LatechStack.Navigator screenOptions={{headerShown: false, }}>
      <LatechStack.Screen name="LatechNews" component={LatechNewsScreen}/>
      <LatechStack.Screen name="NewsDetailsScreen" component={NewsDetailsScreen} />
    </LatechStack.Navigator>
  );
}

export default function NewsScreen() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="LaTech" component={LatechStackScreen} />
        <Tab.Screen name="Sports" component={SportsNewsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
