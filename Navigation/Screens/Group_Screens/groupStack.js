import { createStackNavigator } from "@react-navigation/stack";
import GroupDetailsScreen from "./GroupDetails";
import GroupsScreen from "./GroupScreen";
import GroupUsers from "./GroupUsers";
import { GroupSchedule } from "./GroupSchedule";
import GroupCreationScreen from "./GroupCreationScreen";

const groupStack = createStackNavigator();
export const GroupStack = () => (
  <groupStack.Navigator >
    <groupStack.Screen name={'GroupsScreen'} component={GroupsScreen} options={{headerShown: false}} />
    <groupStack.Screen name={'GroupDetailsScreen'} component={GroupDetailsScreen} options={{headerShown: false}}/>
    <groupStack.Screen name={'GroupUsers'} component={GroupUsers} options={{headerShown: false}}/>
    <groupStack.Screen name={'GroupSchedule'} component={GroupSchedule} options={{headerShown: false}}/>
    <groupStack.Screen name={'GroupCreation'} component={GroupCreationScreen} options={{headerShown: false}}/>
  </groupStack.Navigator>  
);