import React, { useState, useEffect } from 'react';
import { Avatar } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { accentColors } from './Colors';

const Avatar_profiles = ({ user, AllUsers, onDisconnect }) => {
  const [CardUser, setCardUser] = useState(null);

  useEffect(() => {
    const foundUser = AllUsers.find((use) => use.id === user);
    if (foundUser) {
      console.log('User found:', foundUser);
      setCardUser(foundUser);
    }
  }, [user]);

  return (
    <View style={styles.card}>
      {CardUser?.Profile_Image ? (
        <Image source={{ uri: CardUser?.Profile_Image }} style={styles.avatar} />
      ) : (
        <Avatar.Icon size={40} icon="account" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 50, // Make it a circle by setting borderRadius to half of the width/height
    overflow: 'hidden', // Clip the content to the rounded shape
    width: 40, // Set the width and height to make it a circle
    height: 40,
    marginRight: 10,
  },
  avatar: {
    width: '100%', // Take the full width of the circle
    height: '100%', // Take the full height of the circle
    borderRadius: 50, // Ensure the image itself is also a circle
  },
});

export default Avatar_profiles;
