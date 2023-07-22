import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../src/firebase_init/firebase';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const LeftContent = props => <Avatar.Icon {...props} icon="circle" />

const EventCard = ({ users }) => {
  const [editMode, setEditMode] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState('');
  const [editedDescription, setEditedDescription] = React.useState('');
  const handleDeleteEvent = async (eventId) => {
    try {
      // Construct the reference to the event document in "Event_data" collection
      const eventRef = doc(firestore, 'Event_data', eventId);
      
      // Delete the document from Firebase
      await deleteDoc(eventRef);
      alert('Event deleted successfully.');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  const handleEditEvent = async (eventId) => {
    try {
      // Construct the reference to the event document in "Event_data" collection
      const eventRef = doc(firestore, 'Event_data', eventId);

      // Update the document in Firebase with the edited data
      await updateDoc(eventRef, {
        Title: editedTitle,
        Description: editedDescription,
      });

      // Exit edit mode
      setEditMode(false);
      alert('Event edited successfully.');
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        {users.map((user, index) => (
          <View style={styles.eventCardContainer} key={index}>
            <Card>
              <Card.Title title={user.Sponser} subtitle={user.Date} left={LeftContent} />
              <Card.Content>
                {editMode ? (
                  <React.Fragment>
                    <TextInput
                      label="Title"
                      value={editedTitle}
                      onChangeText={setEditedTitle}
                      style={styles.input}
                    />
                    <TextInput
                      label="Description"
                      value={editedDescription}
                      onChangeText={setEditedDescription}
                      style={styles.input}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Text variant="titleLarge">{user.Title}</Text>
                    <Text variant="bodyMedium">{user.Description}</Text>
                  </React.Fragment>
                )}
              </Card.Content>
              <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
              <Card.Actions >
                {!editMode && (
                  <Button  onPress={() => alert('Thank you for RSVPING!')}>RSVP</Button>
                )}
                {editMode ? (
                  <React.Fragment>
                    <Button  onPress={() => handleEditEvent(user.id)}>Save</Button>
                    <Button  onPress={() => setEditMode(false)}>Cancel</Button>
                  </React.Fragment>
                ) : (
                  <Button  onPress={() => setEditMode(true)}>Edit</Button>
                )}
                {!editMode && (
                  <Button  onPress={() => handleDeleteEvent(user.id)}>Delete</Button>
                )}
              </Card.Actions>
            </Card>
          </View>
        ))}
      </View>
    </PaperProvider>
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
});

export default EventCard;
