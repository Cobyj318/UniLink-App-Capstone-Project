import React, { useState, useEffect } from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import { Image } from 'expo-image';
import { accentColors } from './Colors';
import OthersProfile from './OthersProfile.js';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation from '@react-navigation/native'
import Modal from 'react-native-modal';
import { createStackNavigator } from '@react-navigation/stack';
import MessageScreen from '../Screens/Messaging_screens/MessageScreen';

const theme = {
  roundness: 4,
  colors: {
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const MutualCard = ({ user, AllUsers, onDisconnect, navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [CardUser, setCardUser] = useState(null);
  const [ProfileVisible, setProfileVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showMessageScreen, setShowMessageScreen] = useState(false); // New state variable
  

  const ModalContentStack = createStackNavigator();


  const MessageButton = () => {
    
      setProfileVisible(false);
      // Navigate to the message screen
      navigation.navigate('Message')
  };
  
  




  const LeftContent = ({ style }) => (
    <View>
      {CardUser?.Profile_Image ? (
        <Image source={{ uri: CardUser?.Profile_Image }} style={[styles.avatar, style]} />
      ) : (
        <Avatar.Icon size={40} icon="account" style={style} />
      )}
    </View>
  );

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleProfilePress = (user) => {
    setSelectedUser(CardUser);
    setProfileVisible(true); // Set ProfileVisible to true first
    setShowMessageScreen(false); // Set the initial content to OthersProfile
    console.log("Should be false but it's:", showMessageScreen);
  };
  

  const handleMessagePress = () => {
    setShowMessageScreen(true); // Show the MessageScreen content
    console.log("Pressed");
  };

  useEffect(() => {
    const foundUser = AllUsers.find(use => use.id === user);
    if (foundUser) {
      console.log("User found:", foundUser);
      setCardUser(foundUser);
    }
  }, [user]);;

  const handleDisconnectPress = () => {
    console.log(user);
    onDisconnect(user); // Call the onDisconnect callback with the user's name
  };

  return (
    <TouchableOpacity onPress={handleExpand}>
      <View style={[styles.card, isExpanded && styles.expandedCard]}>
        <View style={styles.cardHeader}>
          <LeftContent style={styles.avatar} />
          <View style={styles.headerText}>
            <Text style={styles.title}>{CardUser ? CardUser.FirstName + ' ' + CardUser.LastName : ''}</Text>
            <Text style={styles.subtitle}>{CardUser ? CardUser.Major : ''}</Text>
          </View>
        </View>

        {isExpanded && (
          <View style={styles.cardContent}>
            <Text style={styles.bodyLarge}>{CardUser ? CardUser.About_me : ''}</Text>
            <Image source={{ uri: CardUser?.Profile_Image }} style={styles.cardImage} />
          </View>
        )}

        {isExpanded && (
          <View style={styles.cardActions}>
            <Button
              style={styles.ViewProfile}
              color='#CB333B'
              onPress={() => handleProfilePress(user)}
            >
              View Profile
            </Button>
            <Button
              style={styles.connectButton}
              color='#003087'
              onPress={handleDisconnectPress}
            >
              Disconnect
            </Button>
          </View>
        )}


<Modal isVisible={ProfileVisible}>
          <View style={{ flex: 1, justifyContent: 'center', height: 300}}>
            {showMessageScreen ? ( // Conditional rendering based on state
              setProfileVisible(false)
              
            ) : (
              <OthersProfile isVisible={ProfileVisible} user={selectedUser} onClose={() => setProfileVisible(false)} MessageButton = {MessageButton} navigation={navigation}/>
            )}
          </View>
        </Modal>

      </View>
    </TouchableOpacity>
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
  ViewProfile: {
    flex: 1,
    marginRight: 5,
  },
  connectButton: {
    flex: 1,
    marginLeft: 5,
  },
});

export default MutualCard;
