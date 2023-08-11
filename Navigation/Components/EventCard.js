import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../src/firebase_init/firebase';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';


const EventCard = ({ users }) => {
  const navigation = useNavigation();
  const currentUserUID=FIREBASE_AUTH.currentUser?.uid;
  const LeftContent = ({ style,image }) => (
    <Avatar.Image source={{ uri: image?.Image_Link}} size={40} style={style} />
  );
  
  const handlePress = (event) => {
    navigation.navigate('EventDetailsScreen', { event });
  };
  const handleDeleteEvent = async (eventId) => {
    try {
      const eventRef = doc(firestore, 'Event_data', eventId); // Construct the reference to the event document in "Event_data" collection
      await deleteDoc(eventRef);                              // Delete the document from Firebase
      alert('Event deleted successfully.');
    } catch (error) {console.error('Error deleting event:', error);}};

  return (
    <View style={styles.container}>
      {users.map((event, index) => (
        <View style={styles.eventCardContainer} key={index}>
          <Card>
            <Card.Title title={event.Sponser} subtitle={event.Date} left={(props) => <LeftContent {...props} image={event} />} />
            <Card.Content>
              <Text variant="titleLarge">{event.Title}</Text>
              <Text variant="bodyMedium">{event.Description.slice(0, 100) + '...'}</Text>
            </Card.Content>
            <Pressable onPress={() => handlePress(event)} style={styles.pressable}>
              <Card.Cover source={{ uri: event.Image_Link }} />
            </Pressable>
            <Card.Actions>
              <Button onPress={() => alert('Thank you for RSVPING!')}>RSVP</Button>
              {currentUserUID === event.Creator && (
                <Button onPress={() => handleDeleteEvent(event.id)}>Delete</Button>
              )}
            </Card.Actions>
          </Card>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  eventCardContainer: {
    paddingVertical: 2,
  },
  container: {
    marginTop: -1,
    marginBottom: 70,
  },
  pressable: {
    borderRadius: 10,
    overflow: 'hidden', // This is important to prevent overflow of the border radius
  },
});

export default EventCard;
