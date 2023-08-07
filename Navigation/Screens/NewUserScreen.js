import * as React from 'react';
import { useState,useEffect } from 'react';
import { View, Text, TextInput,  Button, Alert, StyleSheet,KeyboardAvoidingView } from 'react-native';

import { storage, db } from "../../src/firebase_init/firebase"
import HandleUserSubmit from '../../src/firebase_init/handleUserSubmit'
import UploadThing from '../Components/uploadThing';
import CamScreen from './CamScreen';
import { ExistingUser } from "../MainStack";
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";

/**
 * A React component representing the screen for creating a new user.
 *
 * @param {Object} props.navigation - The React Navigation object for navigation purposes.
 * @returns {JSX.Element} The JSX representation of the new user screen.
 */

const NewUserScreen = ( {navigation} ) => {
    /*User Info Inits*/
  const [Image_, setImage_] = useState("");
  const [uploading, setUploading] = useState(false);

    /**
     * @type {string} User - The username entered by the user.
     */
    const [User, setUser] = React.useState('');

    /**
     * @type {string} Pass - The password entered by the user.
     */
    const [Pass, setPass] = React.useState('');

    /**
     * @type {string} Email - The email entered by the user.
     */
    const [Email, setEmail] = React.useState('');

    /**
     * @type {string} Image - The image URI for the user's profile picture.
     */
    const [Image, setImage] = React.useState("");

    /**
     * @type {Object} storageRef - The reference to the Firebase storage where the file will be uploaded.
     */
    const storageRef = ref(storage, "Test-Files");

     /**
     * Handles the submission of the user's information and triggers the user creation process.
     *
     * @function submitHandler
     * @param {string} Username - The username entered by the user.
     * @param {string} Password - The password entered by the user.
     * @param {string} Email - The email entered by the user.
     * @returns {void}
     */
    const submitHandler = async (Username, Password, Email) => {
        if (Username === "" || Password === "" || Email === ""){
            Alert.alert("Missing Entries", "You have empty entries", [{text: 'OK',},]);
        } else{
          const storageRef = ref(storage, `images/${FIREBASE_AUTH.currentUser?.uid}/${Date.now()}.jpg`);
          const response = await fetch(Image_);
          const blob = await response.blob();
      
          try {
            const snapshot = await uploadBytes(storageRef, blob);
            // The image is successfully uploaded, now get the download URL
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log('Download URL:', downloadURL);
            HandleUserSubmit(Username, Password, Email,FIREBASE_AUTH.currentUser?.uid,downloadURL);
            navigation.navigate(ExistingUser);

            setUploading(false); // Set uploading state to false after successful upload
          } catch (error) {
            console.error("Error uploading image:", error);
            setUploading(false); // Set uploading state to false if there's an error
          }
          
        }
    }
    useEffect(() => {
      console.log(Image_);
    });
    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.container}>
          <View style={styles.UploadContainer}>
            <UploadThing isEditing={true} navigation={navigation} setImage_={setImage_}/>
          </View>
            <TextInput style={styles.input} onChangeText={((val) => setUser(val))} placeholder="First Name"/>
            <TextInput style={styles.input} onChangeText={((val) => setPass(val))} placeholder="Last Name"/>
            <TextInput style={styles.input} onChangeText={((val) => setEmail(val))} placeholder="Major"/>
            <Button title="Submit" onPress ={() => submitHandler(User, Pass, Email)}/>
        </View>
        </KeyboardAvoidingView>
    );
};
export default NewUserScreen;


const styles = StyleSheet.create({
    
  container: {
      flex: 1,
      justifyContent: 'center',
    },
    UploadContainer: {
      alignItems:'center'
    },
   
    label: {
      fontSize: 18,
      marginBottom: 10,
    },
    
    input: {
      width:'100%',
      marginVertical: 4,
      height: 50,
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      backgroundColor: "#fff",
    },
  });
  