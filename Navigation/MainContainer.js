import * as React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//
import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import SettingsScreen from './Screens/SettingsScreen';

//Screen names 
const homeName='Home';
const detailsName='Details';
const settingsName='Settings';

const Tab=createBottomTabNavigator();

export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route})=>({
                tabBarIcons:({focused,color,size})=>{
                    let iconName;
                    let rn=route.name;
                    if(rn===homeName){
                        iconName=focused?'home':'home-outine'
                    } else if (rn === detailsName){
                        iconName=focused?'list':'list-outine'
                    }else if (rn ===settingsName){
                        iconName=focused?'settings':'settings-outline'
                    }
                    return <Ionicons name={iconName} size ={size} color={colore}/>

                },
            
            })}
            tabBarOptions={{
                activateTintColor:'tomato',
                inactiveTintColor:'grey',
                labelStyle:{paddingBottom:10, fontsize:10},
                style:{padding: 10,height:70}
            }}
            >
            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={detailsName} component={DetailsScreen}/>
            <Tab.Screen name={settingsName} component={SettingsScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    );
}
