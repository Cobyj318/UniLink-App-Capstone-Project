import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NewUserScreen from './Screens/NewUserScreen';
import MainContainer from './MainContainer';
import SplashScreen from './Screens/SplashScreen'; 

const OldUser = "MainContainer";
const NewUser = "NewUserScreen";
const Splash = "SplashScreen";

const Stack = createNativeStackNavigator();

export default function LogInContainer(){
    return(
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName={Splash}>
                <Stack.Screen name={Splash} component={SplashScreen} options={{headerShown: false}}/>
                <Stack.Screen name={NewUser} component={NewUserScreen} options={{headerShown: false}}/>
                <Stack.Screen name={OldUser} component={MainContainer} options={{headerShown: false, gestureEnabled: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}