import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import HandleUserEvents from '../../src/firebase_init/handleUserEvents';
import CalendarPicker from 'react-native-calendar-picker';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';
import * as ImagePicker from 'expo-image-picker';
import { CircularImage } from '../Components/CircleImage';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";


export default function CreateEventScreen({ navigation, route }) {
  const { onRefresh } = route.params;
  
  // State variables to hold event details
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [sponser, setSponser] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const storage = getStorage();
  const [uploading, setUploading] = useState(false);
 


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
    HandleUserEvents(title, desc, sponser, date,createdBy); 
    setTitle("");
    setDesc("");
    setSponser("");
    setDate("");
    
  };
 
const handlePicture = async () => {
  let _image = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!_image.cancelled) {
    setUploading(true); // Set uploading state to true
    setSelectedImage(_image.uri);
    const storageRef = ref(storage, `images/${FIREBASE_AUTH.currentUser?.uid}/${Date.now()}.jpg`);
    const response = await fetch(_image.uri);
    const blob = await response.blob();

    try {
      const snapshot = await uploadBytes(storageRef, blob);
      // The image is successfully uploaded, now get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Download URL:', downloadURL);
      // You can save the downloadURL to your Firestore database if needed
      setUploading(false); // Set uploading state to false after successful upload
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false); // Set uploading state to false if there's an error
    }
  }
};
  
  useEffect(() => {
    console.log("CreateEventScreen rerendered");
  });
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
        <CircularImage imageUrl={selectedImage}/>
      </View >
      <View style={styles.buttonView}>
        <Button onPress={handlePicture}>Picture</Button>
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
  buttonView:{
    padding:8,
    paddingHorizontal:8,
    justifyContent:'space-between',
  },
});