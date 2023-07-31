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
import CreateEventScreen from './Screens/CreateEventScreen';
import HomeScreen from './Screens/HomeScreen';
import EventDetailsScreen from './Screens/EventDetails';
import { View } from 'react-native';

//////////////////////////////////////////////////////////////////////////////////////
////////////////////Variable Names for the Screens////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
export const ExistingUser = "TabNavigator"; // Export OldUser separately
const NewUser = "NewUserScreen";
const Splash = "SplashScreen";
export const Cams = "CamScreen";
const CamNav = "CameraNav";
const uploading= "UploadThing"
const homeName='Home';
const eventsName='Events';
const profileName='Profile';
const messageName='Message';
const newsName='News';
const ChanScreen = 'ChannelScreen';
const EventScreen='Event Screen';
export const CreateEventScreens='CreateEventScreen';
////////////////////////////////////////////////////////////////////////////////////////
///////////// Creating the Event Stack navigator for the Event tab//////////////////////
////////////////////////////////////////////////////////////////////////////////////////
const InnerStack = createStackNavigator();
const EventStack = () => (
    <InnerStack.Navigator >
    <InnerStack.Screen name={EventScreen} component={EventsScreen} options={{headerShown: false}} />
    <InnerStack.Screen name={'CreateEventScreen'} component={CreateEventScreen} options={{headerShown: false}}/>
    <InnerStack.Screen name={'EventDetailsScreen'} component={EventDetailsScreen} options={{headerShown: false}}/>
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
        return (
          <View style={{ paddingTop: 8 }}>
            <Icon name={iconName} size={size} color={color} /> 
          </View>
        );
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
  <NavigationContainer independent={true}>
    <Stack.Navigator>
        <Stack.Screen name={Splash} component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name={NewUser} component={NewUserScreen} options={{headerShown: true}}/>
        <Stack.Screen name={ExistingUser} component={TabNavigator} options={{headerShown: false, gestureEnabled: false}}/>
        <Stack.Screen name={CamNav} component={CameraNav}/>
    </Stack.Navigator>
  </NavigationContainer>
);
export default MainStack;
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Camera Stack Navigation ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
const CamStack = createStackNavigator();
export const CameraNav = () => (
  <NavigationContainer independent={true}>
    <CamStack.Navigator>
      <CamStack.Screen name={uploading} component={UploadThing}/>
      <CamStack.Screen name={Cams} component={CamScreen}/>
    </CamStack.Navigator>
  </NavigationContainer>
);
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////