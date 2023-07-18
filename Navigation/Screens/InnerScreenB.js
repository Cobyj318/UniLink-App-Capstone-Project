import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import HandleUserEvents from '../../src/firebase_init/handleUserEvents';

export default function InnerScreenB({ navigation }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [sponser, setSponser] = useState("");
  const [date, setDate] = useState("");
  const handleEnter = () => {
    HandleUserEvents(title, desc, sponser, date);
    setTitle("");setDesc("");setSponser("");setDate("");
    navigation.goBack();
  };

  return (
    <View>
      <Text>Enter Details for your event.</Text>
      <TextInput label="Title" value={title} onChangeText={setTitle} />
      <TextInput label="Description" value={desc} onChangeText={setDesc} />
      <TextInput label="Sponsor" value={sponser} onChangeText={setSponser} />
      <TextInput label="Date" value={date} onChangeText={setDate} />
      <Button onPress={handleEnter}>Enter</Button>
      <Button onPress={() => { navigation.goBack(); setTitle(""); setDesc(""); setSponser(""); setDate(""); }}>
        Dismiss
      </Button>
    </View>
  );
}
