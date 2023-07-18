import * as React from 'react';
import LogInContainer from './Navigation/LogInContainer';
import getUserEvents from './src/firebase_init/getUserEvents';
import MainStack from './Navigation/MainStack';

function App(){  
  return(
    <MainStack/>
//    <LogInContainer/>
  );
}

export default App;