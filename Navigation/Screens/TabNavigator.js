import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GroupStack } from "./Group_Screens/groupStack";
import NewsScreen from "./News_screens/NewsTabs";
import NetworkScreen from "./NetworkScreen";
import ProfileScreen from "./ProfileScreen";
import Icon from 'react-native-vector-icons/FontAwesome';
import DrawerNavigation from "./Home_Screens/HomeDrawer";
import { useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { FIREBASE_AUTH, firestore } from "../../src/firebase_init/firebase";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useState, useRef } from 'react';
import { Platform } from 'react-native';
import { doc } from "firebase/firestore";


export const ExistingUser = "TabNavigator"; // Export OldUser separately
export const Cams = "CamScreen";
const homeName='Home';
const eventsName='Groups';
const profileName='Profile';
const newsName='News';
const networkName='Network';
export const Login='LoginScreen';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator();

export const TabNavigator = () => { 
  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [isInitialMount, setIsInitialMount] = useState(true);
  
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const documentRef = doc(firestore, "Notifications", FIREBASE_AUTH.currentUser.uid); // Replace with your document ID
    const unsubscribe = onSnapshot(documentRef, async (docSnapshot) => {
      const newData = docSnapshot.data();
      console.log(newData.event);
      // Check if newData is not null and not an empty object
      if (newData && Object.keys(newData).length > 0) {
        // Send a push notification
        console.log("Document changed:", newData);
        await schedulePushNotification();
      }
    });
    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, []);
  
  return(
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
  )
};


async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Events Page changed!",
      body: 'Someone has changed the event page!',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}