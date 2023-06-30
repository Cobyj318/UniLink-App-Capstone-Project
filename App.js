import * as React from 'react';
import MainContainer from './Navigation/MainContainer';
import handleSubmit from './src/firebase_init/handlesubmit';
import { useRef } from 'react';

function App(){
  const dataRef = useRef()
 
  const submithandler = (e) => {
    e.preventDefault()
    handleSubmit(dataRef.current.value)
    dataRef.current.value = ""
  }
  return(
    <MainContainer/>
  );
}

export default App;


// import * as React from 'react';
// import MainContainer from './Navigation/MainContainer';
// import {View, Text} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SplashScreen from './Navigation/Screens/SplashScreen';

// const Stack = createStackNavigator();

