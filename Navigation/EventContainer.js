import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EventsScreen from './Screens/EventsScreen';
import InnerScreenB from './Screens/InnerScreenB';

const InnerStack = createStackNavigator();

const InnerStackScreen = () => (
  <InnerStack.Navigator >
    <InnerStack.Screen name="InnerScreenA" component={EventsScreen} options={{headerShown: false}} />
    <InnerStack.Screen name="InnerScreenB" component={InnerScreenB} options={{headerShown: true}}/>
  </InnerStack.Navigator>  
);

export default InnerStackScreen;
