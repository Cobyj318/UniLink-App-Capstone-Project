import * as React from 'react';
import { View, Text, TextInput,  Button, Alert } from 'react-native';
import MainContainer from '../MainContainer';
/*
import { ref, onValue } from 'firebase/database'
import { ref, onValue, push, update, remove } from 'firebase/database';
import { addDoc, collection } from "@firebase/firestore"
import { firestore, db } from "../../src/firebase_init/firebase"
*/
import HandleUserSubmit from '../../src/firebase_init/handleUserSubmit'
import CamScreen from './CamScreen'




const NewUserScreen = ( {navigation} ) => {
    /*User Info Inits*/
    const [User, setUser] = React.useState('');
    const [Pass, setPass] = React.useState('');
    const [Email, setEmail] = React.useState('');

    const submitHandler = (Username, Password, Email) => {
        if (Username === "" || Password === "" || Email === ""){
            Alert.alert("Missing Entries", "You have empty entries", [{text: 'OK', onPress: () => console.log('OK Pressed')},]);
        } else{
            HandleUserSubmit(Username, Password, Email);
        }
    }

    return(
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Button onPress={() => navigation.navigate(CamScreen)} title={"Image"} />
            <TextInput onChangeText={((val) => setUser(val))} placeholder="Username"/>
            <TextInput onChangeText={((val) => setPass(val))} placeholder="Password"/>
            <TextInput onChangeText={((val) => setEmail(val))} placeholder="Email"/>
            <Button title="Submit" onPress ={() => submitHandler(User, Pass, Email)}/>
        </View>
    );
};
//<Text onPress={}>Something</Text>
export default NewUserScreen;
