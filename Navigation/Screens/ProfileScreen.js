import * as React from 'react' ;
import { View, Text, Image, Button, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'; // Import TouchableOpacity for custom button styling
import handleUserSubmit from '../../src/firebase_init/handleUserSubmit';
import UploadThing from '../Components/uploadThing'
import PortfolioScreen from './PortfolioScreen';



  
export default function ProfileScreen({navigation}){
    //const submithandler = () => {  
    //}
    const [edit, isEditing] = React.useState(false);
    const [nameEntry, nEntryEdited] = React.useState("");
    const [bioEntry, bEntryEdited] = React.useState("");
    const editProfile = () => {
        isEditing(!edit);  
    }


     return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {edit ? <UploadThing navigation={null} isEditing={true} /> : <UploadThing navigation={null} isEditing={false} />}

      {edit ? <TextInput style={{ flex: 1 }} editable={true} placeholder={"Name"} value={nameEntry} onChangeText={value => nEntryEdited(value)} /> : <TextInput style={{ flex: 1 }} editable={false} value={nameEntry} placeholder={"Name"} />}


      {edit ? <TextInput style={{ flex: 1 }} editable={true} placeholder={"Bio"} value={bioEntry} onChangeText={value => bEntryEdited(value)} /> : <TextInput style={{ flex: 1 }} editable={false} placeholder={"Bio"} value={bioEntry} />}

      <Text style={{ flex: 1 }}>Friends</Text>

      {/* Add the Portfolio button */}
      <TouchableOpacity onPress={() => navigation.navigate('PortfolioScreen')}>
        <Text style={{ color: '#3498db', marginVertical: 10 }}>Portfolio</Text>
      </TouchableOpacity>

      {edit ? <Button style={{ flex: 1 }} title={"Save Changes"} onPress={editProfile} buttonColor={"#3498db"} /> : <Button style={{ flex: 1 }} title={"Edit Profile"} onPress={editProfile} buttonColor={"#3498db"} />}
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