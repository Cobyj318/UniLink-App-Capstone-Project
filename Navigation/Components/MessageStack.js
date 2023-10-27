import { createStackNavigator } from '@react-navigation/stack';
import MessageScreen from './MessageScreen'; // Adjust the path as needed

const Stack = createStackNavigator();

const MessageStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MessageScreen" component={MessageScreen} />
    {/* Other screens in the Message stack */}
  </Stack.Navigator>
);

export default MessageStack;
