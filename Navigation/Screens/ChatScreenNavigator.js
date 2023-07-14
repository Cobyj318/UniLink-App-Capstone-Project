import * as React from 'react';
import { View, Button } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Card, Layout, Text } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './ChatScreen'
import MessageScreen from './MessageScreen'

const OldUser = "MainContainer";
const NewUser = "NewUserScreen";
const Splash = "SplashScreen";
const Chat = "ChatScreen";
const Message = "MessageScreen";

const Stack = createNativeStackNavigator();

export default function LogInContainer(){
    return(
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName={Message}>
                <Stack.Screen name={Message} component={MessageScreen} options={{headerShown: false}}/>
                <Stack.Screen name={Chat} component={ChatScreen} options={{headerShown: false}} />
                           </Stack.Navigator>
        </NavigationContainer>
    );
}
