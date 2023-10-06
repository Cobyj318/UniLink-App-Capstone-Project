import { createStackNavigator } from "@react-navigation/stack";
import GroupDetailsScreen from "./GroupDetails";
import GroupsScreen from "./GroupScreen";
import GroupUsers from "./GroupUsers";
import { GroupSchedule } from "./GroupSchedule";

const Groups='GroupsScreen'


const groupStack = createStackNavigator();
export const GroupStack = () => (
  <groupStack.Navigator >
    <groupStack.Screen name={Groups} component={GroupsScreen} options={{headerShown: false}} />
    <groupStack.Screen name={'GroupDetailsScreen'} component={GroupDetailsScreen} options={{headerShown: false}}/>
    <groupStack.Screen name={'GroupUsers'} component={GroupUsers} options={{headerShown: false}}/>
    <groupStack.Screen name={'GroupSchedule'} component={GroupSchedule} options={{headerShown: false}}/>
  </groupStack.Navigator>  
);