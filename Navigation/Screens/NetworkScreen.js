import React, { useEffect, View, useState} from 'react';
  import { StyleSheet, SafeAreaView, ScrollView, StatusBar, Button, RefreshControl } from 'react-native';
  import NewsCard from '../Components/NewsCard';
  import { NavigationContainer } from '@react-navigation/native';
  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
  import { createStackNavigator } from '@react-navigation/stack'; 
  import ConnectCard from '../Components/ConnectCard';
  import MutualCard from '../Components/MutualCard';
  import { updateDoc, deleteDoc, doc, getDoc, collection, query, where, getDocs} from '@firebase/firestore';
  import { firestore } from '../../src/firebase_init/firebase';


  
  const fetchConnectionsByEmail = async (email) => {
    try {
      // Create a query to find the user document with the provided email
      const q = query(collection(firestore, 'test_data'), where('Email', '==', email));
  
      // Execute the query and get the matching user documents
      const querySnapshot = await getDocs(q);
  
      // Check if any user documents were found
      if (!querySnapshot.empty) {
        // Since the email should be unique, there should be only one matching user document
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
  
        // Extract the connections array from the user's document
        const connections = userData.Connections || [];
        return connections;
      } else {
        console.log(`User with email ${email} not found.`);
        return [];
      }
    } catch (error) {
      console.error('Error fetching connections', error);
      return [];
    }
  };

  const fetchAllUsers = async () => {
    try {
      const q = query(collection(firestore, 'test_data'));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const users = querySnapshot.docs.map((doc) => doc.data());
        console.log(users);
        return users;
      } else {
        console.log("No users found.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching users", error);
      return [];
    }
  };

  

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
  

 
function returnConnections() {
  const [connections, setConnections] = React.useState([]);

  useEffect(() => {
    const email = "Ava"; // Replace this with the email you want to fetch connections for
    fetchConnectionsByEmail(email)
      .then((connections) => {
        setConnections(connections);
      })
      .catch((error) => {
        console.error('Error fetching connections', error);
      });
  }, []);

  return connections;
}

  // Screen for displaying the detailed news content
  function NewsDetailsScreen({ navigation }) {
    // Replace this with your detailed news content
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <NewsCard />
        </ScrollView>
      </SafeAreaView>
    );
  };

  // Screen for displaying the news related to Latech
  // Change - Screen for displaying Current Connections.
  function ConnectionsScreen() {

  const [loading, setLoading] = useState(false);
  const onRefresh = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const email = "Ava"; // Replace this with the email you want to fetch connections for
      const updatedConnections = await fetchConnectionsByEmail(email);
      setConnections(updatedConnections);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {setTimeout(() => {
      setLoading(false)
    }, 500);
    }
  };
    const [users, setUsers] = React.useState([]);
    const [connections, setConnections] = React.useState([]);

  useEffect(() => {
    const email = "Ava"; // Replace this with the email you want to fetch connections for
    fetchConnectionsByEmail(email)
      .then((connections) => {
        setConnections(connections);
      })
      .catch((error) => {
        console.error('Error fetching connections', error);
      });
  }, []);


  const handleDisconnect = async (userToRemove) => {
    try {
      const currentUserEmail = 'Ava'; // Replace with the current user's email
      const currentUserConnections = await fetchConnectionsByEmail(currentUserEmail);
  
      // Create a new copy of the connections array without the user to be removed
      const updatedConnections = currentUserConnections.filter((user) => user !== userToRemove);
  
      // Update the state with the new connections array
      setConnections(updatedConnections);
  
      // Update the current user's connections in Firebase
      const currentUserDocRef = doc(firestore, 'test_data', 'tdVsFnfbGyqADLUu9s2q');
      await updateDoc(currentUserDocRef, { Connections: updatedConnections });
  
      // Fetch the userToRemove's connections and update their connections list in Firebase
      const userToRemoveConnections = await fetchConnectionsByEmail(userToRemove);
      const updatedUserToRemoveConnections = userToRemoveConnections.filter((user) => user !== currentUserEmail);
      const userToRemoveDocRef = doc(firestore, 'test_data', userToRemove);
      await updateDoc(userToRemoveDocRef, { Connections: updatedUserToRemoveConnections });
  
      const allUsers = await fetchData();
      setUsers(allUsers);
    } catch (error) {
      console.error('Error disconnecting user', error);
    }
  };

  useEffect(() => {
    // Fetch initial users data when the component mounts
    fetchData()
      .then((allUsers) => {
        setUsers(allUsers);
      })
      .catch((error) => {
        console.error('Error fetching users', error);
      });
  }, []);
  

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
      >

          {connections.map((id) => (
            
            
            <MutualCard
            user={id}
            userID={id}
            onDisconnect={() => handleDisconnect(id)}  // change handledisconnect to handle userids instead of name 
               />
               
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Screen for displaying the sports news
  // Change- Screen for displaying Mutual connections 
  //
  function MutualsScreen() {
    const [users, setUsers] = React.useState([]);
    const [connections, setConnections] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const onRefresh = async () => {
      try {
        setLoading(true); // Set loading to true while fetching data
        const email = "Ava"; // Replace this with the email you want to fetch connections for
        
        const updatedConnections = await fetchConnectionsByEmail(email);
        setConnections(updatedConnections);
        const updatedUsers = await fetchData();
        setUsers(updatedUsers);
      } catch (error) {
        console.error('Error refreshing data:', error);
      } finally {setTimeout(() => {
        setLoading(false)
      }, 500);
      }
    };

    const handleConnect = async (selectedUser, selectedUserID) => {
      try {
        const currentUserEmail = 'Ava'; // Replace with the current user's email
        const currentUserConnections = await fetchConnectionsByEmail(currentUserEmail);
    
        if (!currentUserConnections.includes(selectedUserID)) {
          const updatedConnections = [...currentUserConnections, selectedUserID];
    
          const currentUserDocRef = doc(firestore, 'test_data', 'tdVsFnfbGyqADLUu9s2q');
          await updateDoc(currentUserDocRef, { Connections: updatedConnections });
    
          // Update the state directly with the new connections
          setConnections(updatedConnections);
    
          const selectedUserDocRef = doc(firestore, 'test_data', selectedUserID);
          const selectedUserConnections = await fetchConnectionsByEmail(selectedUser.Email);
          const updatedSelectedUserConnections = [...selectedUserConnections, 'tdVsFnfbGyqADLUu9s2q'];
          await updateDoc(selectedUserDocRef, { Connections: updatedSelectedUserConnections });
    
          console.log(`User ${selectedUser.Username || ''} connected.`);
        } else {
          console.log(`User ${selectedUser.Username} is already in your connections.`);
        }
      } catch (error) {
        console.error('Error connecting user', error);
      }
    };
  
  
    useEffect(() => {
      fetchData()
        .then((users) => {
          setUsers(users);
        })
        .catch((error) => {
          console.error('Error fetching users', error);
        });
    }, [connections]); 

    const filteredUsers = users.filter((user) => user.Email !== 'Ava' && !connections.includes(user.id));

  
    
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
      >
          {filteredUsers.map((user) => (
            
            
            <ConnectCard
            user = {user}
            onConnect={() => handleConnect(user, user.id)}
            
               />
               
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
  



  // Tabs for Current/Mutal Connections
  const Tab = createMaterialTopTabNavigator();
  const Stack = createStackNavigator(); // Create a new stack navigator
  const LatechStack = createStackNavigator(); // Create a new stack navigator for LatechNewsScreen

  // Stack navigator for LatechNewsScreen
  function LatechStackScreen() {
    return (
      <LatechStack.Navigator
        screenOptions={{headerShown: false, }}// Hide the header for all screens in this stack
      >
        <LatechStack.Screen name="LatechNews" component={ConnectionsScreen} />
        <LatechStack.Screen name="NewsDetailsScreen" component={NewsDetailsScreen} />
        {/* You can add more screens specific to LatechNewsScreen here */}
      </LatechStack.Navigator>
    );
  }

  //Tabs

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
