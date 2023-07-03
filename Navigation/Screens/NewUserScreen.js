import * as React from 'react';
import { View, Text, TextInput, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import MainContainer from '../MainContainer';
import ProfileScreen from './ProfileScreen';
/*import { useRef } from 'react';
import { addDoc, collection } from "@firebase/firestore"
import { firestore, db } from "../../src/firebase_init/firebase"
import { ref, onValue } from 'firebase/database'*/
import HandleUserSubmit from '../../src/firebase_init/handleUserSubmit'


const NewUserScreen = ({ navigation }) => {
    const [User, setUser] = React.useState('');
    const [Pass, setPass] = React.useState('');
    const [Email, setEmail] = React.useState('');
/*
    const [type, setType] = React.useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }*/
    const submithandler = (Username, Password, Email) => {
      HandleUserSubmit(Username, Password, Email);
    }
    return(
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Text>Something</Text>
            <TextInput onChangeText={((val) => setUser(val))} placeholder="Username"/>
            <TextInput onChangeText={((val) => setPass(val))} placeholder="Password"/>
            <TextInput onChangeText={((val) => setEmail(val))} placeholder="Email"/>
            <Button title="Submit" onPress ={() => submithandler(User, Pass, Email)}/>
        </View>
    );
};

export default NewUserScreen;

/*
<Camera type={type} styles={{flex:1}} ref={(r) => {camera = r}}>
</Camera>
<View style={{backgroundColor: 'red'}}>
    <TouchableOpacity onPress={toggleCameraType}>
        <Text>Flip Camera</Text>
    </TouchableOpacity>
</View>*/