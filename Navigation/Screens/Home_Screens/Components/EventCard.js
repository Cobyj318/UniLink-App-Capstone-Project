import * as React from 'react';
import { Pressable, StyleSheet, View, Text} from 'react-native';
import {Button, IconButton } from 'react-native-paper';
import { updateDoc, deleteDoc,getDoc, doc } from 'firebase/firestore';
import { firestore } from '../../../../src/firebase_init/firebase';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../../../src/firebase_init/firebase';
import { Image } from 'expo-image';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useState,useEffect } from 'react';

const EventCard = ({ users }) => {
  const navigation = useNavigation();
  const currentUserUID = FIREBASE_AUTH.currentUser?.uid;

  const [rsvpStatus, setRSVPStatus] = useState({});

  useEffect(() => {
    const fetchRSVPStatus = async () => {
      const statusObj = {};
      for (const event of users) {
        const status = await checkRSVP(event);
        statusObj[event.id] = status;
      }
      setRSVPStatus(statusObj);
    };

    fetchRSVPStatus();
  }, [users]);

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

  const handleRSVP = async (event) => {
    try {
      const userRef = doc(firestore, 'User_data', FIREBASE_AUTH.currentUser?.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      const rsvpArray = userData.RSVP || [];
      const isAlreadyRSVPed = rsvpArray.some((e) => e.id === event.id);

      if (!isAlreadyRSVPed) {
        rsvpArray.push(event);
        await updateDoc(userRef, {
          RSVP: rsvpArray,
        });
        
        alert('RSVPed to the Event');
        setRSVPStatus((prevStatus) => ({ ...prevStatus, [event.id]: true }));
      } else {
        // If already RSVPed, remove the event from the RSVP array
        const updatedRSVPArray = rsvpArray.filter((e) => e.id !== event.id);
        await updateDoc(userRef, { RSVP: updatedRSVPArray });
        alert('Removed RSVP for the Event');
        setRSVPStatus((prevStatus) => ({ ...prevStatus, [event.id]: false }));
      }
    } catch (error) {
      console.error('Error updating RSVP:', error);
    }
  };

  const checkRSVP = async (event) => {
    try {
      const userRef = doc(firestore, 'User_data', FIREBASE_AUTH.currentUser?.uid);
      // Fetch current user data
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      // Assuming event.id is the unique identifier
      return userData.RSVP && userData.RSVP.some((e) => e.id === event.id);
    } catch (error) {
      console.error('Error checking RSVP:', error);
      // Handle the error accordingly, e.g., log the error or show a message to the user
      return false;
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
              <Pressable
                onPress={() => handleRSVP(event)}
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.rsvpButton]}
              >
                <Icon name={rsvpStatus[event.id] ? "bookmark" : "bookmark-outline"} color="#fff" size={20} style={styles.icon} />
                <Text style={styles.rsvpText}>RSVP</Text>
              </Pressable>
              {currentUserUID === event.Creator && (
                <Pressable onPress={() => handleDeleteEvent(event.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
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
    backgroundColor: 'white',
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
  rsvpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#3498db',
  },
  icon: {
    marginRight: 5,
  },
  rsvpText: {
    color: '#fff',
    alignSelf: 'center',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#e74c3c',
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default EventCard;
