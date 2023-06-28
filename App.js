import * as React from 'react';
import MainContainer from './Navigation/MainContainer';

function App(){
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

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Main" component={MainContainer} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// export default App;