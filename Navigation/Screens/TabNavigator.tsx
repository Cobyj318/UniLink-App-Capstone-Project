import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GroupStack } from "./Group_Screens/groupStack";
import NewsScreen from "./News_screens/NewsTabs";
import NetworkScreen from "./NetworkScreen";
import ProfileScreen from "./ProfileScreen";
import Icon from 'react-native-vector-icons/FontAwesome';
import DrawerNavigation from "./Home_Screens/HomeDrawer";

export const ExistingUser = "TabNavigator"; // Export OldUser separately
export const Cams = "CamScreen";
const homeName='Home';
const eventsName='Groups';
const profileName='Profile';
const messageName='Message';
const newsName='News';
const networkName='Network';
export const Login='LoginScreen';
export const Notifications = "NotifScreen";


const Tab = createBottomTabNavigator();

export const TabNavigator = () => (
    <Tab.Navigator 
    initialRouteName={homeName}
    screenOptions={({route})=>({
      tabBarActiveTintColor: '#3498db',
      tabBarInactiveTintColor: 'grey',
      tabBarLabelStyle: { paddingBottom: 3, fontSize: 10 },
      tabBarStyle: [{ display: 'flex' }, null],
      tabBarIcon: ({ focused, color, size }) => { 
        let iconName;
        if (route.name === homeName) {
          iconName = focused ? 'home' : 'home';
        } else if (route.name === eventsName) {
          iconName = focused ? 'calendar' : 'calendar-o';
        } else if (route.name === newsName) {
          iconName = focused ? 'newspaper-o' : 'newspaper-o';
        } else if (route.name === networkName) {
          iconName = focused ? 'user-plus' : 'user-plus';
        } else if (route.name === profileName) {
          iconName = focused ? 'user' : 'user-o';
        }
        return (
          <View style={{ paddingTop: 8 }}>
            <Icon name={iconName} size={size} color={color} /> 
          </View>
        );
      },
      
    })}
  >
    <Tab.Screen name={homeName} component={DrawerNavigation} options={{headerShown:false}}/>
    <Tab.Screen name={eventsName} component={GroupStack} />
    <Tab.Screen name={newsName} component={NewsScreen}/>
    <Tab.Screen name={networkName} component={NetworkScreen}/>
    <Tab.Screen name={profileName} component={ProfileScreen}/>
    </Tab.Navigator>
);