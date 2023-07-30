import * as React from 'react';
import { View, Text, TextInput,  Button, Alert, StyleSheet,KeyboardAvoidingView } from 'react-native';
/*
import { ref, onValue } from 'firebase/database'
import { ref, onValue, push, update, remove } from 'firebase/database';
import { addDoc, collection } from "@firebase/firestore"
*/
import { storage, db } from "../../src/firebase_init/firebase"
import { ref, uploadBytes } from "firebase/storage"
import HandleUserSubmit from '../../src/firebase_init/handleUserSubmit'
import UploadThing from '../Components/uploadThing';
import CamScreen from './CamScreen';
import { ExistingUser } from "../MainStack";
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';

/**
 * A React component representing the screen for creating a new user.
 *
 * @param {Object} props.navigation - The React Navigation object for navigation purposes.
 * @returns {JSX.Element} The JSX representation of the new user screen.
 */


const NewUserScreen = ( {navigation} ) => {
    /*User Info Inits*/

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
    const submitHandler = (Username, Password, Email) => {
        if (Username === "" || Password === "" || Email === ""){
            Alert.alert("Missing Entries", "You have empty entries", [{text: 'OK',},]);
        } else{
            HandleUserSubmit(Username, Password, Email,FIREBASE_AUTH.currentUser?.uid);
        }
    }

    const SubmitButton=(Username, Password, Email)=>{
        submitHandler(Username, Password, Email);
        navigation.navigate(ExistingUser);
    }

    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <UploadThing isEditing={true}/>
            <Button title="Take a photo" onPress={() => navigation.navigate(CamScreen, {from:"NewUser"})}/>
            <TextInput onChangeText={((val) => setUser(val))} placeholder="First Name"/>
            <TextInput onChangeText={((val) => setPass(val))} placeholder="Last Name"/>
            <TextInput onChangeText={((val) => setEmail(val))} placeholder="Major"/>
            <Button title="Submit" onPress ={() => SubmitButton(User, Pass, Email)}/>
        </View>
        </KeyboardAvoidingView>
    );
};
export default NewUserScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      padding: 20,
      width: '80%',
      backgroundColor: '#f0f0f0',
    },
    label: {
      fontSize: 18,
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderWidth: 1,
      padding: 10,
    },
  });
  