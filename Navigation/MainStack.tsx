//////////////////////////////////////////////////////////////////////////////////////
//////////////////This page is The inital container purposes/////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './Screens/TabNavigator';
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////Screen Imports///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
import NewUserScreen from './Screens/First_Screens/NewUserScreen';
import SplashScreen from './Screens/First_Screens/SplashScreen'; 
import CamScreen from './Screens/CamScreen';
import UploadThing from './Components/uploadThing';
import MessageScreen from './Screens/Messaging_screens/MessageScreen';
import LoginScreen from './Screens/First_Screens/LoginScreen';
import SignUpScreen from './Screens/First_Screens/SignUpScreen';
import NotifScreen from './Screens/NotifScreen';
import PortfolioScreen from './Screens/PortfolioScreen';
import CollaborationScreen from './Screens/CollaborationScreen';

//////////////////////////////////////////////////////////////////////////////////////
////////////////////Variable Names for the Screens////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
export const ExistingUser = "TabNavigator"; 
const NewUser = "NewUserScreen";
const Splash = "SplashScreen";
export const Cams = "CamScreen";
const uploading= "UploadThing"
const messageName='Message';
const networkName='Network';
const ChanScreen = 'ChannelScreen';
const networkScreen='Network Screen';
const portfolioName = 'PortfolioScreen';
const collaborationName = 'CollaborationScreen'
export const Login='LoginScreen';
const SignUp ='SignUpScreen';
export const Notifications = "NotifScreen";

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