import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import EventDetailsScreen from "./EventDetails";
import CreateEventScreen from "./CreateEventScreen";


const homeStack = createStackNavigator();
export const HomeStack = () => (
  <homeStack.Navigator >
    <homeStack.Screen name={'Home'} component={HomeScreen} options={{headerShown: false}} />
    <homeStack.Screen name={'EventDetailsScreen'} component={EventDetailsScreen} options={{headerShown: false}}/>
    <homeStack.Screen name={'CreateEventScreen'} component={CreateEventScreen} options={{headerShown: false}}/>
  </homeStack.Navigator>  
);