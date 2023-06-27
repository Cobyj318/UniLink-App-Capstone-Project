import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//
import HomeScreen from './Screens/HomeScreen';
import EventsScreen from './Screens/EventsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import MessageScreen from './Screens/MessageScreen';
import NewsScreen from './Screens/NewsScreen';


//Screen names 
const homeName='Home';
const eventsName='Events';
const profileName='Profile';
const messageName='Message';
const newsName='News';

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
                        iconName=focused?'home':'home-outline'
                    } else if (rn === eventsName){
                        iconName=focused?'list':'list-outline'
                    }else if (rn ===profileName){
                        iconName=focused?'settings':'settings-outline'
                    }else if (rn ===messageName){
                        iconName=focused?'settings':'settings-outline'
                    }else if (rn ===newsName){
                        iconName=focused?'settings':'settings-outline'
                    }
                    return <Ionicons name={iconName} size ={size} color={colore}/>

                },
                tabBarActiveTintColor:'red',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: {
                    paddingBottom: 10,
                    fontSize: 10,
                },
                tabBarStyle: [
                    {
                    display: 'flex',
                    },
                    null,
                ],
                  
            })}
            
            >
            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={eventsName} component={EventsScreen}/>
            <Tab.Screen name={newsName} component={NewsScreen}/>
            <Tab.Screen name={messageName} component={MessageScreen}/>
            <Tab.Screen name={profileName} component={ProfileScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    );
}
