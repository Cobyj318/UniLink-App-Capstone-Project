import * as React from 'react';
import LogInContainer from './Navigation/LogInContainer';
import getUserEvents from './src/firebase_init/getUserEvents'

function App(){  
  return(
    <LogInContainer/>
  );
}

export default App;