import * as React from 'react' ;
import { View, Text, Image, Button, TextInput } from 'react-native';
import handleSubmit from '../../src/firebase_init/handleUserSubmit';
import UploadThing from './uploadThing'


export default function ProfileScreen({navigation}){
    //const submithandler = () => {  
    //}
    const [edit, isEditing] = React.useState(true);
    const editProfile = () => {
        isEditing(!edit);
    }
    return(
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <UploadThing/>
            {edit ? <TextInput style={{flex:1}} editable={false} placeholder={"Name"}/> : <TextInput style={{flex:1}} editable={true} placeholder={"Name"}/>}
            {edit ? <TextInput style={{flex:1}} editable={false} placeholder={"Bio"}/> : <TextInput style={{flex:1}} editable={true} placeholder={"Bio"}/>}
            <Text style={{flex:1}}>Friends</Text>
            <Button style={{flex:1}} title={"Edit Profile"} onPress={editProfile}/>    
        </View>
    );
        
}