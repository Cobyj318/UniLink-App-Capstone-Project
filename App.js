import * as React from 'react';

import LogInContainer from './Navigation/LogInContainer';
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
    <LogInContainer/>
  );
}

export default App;