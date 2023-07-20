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
            {edit ? <UploadThing isEditing={true}/> : <UploadThing isEditing={false}/>}
            {edit ? <TextInput style={styles.editing} editable={true} placeholder={"Name"}/> : <TextInput style={styles.notEditing} editable={false} placeholder={"Name"}/>}
            {edit ? <TextInput style={styles.editing} editable={true} placeholder={"Bio"}/> : <TextInput style={styles.notEditing} editable={false} placeholder={"Bio"}/>}
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