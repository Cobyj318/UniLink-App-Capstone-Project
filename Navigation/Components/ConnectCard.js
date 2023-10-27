import React, { useState, useEffect } from 'react';
import { Avatar, Button, Text } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from '@firebase/firestore';
import { firestore } from '../../src/firebase_init/firebase';
import { Image } from 'expo-image';
import { primaryColors,accentColors } from './Colors';
import OthersProfile from './OthersProfile.js';
import MessageScreen from '../Screens/Messaging_screens/MessageScreen';

const theme = {
  roundness: 4,
  colors: {
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

import { useNavigation } from '@react-navigation/native';  // Import useNavigation from '@react-navigation/native'


const ConnectCard = ({ user, onConnect, handlenavigate }) => {
  const LeftContent = () => (
    <View>
      {user.Profile_Image ? (
        <Image source={{ uri: user.Profile_Image }} style={[styles.avatar]} />
      ) : (
        <Avatar.Icon size={40} icon="account" />
      )}
    </View>
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [ProfileVisible, setProfileVisible] = useState(false);
  const navigation = useNavigation();


  const fetchConnectionsByEmail = async (email) => {
    try {
      const q = query(collection(firestore, 'test_data'), where('Email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
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
      onConnect(user);
    }
  };

  const handleProfilePress = (user, handleNavigate) => {
    setSelectedUser(CardUser)
    setProfileVisible(true);
  }


  useEffect(() => {
    const currentUserEmail = 'Ava'; // Replace with the current user's email
    fetchConnectionsByEmail(currentUserEmail)
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
        <View style={[styles.card, isExpanded && styles.expandedCard]}>
          <View style={styles.cardHeader}>
            <LeftContent />
            <View style={styles.headerText}>
              <Text style={styles.title}>{user.FirstName}</Text>
              <Text style={styles.subtitle}>{user.Major}</Text>
            </View>
          </View>

          {isExpanded && (
            <View style={styles.cardContent}>
              <Text style={styles.bodyLarge}>{user.About_me}</Text>
              <Image source={{ uri: user.Profile_Image }} style={styles.cardImage} />
            </View>
          )}

          {isExpanded && (
            <View style={styles.cardActions}>
              <Button
                style={styles.ViewProfile}
                color='#CB333B'
                onPress={() => handleProfilePress(user, handleNavigate)}
              >
                View Profile
              </Button>
              <Button
                style={styles.connectButton}
                onPress={handleConnectPress}
              >
                {isConnected ? 'Connected' : 'Connect'}
              </Button>
            </View>
          )}
        </View>

        

      
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  expandedCard: {
    borderColor: accentColors.lightblue, // Change the border color when expanded (for demonstration)
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: '#666',
  },
  cardContent: {
    marginTop: 10,
  },
  bodyLarge: {
    fontSize: 16,
  },
  cardImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  OtherButton: {
    flex: 1,
    marginRight: 5,
  },
  ViewProfile: {
    flex: 1,
    marginRight: 5,
  },
  connectButton: {
    flex: 1,
    marginLeft: 5,
  },
});

export default ConnectCard;
