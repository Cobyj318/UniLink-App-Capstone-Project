import * as React from 'react' ;
import { useState, useEffect } from 'react';
import { View, Text, Image, Button, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'; // Import TouchableOpacity for custom button styling
import handleUserSubmit from '../../src/firebase_init/handleUserSubmit';
import UploadThing from '../Components/uploadThing'
import PortfolioScreen from './PortfolioScreen';
import { fetchData } from '../DBFunctions/FetchData';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';
import { fetchUserData } from '../Components/UserData';
import { CircularImage } from '../Components/CircleImage';
  
export default function ProfileScreen({navigation}){
    //const submithandler = () => {  
    //}
    const [edit, isEditing] = React.useState(false);
    const [nameEntry, nEntryEdited] = React.useState("");
    const [bioEntry, bEntryEdited] = React.useState("");
    const [Image_, setImage_] = useState("")
    const editProfile = () => {
        isEditing(!edit);  
    }
    const [users, setUsers] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // State to track if data is being fetched

    useEffect(() => {
        const fetchDataAndUserData = async () => {
        setIsLoading(true); // Set loading state to true when fetching data
        const usersData = await fetchData();
        setUsers(usersData);
        const userData = await fetchUserData(FIREBASE_AUTH.currentUser?.uid);
        setUserDetails(userData[0]);
        setIsLoading(false); // Set loading state to false when data fetching is complete
        };
        fetchDataAndUserData();  
        },[]);

  
    const userImage = userDetails ? userDetails.Profile_Image : '';
    useEffect(() => {
        setImage_(userImage)
    },[])

     return (
    <View style={{ flex: 1, alignSelf: 'center'}}>
      <View style={Pfstyles.container}>
        {edit ? <UploadThing navigation={navigation} isEditing={true} setImage_={setImage_}/> : <UploadThing navigation={navigation} isEditing={false} setImage_={setImage_}/> }

        <View style={Pfstyles.textContainer}>
            {edit ? <TextInput style={Pfstyles.containerItems} editable={true} placeholder={"Name"} value={nameEntry} onChangeText={value => nEntryEdited(value)} /> : <TextInput editable={false} value={nameEntry} style={Pfstyles.containerItems} placeholder={"Name"} />}

            <Text style={Pfstyles.containerItems}>Tags Here</Text>
        </View>
      </View>
        
      {edit ? <TextInput editable={true} style={styles.Bio} placeholder={"Bio"} value={bioEntry} onChangeText={value => bEntryEdited(value)} /> : <TextInput editable={false} style={styles.Bio} placeholder={"Bio"} value={bioEntry} />}
      
      <Text style={{ flex: 1 }}>Friends</Text>

      {/* Add the Portfolio button */}
      <TouchableOpacity onPress={() => navigation.navigate('PortfolioScreen')}>
        <Text style={{ color: '#3498db', marginVertical: 10 }}>Portfolio</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CollaborationScreen')}>
        <Text style={{ color: '#3498db', marginVertical: 10 }}>Create and join other people's Projects</Text>
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
    },
    Bio:{
        marginTop:10,
        backgroundColor:"#ffffff",
        borderRadius:40,
        minHeight:50,
        width:325,
        fontSize:20,
        paddingLeft:10,
    }
});

const Pfstyles = StyleSheet.create({
    container:{
        display:"flex",
        //position:"relative",
        alignItems:"flex-start",
        backgroundColor:"#ffffff",
        height:165,
        width:325,
        borderRadius:70,
        flexDirection:"row",
        marginTop:10,
        justifyContent:"space-between"
    },
    textContainer:{
        flex:1, 
        justifyContent:"space-evenly", 
        height:165
        
    },
    containerItems:{
        alignSelf:'center',
        paddingLeft:50,
        position:"relative",
        alignSelf:"center",
        right:35,
        fontSize:20,
    }
});