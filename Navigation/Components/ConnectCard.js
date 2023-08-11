import React, { useState, useEffect } from 'react';
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



const ConnectCard = ({user, onConnect}) => {
  const LeftContent = ({ style }) => (
    <View>
    {user.Profile_Image ? (
    <Avatar.Image source={{ uri: user.Profile_Image}} size={40} style={style} />
    ) : (
      <Avatar.Icon size={40} icon="account" />
    )}
    </View>
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

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

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleConnectPress = () => {
    if (!isConnected) {
      onConnect(user); // Call the onConnect callback with the user's data
    }
  };

  useEffect(() => {
    const currentUserEmail = 'Ava'; // Replace with the current user's email
    fetchConnectionsByEmail(currentUserEmail) // Use await to get the connections
      .then((currentUserConnections) => {
        setIsConnected(currentUserConnections.includes(user.id));
      })
      .catch((error) => {
        console.error('Error fetching connections', error);
      });
  }, [user.Email]);

  return (
    !isConnected && (
      <TouchableOpacity onPress={handleExpand}>
        <PaperProvider theme={theme}>
          <Card style={styles.card}>
            <Card.Title title={user.FirstName} subtitle={user.Major} left={LeftContent} />

            {isExpanded && (
              <Card.Content>
                <Text variant="bodyLarge">{user.About_me}</Text>
              </Card.Content>
            )}
            {isExpanded && <Card.Cover source={{ uri: user.Profile_Image }} />}
            {isExpanded && (
              <Card.Actions>
                <Button buttonColor='#CB333B' textColor='white'>Cancel</Button>
                <Button buttonColor='#003087' onPress={handleConnectPress}>
                  {isConnected ? 'Connected' : 'Connect'}
                </Button>
              </Card.Actions>
            )}
          </Card>
        </PaperProvider>
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  }
});

export default ConnectCard;
