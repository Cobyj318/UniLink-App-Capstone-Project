import * as React from 'react' ;
import { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'; // Import TouchableOpacity for custom button styling
import UploadThing from '../Components/uploadThing'
import PortfolioScreen from './PortfolioScreen';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';
import { fetchUserData } from '../Components/UserData';
import { editData } from '../DBFunctions/editData';
import Avatar_profiles from '../Components/Avatar_profiles';
import { RefreshControl } from 'react-native';
import { fetchAllUsers } from './NetworkScreen';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { SettingsButton } from './ProfileStack';
//import SettingsPage from './SettingsPage';

export default function ProfileScreen({navigation}){
    const [edit, isEditing] = useState(false);
    const [nameEntry, nEntryEdited] = useState("");
    const [Image_, setImage_] = useState("")
    const [majorTag, setMajorTag] = useState("");
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        fetchDataAndUserData(); 

        },[]);

    const fetchDataAndUserData = async () => {
        setLoading(true); // Set loading state to true when fetching data
        const usersData = await fetchAllUsers();
        setUsers(usersData);
        const userData = await fetchUserData(FIREBASE_AUTH.currentUser?.uid);
        setUserDetails(userData[0]);
        console.log("THIS IS USERDATA",userData[0]);
        setLoading(false); // Set loading state to false when data fetching is complete
    };

    const userName = `${userDetails ? userDetails.FirstName: ''} ${userDetails ? userDetails.LastName: ''}`;
    const userImage = userDetails ? userDetails.Profile_Image : '';
    const userMajor = userDetails ? userDetails.Major : '';
    
    useEffect(() => {
        setImage_(userImage);
        nEntryEdited(userName);
        setMajorTag(userMajor)
    },[]);

    const editProfile = () => {
        isEditing(!edit);
        if (edit === true){
            let newNameEntry= nameEntry.split(' ');
            editData(newNameEntry, majorTag);
        }
    }

    const onRefresh = async () => {
        try {
          fetchDataAndUserData();  
          nEntryEdited(userName);
          setMajorTag(userMajor)
        } catch (error) {
          console.error('Error refreshing data:', error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      };

     return (
        <ScrollView style={{ flex: 1, alignSelf: 'center'}} showsVerticalScrollIndicator={false}  refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />} >
            {edit ? <TouchableOpacity style={{ borderRadius:99, backgroundColor:"#ffffff", width:36, height:36, justifyContent:"center", paddingLeft:5 }} title={"Edit Profile"} onPress={editProfile}>
                <Icon name={"check"} size={25} color="#3498db"/>
            </TouchableOpacity> : <TouchableOpacity style={{ borderRadius:99, backgroundColor:"#fffff", width:36, height:36, justifyContent:"center", paddingLeft:6 }} title={"Save Changes"} onPress={editProfile}>
                <Icon name={"pencil"} size={25} color="#3498db"/>
            </TouchableOpacity>}
            <View style={Pfstyles.container}>
                {edit ? <UploadThing navigation={navigation} isEditing={true} setImage_={setImage_}/> : <UploadThing navigation={navigation} isEditing={false} setImage_={setImage_}/> }
                <View style={Pfstyles.textContainer}>
                    {edit ? <TextInput style={Pfstyles.containerItems} editable={true} placeholder={"Name"} value={nameEntry} onChangeText={value => nEntryEdited(value)} /> : <TextInput editable={false} value={nameEntry} style={Pfstyles.containerItems} placeholder={"Name"} />}
                    {edit ? <Picker selectedValue={majorTag} onValueChange={(item) => setMajorTag(item)} style={{height:80}} itemStyle={{height:80, fontSize:15}}>
                <Picker.Item label="Select Major" value="" />
                <Picker.Item label="Accounting" value="Accounting" />
                <Picker.Item label="Aerospace Engineering" value="Aerospace Engineering" />
                <Picker.Item label="Biology" value="Biology" />
                <Picker.Item label="Biomedical Engineering" value="Biomedical Engineering" />
                <Picker.Item label="Business Administration" value="Business Administration" />
                <Picker.Item label="Chemical Engineering" value="Chemical Engineering" />
                <Picker.Item label="Chemistry" value="Chemistry" />
                <Picker.Item label="Civil Engineering" value="Civil Engineering" />
                <Picker.Item label="Computer Engineering" value="Computer Engineering" />
                <Picker.Item label="Computer Science" value="Computer Science" />
                <Picker.Item label="Electrical Engineering" value="Electrical Engineering" />
                <Picker.Item label="Environmental Engineering" value="Environmental Engineering" />
                <Picker.Item label="Finance" value="Finance" />
                <Picker.Item label="Industrial Engineering" value="Industrial Engineering" />
                <Picker.Item label="Information Technology" value="Information Technology" />
                <Picker.Item label="Marketing" value="Marketing" />
                <Picker.Item label="Mechanical Engineering" value="Mechanical Engineering" />
                <Picker.Item label="Physics" value="Physics" />
                <Picker.Item label="Psychology" value="Psychology" />
                <Picker.Item label="Software Engineering" value="Software Engineering" />
            </Picker> 
            : <Text style={Pfstyles.containerItems}>{majorTag}</Text> }
                </View>
            </View>             
            <View style={styles.Bio}>
                <Text style={{fontSize:30, fontWeight:"700", alignSelf:'center'}}>Portfolio</Text>
                <PortfolioScreen/>
            </View>
            <View style={styles.Bio}>
                <Text style={{fontSize:30, fontWeight:"700", alignSelf:'center'}}>Connections</Text>
                <View style={styles.avatarContainer}>
                    {userDetails?.true_connections?.map((id) => (
                    <Avatar_profiles user={id} userID={id} AllUsers={users} navigation={navigation} />
                    ))}
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('CollaborationScreen')}>
                <Text style={{ color: '#3498db', marginVertical: 10 }}>Create and join other people's Projects</Text>
            </TouchableOpacity>
        </ScrollView>
  );
}
const styles = StyleSheet.create({
    notEditing:{
        flex:1,
        color: "#ffffff"
    },
    avatarContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow avatars to wrap to the next row
        alignItems: 'center', // Align avatars vertically in the middle of the row
        marginTop: 10, // Add margin if needed
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
        paddingTop:10,
        flex:1,
        marginTop:10,
        backgroundColor:"#ffffff",
        borderRadius:40,
        minHeight:150,
        width:325,
        fontSize:20,
        //paddingLeft:10,
        overflow:'hidden',
    },
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