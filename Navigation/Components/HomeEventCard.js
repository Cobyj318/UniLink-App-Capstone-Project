import React from 'react';
import { Avatar,Text } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const LeftContent = () => <Avatar.Icon icon="newspaper" />;

const EventCard = ({ user }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('EventDetailsScreen', { event: user });
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <LeftContent />
            <Text style={styles.cardHeaderText}>{user?.Sponser}</Text>
          </View>
          <Text variant="titleLarge">{user?.Title}</Text>
          <Text variant="bodyMedium">
            {user.Description.slice(0, 70) + '...'}
          </Text>
        <Image source={{ uri: user.Image_Link }} style={styles.image} />

          <Button onPress={handlePress}>open</Button>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  cardContent: {
    padding: 10,
    backgroundColor: 'white',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderText: {
    marginLeft: 10,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default EventCard;
