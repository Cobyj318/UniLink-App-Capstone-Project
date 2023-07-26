import * as React from 'react';
import { View, Text, TextInput,  Button, Alert } from 'react-native';
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
            HandleUserSubmit(Username, Password, Email);
            uploadBytes(storageRef, file).then((snapshot) => {console.log(Uploaded)})
        }
    }

    return(
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <UploadThing isEditing={true}/>
            <Button title="Take a photo" onPress={() => navigation.navigate(CamScreen, {from:"NewUser"})}/>
            <TextInput onChangeText={((val) => setUser(val))} placeholder="Username"/>
            <TextInput onChangeText={((val) => setPass(val))} placeholder="Password"/>
            <TextInput onChangeText={((val) => setEmail(val))} placeholder="Email"/>
            <Button title="Submit" onPress ={() => submitHandler(User, Pass, Email)}/>
        </View>
    );
};
export default NewUserScreen;
