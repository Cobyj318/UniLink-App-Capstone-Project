import * as React from 'react';
import { Pressable, StyleSheet, View, Text} from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../src/firebase_init/firebase';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';
import { Image } from 'expo-image';

const EventCard = ({ users }) => {
  const navigation = useNavigation();
  const currentUserUID = FIREBASE_AUTH.currentUser?.uid;

  const handlePress = (event) => {
    navigation.navigate('EventDetailsScreen', { event });
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const eventRef = doc(firestore, 'Event_data', eventId);
      await deleteDoc(eventRef);
      alert('Event deleted successfully.');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <View style={styles.container}>
      {users.map((event, index) => (
        <View style={styles.eventCardContainer} key={index}>
          <View style={styles.eventCard}>
            <View style={styles.cardHeader}>
            <Image
                source={{ uri: event.Image_Link }}
                style={styles.avatar}
              />
              <View style={styles.headerText}>
                <Text style={styles.title}>{event.Sponser}</Text>
                <Text style={styles.subtitle}>{event.Date}</Text>
              </View>
            </View>
            <Text style={styles.titleLarge}>{event.Title}</Text>
            <Text style={styles.bodyMedium}>
              {event.Description.slice(0, 100) + '...'}
            </Text>
            <Pressable onPress={() => handlePress(event)} style={styles.pressable}>
              <Image
                source={{ uri: event.Image_Link }}
                style={styles.cardImage}
              />
            </Pressable>
            <View style={styles.cardActions}>
              <Button onPress={() => alert('Thank you for RSVPING!')}>RSVP</Button>
              {currentUserUID === event.Creator && (
                <Button onPress={() => handleDeleteEvent(event.id)}>Delete</Button>
              )}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -1,
    marginBottom: 70,
  },
  eventCardContainer: {
    paddingVertical: 2,
  },
  eventCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor:'white',

  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
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
  titleLarge: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  bodyMedium: {
    fontSize: 14,
    marginTop: 5,
  },
  pressable: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default EventCard;
