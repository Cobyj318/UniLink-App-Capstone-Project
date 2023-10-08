import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NotifScreen from '../NotifScreen';
import MessageScreen from '../Messaging_screens/MessageScreen';
import RSVPedEvents from './RSVPed';
import LikedProjectsScreen from './LikedEvents';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import EventDetailsScreen from "./EventDetails";
import CreateEventScreen from "./CreateEventScreen";

const CustomButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name="bell-o" size={24} color="#3498db" />
  </TouchableOpacity>
);

const MessagesButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name="comment-o" size={24} color="#3498db" />
  </TouchableOpacity>
);

const Drawer = createDrawerNavigator();
const homeStack = createStackNavigator();

const HomeStack = () => (
  <homeStack.Navigator >
    <homeStack.Screen name={'Home'} component={HomeScreen} options={{headerShown: false}} />
    <homeStack.Screen name={'EventDetailsScreen'} component={EventDetailsScreen} options={{headerShown: false}}/>
    <homeStack.Screen name={'CreateEventScreen'} component={CreateEventScreen} options={{headerShown: false}}/>
  </homeStack.Navigator>  
);

const DrawerNavigation = () => {
return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={({ navigation }) => ({
            headerRight: () => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 15 }}>
                <View style={{ paddingRight: 20 }}>
                  <CustomButton onPress={() =>  navigation.navigate('Notifications')} />
                </View>
                <View>
                  <MessagesButton onPress={() => navigation.navigate('Messages')} />
                </View>
              </View>
            ),
          })}
        />
        <Drawer.Screen name="Notifications" component={NotifScreen}/>
        <Drawer.Screen name="Messages" component={MessageScreen}/>
        <Drawer.Screen name="RSVPed Events" component={RSVPedEvents}/>
        <Drawer.Screen name="Liked Projects" component={LikedProjectsScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
