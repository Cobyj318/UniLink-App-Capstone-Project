import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './Screens/HomeScreen';
import EventsScreen from './Screens/EventsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import MessageScreen from './Screens/MessageScreen';
import NewsScreen from './Screens/NewsScreen';
import EventContainer from './EventContainer.js';

// Screen names
const homeName = 'Home';
const eventsName = 'Events';
const profileName = 'Profile';
const messageName = 'Message';
const newsName = 'News';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer independent={true}>
      {/* Bottom Tab Navigator */}
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          // Styling for active and inactive tab labels
          tabBarActiveTintColor: '#3498db',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
          // Flex display for the tab bar
          tabBarStyle: [{ display: 'flex' }, null],
        })}
      >
        {/* Individual Screens */}
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={eventsName} component={EventContainer} />
        <Tab.Screen name={newsName} component={NewsScreen} />
        <Tab.Screen name={messageName} component={MessageScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
