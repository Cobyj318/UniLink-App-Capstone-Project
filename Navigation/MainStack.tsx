//////////////////////////////////////////////////////////////////////////////////////
//////////////////This page is The inital container purposes/////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////Screen Imports///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
import NewUserScreen from './Screens/First_Screens/NewUserScreen';
import SplashScreen from './Screens/First_Screens/SplashScreen'; 
import CamScreen from './Screens/CamScreen';
import UploadThing from './Components/uploadThing';
import EventsScreen from './Screens/Event_Screens/EventsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import MessageScreen from './Screens/Messaging_screens/MessageScreen';
import NetworkScreen from './Screens/NetworkScreen'; 
import NewsScreen from './Screens/News_screens/NewsScreen';
import CreateEventScreen from './Screens/Event_Screens/CreateEventScreen';
import HomeScreen from './Screens/HomeScreen';
import EventDetailsScreen from './Screens/Event_Screens/EventDetails';
import LoginScreen from './Screens/First_Screens/LoginScreen';
import SignUpScreen from './Screens/First_Screens/SignUpScreen';
import NotifScreen from './Screens/NotifScreen';
import PortfolioScreen from './Screens/PortfolioScreen';
import CollaborationScreen from './Screens/CollaborationScreen';

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
const networkName='Network';
const ChanScreen = 'ChannelScreen';
const EventScreen='Event Screen';
const networkScreen='Network Screen';
const portfolioName = 'PortfolioScreen';
const collaborationName = 'CollaborationScreen'
export const CreateEventScreens='CreateEventScreen';
export const Login='LoginScreen';
const SignUp ='SignUpScreen';
export const Notifications = "NotifScreen";
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
///////////// Creating the Event Stack navigator for the Event tab//////////////////////
////////////////////////////////////////////////////////////////////////////////////////
const homeStack = createStackNavigator();
const HomeStack = () => (
  <homeStack.Navigator >
    <homeStack.Screen name={homeName} component={HomeScreen} options={{headerShown: false}} />
    <homeStack.Screen name={'EventDetailsScreen'} component={EventDetailsScreen} options={{headerShown: false}}/>
  </homeStack.Navigator>  
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
    <Icon name="th-list" size={24} color="#3498db" />
  </TouchableOpacity>
);
const MessagesButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name="comment-o" size={24} color="#3498db" />
  </TouchableOpacity>
);
export const TabNavigator = () => (
    <Tab.Navigator 
    initialRouteName={homeName}
    screenOptions={({route})=>({
      tabBarActiveTintColor: '#3498db',
      tabBarInactiveTintColor: 'grey',
      tabBarLabelStyle: { paddingBottom: 3, fontSize: 10 },
      tabBarStyle: [{ display: 'flex' }, null],
      tabBarIcon: ({ focused, color, size }) => { // Add tabBarIcon for each screen
        let iconName;
        if (route.name === homeName) {
          iconName = focused ? 'home' : 'home';
        } else if (route.name === eventsName) {
          iconName = focused ? 'calendar' : 'calendar-o';
        } else if (route.name === newsName) {
          iconName = focused ? 'newspaper-o' : 'newspaper-o';
        } else if (route.name === networkName) {
          iconName = focused ? 'user-plus' : 'user-plus';
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
    <Tab.Screen name={homeName} component={HomeStack} options={({ navigation }) => ({
      headerRight: () => (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  paddingRight: 15 }}>
          <View style={{paddingRight:20}}>
          <CustomButton onPress={() => navigation.navigate(Notifications)}/>
          </View>
          <View>
          <MessagesButton onPress={() => navigation.navigate(messageName)}/>
          </View>
        </View>
        ),
      })}/>
    <Tab.Screen name={eventsName} component={EventStack} />
    <Tab.Screen name={newsName} component={NewsScreen}/>
    <Tab.Screen name={networkName} component={NetworkScreen}/>
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

function MainStack() {
  
  return(
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name={Splash} component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name={ExistingUser} component={TabNavigator} options={{ headerShown: false,  gestureEnabled: false}}/>
        <Stack.Screen name={Login} component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={NewUser} component={NewUserScreen} options={{headerShown: true}}/>
        <Stack.Screen name={Cams} component={CamScreen} options={{headerShown: true}}/>
        <Stack.Screen name={SignUp} component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name={messageName} component={MessageScreen} options={{headerShown: true}}/>
        <Stack.Screen name={portfolioName} component={PortfolioScreen} options={{headerShown: true}}/>
        <Stack.Screen name={Notifications} component={NotifScreen} options={{headerShown: true}}/>
        <Stack.Screen name={collaborationName} component={CollaborationScreen} options={{headerShown: true}}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}



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