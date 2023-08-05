import React, { useState, useEffect} from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { updateDoc, deleteDoc, doc, getDoc, collection, query, where, getDocs} from '@firebase/firestore';
import { firestore } from '../../src/firebase_init/firebase';

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const LeftContent = (props) => <Avatar.Icon {...props} icon="human-greeting" />;

const MutualCard = ({user, onDisconnect}) => {
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const fetchUserById = async (userId) => {
    try {
      // Get the user document by ID from the 'test_data' collection
      const userDocRef = doc(collection(firestore, 'test_data'), userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // If the user document exists, extract the user's data
        const userData = userDocSnap.data();

        return userData;
      } else {
        console.log(`User with ID ${userId} not found.`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data', error);
      return null;
    }
  };

  useEffect(() => {
    // Fetch the user data and update the state
    fetchUserById(user)
      .then((userData) => {
        setUserData(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data', error);
      });
  }, [user]);

  

  const handleDisconnectPress = () => {
    onDisconnect(user); // Call the onDisconnect callback with the user's name
  };

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
  

  


  return (
    <TouchableOpacity onPress={handleExpand}>
      <PaperProvider theme={theme}>
        <Card style={styles.card}>
        <Card.Title title={userData ? userData.Username : ''} subtitle={userData ? userData.Major : ''} left={LeftContent} />

          {isExpanded && (
            <Card.Content>
              <Text variant="bodyLarge">{userData ? userData.About_me : ''}</Text>
            </Card.Content>
          )}
          {isExpanded && <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />}
          {isExpanded && (
            <Card.Actions>
              <Button buttonColor='#CB333B' textColor='white'>Cancel</Button>
              <Button buttonColor='#003087' onPress={handleDisconnectPress}>Disconnect</Button>
            </Card.Actions>
          )}
        </Card>
      </PaperProvider>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  }
});

export default MutualCard;
