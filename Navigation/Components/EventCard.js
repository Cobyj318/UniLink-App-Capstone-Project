import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../src/firebase_init/firebase';
import { useNavigation } from '@react-navigation/native';


function RandomInt() {
  const randomNum = Math.floor(Math.random() * (701 - 500) + 500);// Generate a random number between 500 and 700
  const randomNumAsString = randomNum.toString();                 // Convert the random number to a string
  return randomNumAsString;}

const LeftContent = ({ style }) => (<Avatar.Image source={{ uri: 'https://picsum.photos/'+RandomInt() }} size={40} style={style}/>);

const EventCard = ({ users }) => {
  const [editMode, setEditMode] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState('');
  const [editedDescription, setEditedDescription] = React.useState('');

  const handleDeleteEvent = async (eventId) => {
    try {
      const eventRef = doc(firestore, 'Event_data', eventId); // Construct the reference to the event document in "Event_data" collection
      await deleteDoc(eventRef);                              // Delete the document from Firebase
      alert('Event deleted successfully.');
    } catch (error) {console.error('Error deleting event:', error);}};

  const handleEditEvent = async (eventId) => {
    try {
      const eventRef = doc(firestore, 'Event_data', eventId); // Construct the reference to the event document in "Event_data" collection
      await updateDoc(eventRef, {                             // Update the document in Firebase with the edited data
        Title: editedTitle,
        Description: editedDescription,
      });
      setEditMode(false);                                     // Exit edit mode
      alert('Event edited successfully.');
    } catch (error) {console.error('Error editing event:', error);}};

  const navigation = useNavigation();                         // Initialize useNavigation hook
  const handlePress = (event) => { navigation.navigate('EventDetailsScreen',{ event });};// Navigate to 'NewsDetails' screen when 'Ok' button is pressed
 
  return (
      <View style={styles.container}>
        {users.map((event, index) => (
          <View style={styles.eventCardContainer} key={index}>
            <Card>
              <Card.Title title={event.Sponser} subtitle={event.Date} left={LeftContent} />
              <Card.Content>
                {editMode? 
                (
                  <React.Fragment>
                    <TextInput label="Title" value={editedTitle} onChangeText={setEditedTitle} style={styles.input} />
                    <TextInput label="Description" value={editedDescription} onChangeText={setEditedDescription} style={styles.input}/>
                  </React.Fragment>
                ): 
                (
                  <React.Fragment>
                    <Text variant="titleLarge">{event.Title}</Text>
                    <Text variant="bodyMedium">{event.Description.slice(0,100)+"..."}</Text>
                  </React.Fragment>
                )}
              </Card.Content>
               <Pressable onPress={() => handlePress(event)} style={styles.pressable}>
                  <Card.Cover source={{ uri: 'https://picsum.photos/'+RandomInt() }} />
                </Pressable>
              <Card.Actions >
                {!editMode && (<Button  onPress={() => alert('Thank you for RSVPING!')}>RSVP</Button>)}
                {editMode? 
                (
                  <React.Fragment>
                    <Button  onPress={() => handleEditEvent(event.id)}>Save</Button>
                    <Button  onPress={() => setEditMode(false)}>Cancel</Button>
                  </React.Fragment>

                ): (<Button  onPress={() => setEditMode(true)}>Edit</Button>)}
                {!editMode && (<Button  onPress={() => handleDeleteEvent(event.id)}>Delete</Button>)}
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
  input: {
    marginHorizontal:-20,
  },
  pressable: {
    borderRadius: 10,
    overflow: 'hidden', // This is important to prevent overflow of the border radius
  },
});

export default EventCard;
