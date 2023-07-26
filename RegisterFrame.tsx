import React, { useEffect, useState } from "react";
import MainStack from "./Navigation/MainStack";
import LoginScreen from "./Navigation/Screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {onAuthStateChanged} from "firebase/auth";
import { FIREBASE_AUTH } from "./src/firebase_init/firebase";
import {User} from "firebase/auth";


const Stack = createStackNavigator();

function RegisterFrame() {
  const [user,setuser] = useState<User|null>(null);

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH,(user)=>{
      console.log('user',user?.email);
      setuser(user);
    });
  },[]);

  return (
    <NavigationContainer independent={true}>
    	<Stack.Navigator initialRouteName="MainStack">
        {user ? (<Stack.Screen name="MainStack" component={MainStack} options={{ headerShown: false }}/>):(<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>)}
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RegisterFrame;
