import React, { useEffect, View, useState} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, Button, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import ConnectCard from '../Components/ConnectCard';
import MutualCard from '../Components/MutualCard';
import { updateDoc, doc, collection, getDocs} from '@firebase/firestore';
import { firestore } from '../../src/firebase_init/firebase';
import { fetchUserData } from '../Components/UserData';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';

export const fetchData = async () => {
  try {
    const eventsRef = collection(firestore, 'test_data');
    const querySnapshot = await getDocs(eventsRef);
    const usersData = [];
    querySnapshot.forEach((doc) => {
      const { Email, Password, Username, Major, About_me} = doc.data();
      usersData.push({
        id: doc.id,
        Email,
        Password,
        Username,
        Major,
        About_me
      });
    });
    return usersData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
export const fetchAllUsers = async () => {
  try {
    const eventsRef = collection(firestore, 'User_data');
    const querySnapshot = await getDocs(eventsRef);
    const usersData = [];
    querySnapshot.forEach((doc) => {
      const {FirstName, LastName, Major,Profile_Image,Connections,Id} = doc.data();
      usersData.push({
        id:doc.id,
        Id,
        FirstName,
        LastName,
        Major,
        Profile_Image,
        Connections,
      });
    });
    return usersData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

function ConnectionsScreen({ navigation }) {
  // Common fetching logic for both screens
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  const fetchDataAndUserData = async () => {
    setLoading(true); // Set loading state to true when fetching data
    const usersData = await fetchAllUsers();
    setUsers(usersData);
    const userData = await fetchUserData(FIREBASE_AUTH.currentUser?.uid);
    setUserDetails(userData[0]);
    setLoading(false); // Set loading state to false when data fetching is complete
  };

  const onRefresh = async () => {
    try {
      fetchDataAndUserData();  
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchDataAndUserData();  
    fetchData();
  }, []);
  
  const handleDisconnect = async (userToRemove) => {
    try {
      userDetails.Connections = userDetails.Connections?.filter(item => item !== userToRemove);
      const documentRef = doc(firestore,'User_data', userDetails.id);
      try {
        await updateDoc(documentRef, userDetails);
        console.log('Document updated successfully');
      } catch (error) {
        console.error('Error updating document:', error);
      }
    } catch (error) {
      console.error('Error disconnecting user', error);
    }
    onRefresh();

  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />} >
        {userDetails?.Connections?.map((id) => (
          <MutualCard user={id} userID={id} AllUsers={users} onDisconnect={() => handleDisconnect(id)} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// Change- Screen for displaying Mutual connections 
function MutualsScreen() {
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const fetchDataAndUserData = async () => {
    setLoading(true); // Set loading state to true when fetching data
    const usersData = await fetchAllUsers();
    setUsersData(usersData);
    const userData = await fetchUserData(FIREBASE_AUTH.currentUser?.uid);
    setUserDetails(userData[0]);
    console.log("usersData=",usersData);
    console.log("userData=",userData[0]);
    setLoading(false); // Set loading state to false when data fetching is complete
  };

  const onRefresh = async () => {
    try {
      fetchDataAndUserData();  
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleConnect = async (selectedUser, selectedUserID) => {
    if (!userDetails.Connections.includes(selectedUserID)) {
    try {
      userDetails.Connections= [...userDetails?.Connections,selectedUserID];
      const documentRef = doc(firestore,'User_data', userDetails.id);
      try {
        await updateDoc(documentRef, userDetails);
        console.log('Document updated successfully');
      } catch (error) {
        console.error('Error updating document:', error);
      }
    } catch (error) {
      console.error('Error connecting user', error);
    }
    onRefresh();
  }};

  useEffect(() => {
    fetchDataAndUserData();  
    fetchData();
  }, []);
  
  let filteredArray = usersData?.filter(item => !userDetails?.Connections.includes(item.id));
  filteredArray=filteredArray?.filter(item=>item.Id!==FIREBASE_AUTH?.currentUser.uid);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
      style={styles.scrollView}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
        {filteredArray?.map((user) => (
          <ConnectCard user = {user} onConnect={() => handleConnect(user, user.id)}/>   
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// Tabs for Current/Mutal Connections
const Tab = createMaterialTopTabNavigator();
const LatechStack = createStackNavigator(); 
function LatechStackScreen() {
  return (
    <LatechStack.Navigator screenOptions={{headerShown: false, }}>
      <LatechStack.Screen name="LatechNews" component={ConnectionsScreen} />
    </LatechStack.Navigator>
  );
}

export default function NetworkScreen({ navigation }) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        {/* Tab screen for displaying LatechNews */}
        <Tab.Screen name="Connected People" component={LatechStackScreen} />
        {/* Tab screen for displaying Mutual Connections */}
        <Tab.Screen name="People you may know" component={MutualsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
