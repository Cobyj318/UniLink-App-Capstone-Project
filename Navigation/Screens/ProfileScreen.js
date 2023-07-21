import * as React from 'react' ;
import { View, Text, Image, Button, TextInput, StyleSheet } from 'react-native';
import handleUserSubmit from '../../src/firebase_init/handleUserSubmit';
import UploadThing from '../Components/uploadThing'


export default function ProfileScreen({navigation}){
    //const submithandler = () => {  
    //}
    const [edit, isEditing] = React.useState(false);
    const editProfile = () => {
        isEditing(!edit);
    }
    return(
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            {edit ? <UploadThing navigation={null} isEditing={true}/> : <UploadThing navigation={null} isEditing={false}/>}
            {edit ? <TextInput style={{flex:1}} editable={true} placeholder={"Name"} value='Nothing'/> : <TextInput style={{flex:1}} editable={false} placeholder={"Name"} value='Nothing'/>}
            {edit ? <TextInput style={{flex:1}} editable={true} placeholder={"Bio"} value='Something'/> : <TextInput style={{flex:1}} editable={false} placeholder={"Bio"} value='Something'/>}
            <Text style={{flex:1}}>Friends</Text>
            {edit ? <Button style={{flex:1}} title={"Save Changes"} onPress={editProfile} buttonColor={"#3498db"}/> : <Button style={{flex:1}} title={"Edit Profile"} onPress={editProfile} buttonColor={"#3498db"}/>}    
        </View>
    );
        
}

const styles = StyleSheet.create({
    notEditing:{
        flex:1,
        color: "#ffffff"
    },
    editing:{
        flex:1,
        color: "#99a19b"
    },
    editBtn:{
        flex:1
    },
    saveEditsBtn:{
        flex:1
    }
});