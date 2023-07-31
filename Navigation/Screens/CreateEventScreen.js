import React, { useState } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import HandleUserEvents from '../../src/firebase_init/handleUserEvents';
import CalendarPicker from 'react-native-calendar-picker';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';


export default function CreateEventScreen({ navigation, route }) {
  const { onRefresh } = route.params;
  
  // State variables to hold event details
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [sponser, setSponser] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  
 


  const onDateChange = (date) => {
      setSelectedStartDate(date);
      const datestring=(date ? date.toString() : '');
      const index = datestring.indexOf('2023')+4;
      setDate(datestring.substring(0,index));
  };
  const isFormValid = () => {
    return title.trim() !== "" && desc.trim() !== "" && sponser.trim() !== "" && date.trim() !== "";
  };
  // Function to handle event creation
  const handleEnter = () => {
    if (!isFormValid()) {
      // Alert the user to fill out all fields
      alert("Please fill out all fields before entering the event.");
      return;
    }
    const createdBy = FIREBASE_AUTH.currentUser?.uid;
    console.log(createdBy);
    HandleUserEvents(title, desc, sponser, date,createdBy); 
    setTitle("");
    setDesc("");
    setSponser("");
    setDate("");
    navigation.goBack();
    if (onRefresh) {
      onRefresh();
    }
  };
  
  return (
    <ScrollView style={styles.scrollView}>
    <View>
      <Text>Enter Details for your event.</Text>
      <TextInput label="Title" value={title} onChangeText={setTitle} />
      <TextInput label="Description" value={desc} onChangeText={setDesc} />
      <TextInput label="Sponsor" value={sponser} onChangeText={setSponser} />
      <TextInput label="Location" value={location} onChangeText={setLocation} />

      <CalendarPicker onDateChange={onDateChange} selectedDayColor="#69B3E7" todayBackgroundColor="#FFFFFF" allowRangeSelection={false}/>
      <View style={styles.textStyle}>
        <Text style={styles.textStyle}> Selected Start Date :</Text>
        <Text style={styles.textStyle}> {selectedStartDate ? selectedStartDate.toString() : ''} </Text>
      </View>
      <Button onPress={handleEnter}>Enter</Button>    
      <Button onPress={() => {                      
        navigation.goBack();                          
        setTitle("");                                 
        setDesc("");
        setSponser("");
        setDate("");
      }}>
        Dismiss
      </Button>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
});