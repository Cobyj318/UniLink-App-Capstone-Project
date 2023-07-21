//////////////////////////////////////////////////////////////////////////////////////
//////////////////This page is for Debugging purposes/////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////Screen Imports///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
import NewUserScreen from './Screens/NewUserScreen';
import SplashScreen from './Screens/SplashScreen'; 
import CamScreen from './Screens/CamScreen';
import UploadThing from './Components/uploadThing';
import EventsScreen from './Screens/EventsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import MessageScreen from './Screens/MessageScreen';
import NewsScreen from './Screens/NewsScreen';
import CreateEventScreen from './Screens/InnerScreenB';
import HomeScreen from './Screens/HomeScreen';
import ChannelScreen from './Screens/ChannelScreen';
//////////////////////////////////////////////////////////////////////////////////////
////////////////////Variable Names for the Screens////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
const OldUser = "MainContainer";
const NewUser = "NewUserScreen";
const Splash = "SplashScreen";
const Cams = "CamScreen";
const uploading= "UploadThing"
const homeName='Home';
const eventsName='Events';
const profileName='Profile';
const messageName='Message';
const newsName='News';
const ChanScreen = 'ChannelScreen';

////////////////////////////////////////////////////////////////////////////////////////
///////////// Creating the Event Stack navigator for the Event tab//////////////////////
////////////////////////////////////////////////////////////////////////////////////////
const InnerStack = createStackNavigator();
const EventStack = () => (
    <InnerStack.Navigator >
    <InnerStack.Screen name={"InnerScreenA"} component={EventsScreen} options={{headerShown: false}} />
    <InnerStack.Screen name={"CreateEventScreen"} component={CreateEventScreen} options={{headerShown: false}}/>
  </InnerStack.Navigator>  
);
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
////////////////// Creating the bottom tab navigator ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
const Tab = createBottomTabNavigator();
const TabNavigator = () => (
    <Tab.Navigator 
    initialRouteName={homeName}
    screenOptions={({route})=>({
      tabBarActiveTintColor: '#3498db',
      tabBarInactiveTintColor: 'grey',
      tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
      tabBarStyle: [{ display: 'flex' }, null],
      tabBarIcon: ({ focused, color, size }) => { // Add tabBarIcon for each screen
        let iconName;
        if (route.name === homeName) {
          iconName = focused ? 'home' : 'home';
        } else if (route.name === eventsName) {
          iconName = focused ? 'calendar' : 'calendar-o';
        } else if (route.name === newsName) {
          iconName = focused ? 'newspaper-o' : 'newspaper-o';
        } else if (route.name === messageName) {
          iconName = focused ? 'envelope' : 'envelope-o';
        } else if (route.name === profileName) {
          iconName = focused ? 'user' : 'user-o';
        }
        return <Icon name={iconName} size={size} color={color} />; // Render the icon component
      },
    })}
  >
    <Tab.Screen name={homeName} component={HomeScreen}/>
    <Tab.Screen name={eventsName} component={EventStack}/>
    <Tab.Screen name={newsName} component={NewsScreen}/>
    <Tab.Screen name={messageName} component={MessageScreen}/>
    <Tab.Screen name={profileName} component={ProfileScreen}/>
    </Tab.Navigator>
);
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
/////////////////// Creating the Main stack navigator //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
const Stack = createStackNavigator();
const MainStack = () => (
  <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name={Splash} component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name={NewUser} component={NewUserScreen} options={{headerShown: false}}/>
        <Stack.Screen name={OldUser} component={TabNavigator} options={{headerShown: false, gestureEnabled: false}}/>
        <Stack.Screen name={Cams} component={CamScreen} options={{headerShown: false}}/>
        <Stack.Screen name={ChanScreen} component={ChannelScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
export default MainStack;
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////