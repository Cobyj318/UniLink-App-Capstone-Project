import * as React from 'react' ;
import { useState, useEffect } from 'react';
import { View, Text, Image, Button, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'; // Import TouchableOpacity for custom button styling
import handleUserSubmit from '../../src/firebase_init/handleUserSubmit';
import UploadThing from '../Components/uploadThing'
import PortfolioScreen from './PortfolioScreen';
import { fetchData } from '../DBFunctions/FetchData';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';
import { fetchUserData } from '../Components/UserData';
import { fetchFriendData } from '../Components/FriendData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { editData } from '../DBFunctions/editData';
import { Avatar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

export default function ProfileScreen({navigation}){
    //const submithandler = () => {  
    //}
    const [edit, isEditing] = useState(false);
    const [nameEntry, nEntryEdited] = useState("");
    const [Image_, setImage_] = useState("")
    const [refreshing, setRefreshing] = useState(false);
    const [majorTag, setMajorTag] = useState("");
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // State to track if data is being fetched
    useEffect(() => {
        const fetchDataAndUserData = async () => {
        setIsLoading(true); // Set loading state to true when fetching data
        const userData = await fetchUserData(FIREBASE_AUTH.currentUser?.uid);
        setUserDetails(userData[0]);
        setIsLoading(false); // Set loading state to false when data fetching is complete
        };
        fetchDataAndUserData();  
        },[]);

    const userName = `${userDetails ? userDetails.FirstName: ''} ${userDetails ? userDetails.LastName: ''}`;
    const userImage = userDetails ? userDetails.Profile_Image : '';
    const userConnections = userDetails ? userDetails.Connections : [];
    
    useEffect(() => {
        setImage_(userImage);
        //console.log(userDetails)
        //console.log(userName);
        nEntryEdited(userName);
    },[]);

    const signOut = async () => {
        try {
            await AsyncStorage.removeItem('userEmail');
            await AsyncStorage.removeItem('userPassword');
            console.log('Data deleted from AsyncStorage');      
            await AsyncStorage.clear();
            await FIREBASE_AUTH.signOut();
            // Redirect to the login screen or any other screen after signing out.
            navigation.replace('SplashScreen');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const editProfile = () => {
        isEditing(!edit);
        if (edit === true){
            let newNameEntry= nameEntry.split(' ');
            editData(newNameEntry, majorTag);
        }
    }

    const listData = async () => {
        let friends = []
        if(userConnections != []){
                const userData = fetchFriendData(userConnections[0]);
                console.log(userData);
                friends[0] = {Firstname: userData.FirstName, Lastname: userData.LastName, pfi: userData.Profile_Image, Id:userData.id};      
        }
        return(friends);
    }
    //let DATA = listData();
    const Data = []

    const getItem =(data, index) => ({
        id: Math.random().toString(12).substring(0),
        Firstname: "John" + index,
        Lastname: "Smith",
        pfi: "../../assets/adaptive-icon.png",
    })

    const connectionsList = (Name, Pfi) => {
        <View>    
            <TouchableOpacity style={{flex:1, flexDirection: 'row', backgroundColor:'#000000'}}>
                <Avatar.Image size={24} source={Pfi}/>
                <Text>${Name}</Text>
            </TouchableOpacity>
        </View>
    }  
    
    const getItemCount = (data) => {return 50;}
  

     return (
    <ScrollView style={{ flex: 1, alignSelf: 'center'}} showsVerticalScrollIndicator={false}>
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
        <FlatList
            data={Data}
            renderItem={({e}) => <connectionsList Name={e.Firstname} Pfi={e.pfi}/>}
            keyExtractor={e=>e.id}
     /> 
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('CollaborationScreen')}>
        <Text style={{ color: '#3498db', marginVertical: 10 }}>Create and join other people's Projects</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signOut}>
        <Text style={{ color: '#ff0000', marginVertical: 10 }}>Sign Out</Text>
      </TouchableOpacity>

      {edit ? <Button style={{ flex: 1 }} title={"Save Changes"} onPress={editProfile} buttonColor={"#3498db"} /> : <Button style={{ flex: 1 }} title={"Edit Profile"} onPress={editProfile} buttonColor={"#3498db"} />}
    </ScrollView>
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