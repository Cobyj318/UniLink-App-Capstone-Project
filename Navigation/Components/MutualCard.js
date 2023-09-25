import React, { useState, useEffect } from 'react';
import { Avatar, Button, Text } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import { Image } from 'expo-image';
import { accentColors } from './Colors';
const theme = {
  roundness: 4,
  colors: {
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const MutualCard = ({ user, AllUsers, onDisconnect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [CardUser, setCardUser] = useState(null);

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

  useEffect(() => {
    const foundUser = AllUsers.find(use => use.id === user);
    if (foundUser) {
      console.log("User found:", foundUser);
      setCardUser(foundUser);
    }
  }, [user]);

  const handleDisconnectPress = () => {
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
              style={styles.cancelButton}
              color='#CB333B'
              onPress={handleExpand}
            >
              Cancel
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
  cancelButton: {
    flex: 1,
    marginRight: 5,
  },
  connectButton: {
    flex: 1,
    marginLeft: 5,
  },
});

export default MutualCard;
