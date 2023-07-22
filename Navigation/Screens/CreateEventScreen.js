import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import HandleUserEvents from '../../src/firebase_init/handleUserEvents';

export default function CreateEventScreen({ navigation }) {
  // State variables to hold event details
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [sponser, setSponser] = useState("");
  const [date, setDate] = useState("");

  // Function to handle event creation
  const handleEnter = () => {
    HandleUserEvents(title, desc, sponser, date); // Call function to handle event submission to Firebase
    // Clear input fields and navigate back to previous screen
    setTitle("");
    setDesc("");
    setSponser("");
    setDate("");
    navigation.goBack();
  };

  return (
    <View>
      <Text>Enter Details for your event.</Text>
      {/* Input fields for event details */}
      <TextInput label="Title" value={title} onChangeText={setTitle} />
      <TextInput label="Description" value={desc} onChangeText={setDesc} />
      <TextInput label="Sponsor" value={sponser} onChangeText={setSponser} />
      <TextInput label="Date" value={date} onChangeText={setDate} />

      {/* Button to submit the event */}
      <Button onPress={handleEnter}>Enter</Button>

      {/* Button to dismiss and go back to previous screen */}
      <Button onPress={() => { 
        navigation.goBack(); // Navigate back
        setTitle(""); // Clear input fields
        setDesc("");
        setSponser("");
        setDate("");
      }}>
        Dismiss
      </Button>
    </View>
  );
}
