import React, { useState, useEffect } from 'react';
import { Avatar } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { accentColors } from './Colors';

const Avatar_profiles = ({ user, AllUsers, navigation }) => {
  const [CardUser, setCardUser] = useState(null);

  useEffect(() => {
    const foundUser = AllUsers.find((use) => use.id === user);
    if (foundUser) {
      setCardUser(foundUser);
    }
  }, [user]);

  const handlePress = () => {
    // Navigate to the person's profile using navigation.navigate
    // Replace 'UserProfile' with the name of your profile screen
    navigation.navigate('UserProfile', { CardUser });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        {CardUser?.Profile_Image ? (
          <Image source={{ uri: CardUser?.Profile_Image }} style={styles.avatar} />
        ) : (
          <Avatar.Icon size={40} icon="account" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 50,
    overflow: 'hidden',
    width: 40,
    height: 40,
    marginRight: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});

export default Avatar_profiles;
