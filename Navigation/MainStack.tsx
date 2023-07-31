//////////////////////////////////////////////////////////////////////////////////////
//////////////////This page is The inital container purposes/////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {User} from "firebase/auth";
import {onAuthStateChanged} from "firebase/auth";
import { FIREBASE_AUTH } from "../src/firebase_init/firebase";
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';

//////////////////////////////////////////////////////////////////////////////////////
////////////////////Variable Names for the Screens////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
export const ExistingUser = "TabNavigator"; // Export OldUser separately
const NewUser = "NewUserScreen";
const Splash = "SplashScreen";
export const Cams = "CamScreen";
const uploading= "UploadThing"
const homeName='Home';
const eventsName='Events';
const profileName='Profile';
const messageName='Message';
const newsName='News';
const ChanScreen = 'ChannelScreen';
const EventScreen='Event Screen';
export const CreateEventScreens='CreateEventScreen';
export const Login='LoginScreen';
const SignUp ='SignUpScreen';

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
const CustomButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name="envelope-o" size={24} color="#3498db" />
  </TouchableOpacity>
);
export const TabNavigator = () => (
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
    <Tab.Screen name={homeName} component={HomeScreen} options={({ navigation }) => ({
      headerRight: () => (
        <View style={{ paddingRight: 10 }}>
          <CustomButton onPress={() => navigation.navigate(messageName)}/>
        </View>
        ),
      })}/>
    <Tab.Screen name={eventsName} component={EventStack} />
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

  
function MainStack(){
  const [user,setuser] = useState<User|null>(null);
  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH,(user)=>{
      console.log('user',user?.email);
      setuser(user);
    });
  },[]);

  return(
  <NavigationContainer >
    <Stack.Navigator initialRouteName={Splash}> 
        <Stack.Screen name={ExistingUser} component={TabNavigator} options={{ headerShown: false,  gestureEnabled: false}}/>
        <Stack.Screen name={Login} component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={NewUser} component={NewUserScreen} options={{headerShown: true}}/>
        <Stack.Screen name={Cams} component={CamScreen} options={{headerShown: true}}/>
        <Stack.Screen name={Splash} component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name={SignUp} component={SignUpScreen} options={{headerShown: false}}/>

    </Stack.Navigator>
  </NavigationContainer>
  )
};

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