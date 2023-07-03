import * as React from 'react';
import MainContainer from './Navigation/MainContainer';
import { addDoc, collection } from "@firebase/firestore"
import { firestore, db } from "./src/firebase_init/firebase"
import { ref, onValue } from 'firebase/database'
import SplashScreen from './Navigation/Screens/SplashScreen';
/*
For copying in other pages
import handleSubmit from './src/firebase_init/handlesubmit';
import { useRef } from 'react';
*/

function App(){
  
  /* For copying in other pages 
  const dataRef = useRef()
 
  const submithandler = (e) => {
    e.preventDefault()
    handleSubmit(dataRef.current.value)
    dataRef.current.value = ""
  }
  */
  return(
    <MainContainer/>
  );
}

export default App;