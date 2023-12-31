import * as React from 'react' ;
import { useState, useEffect } from 'react';
import { View, Text, Modal, Image, Button, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'; // Import TouchableOpacity for custom button styling
import { fetchUserData } from '../Components/UserData';
import Tags from './Tags';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';



const OthersProfile = ({ isVisible, user, onClose, MessageButton, handleNavigate}) => {
    const [edit, isEditing] = React.useState(false);
    const [nameEntry, nEntryEdited] = React.useState("");
    const [bioEntry, bEntryEdited] = React.useState("");
    const [Image_, setImage_] = useState("")
    const [users, setUsers] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // State to track if data is being fetched
    const homeStack = createStackNavigator(); 
    const navigation = useNavigation();
    

    const MessagesButton = ({ onPress }) => (
      <TouchableOpacity onPress={onPress}>
        <Icon name="comment-o" size={24} color="#3498db" />
      </TouchableOpacity>
    );



// Drawer navigation to make the message button navigate to message screen 
const Drawer = createDrawerNavigator();



    useEffect(() => {
        const fetchUserDataAndTagData = async () => {
          try {
            console.log("user changed");
            // Fetch user data
            if (user) {
              const userData = await fetchUserData(user.uid);
              setUserDetails(userData);

            } else {
              console.log('Failed to Grab User');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
  // Only fetch data if user is available and modal is not open
  if (user && !isVisible) {
    fetchUserDataAndTagData();
  }
}, [user]);       
  
  return (
 
    
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={() => onClose()}
      
    >

        <View style={{ flex: 1, backgroundColor: '#003087' }}> 
   
      <ScrollView style={{ flex: 1, alignSelf: 'center'}} showsVerticalScrollIndicator={false}>
      <View style={Pfstyles.container}>

      <Image
  source={{ uri: user?.Profile_Image }} // Replace with your image URL
  style={imageUploaderStyles.container} // Adjust width and height as needed
/>


        <View style={Pfstyles.textContainer}>
        <Text style={Pfstyles.containerItems}> {user?.FirstName + " " + user?.LastName}  </Text>
        
       
        <MessagesButton onPressonPress={() => handleNavigate()}/>

</View>
      </View>

      <View style={styles.Bio}>
  <Text style={{fontSize: 30, fontWeight: '700', alignSelf: 'center'}}>Connections</Text>
  <FlatList />
</View>

      <View style={styles.Bio}>
            <Text style={{fontSize:30, fontWeight:"700", alignSelf:'center'}}>Portfolio</Text>
            {user?.Skills && user?.Skills.length > 0 && (
              <>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Skills</Text>
                <Tags
                  tags={user?.Skills}
                  color="#9b59b6"
                  editable={false}
                />
              </>
            )}
            {user?.Interests && user?.Interests.length > 0 && (
              <>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Interests</Text>
                <Tags
                  tags={user?.Interests}
                  color="#9b59b6"
                  editable={false}
                />
              </>
            )}
            {user?.Projects && user?.Projects.length > 0 && (
              <>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Projects</Text>
                <Tags
                  tags={user?.Projects}
                  color="#9b59b6"
                  editable={false}
                />
              </>
            )}
            {user?.Experience && user?.Experience.length > 0 && (
              <>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Experience</Text>
                <Text style={styles.experienceText}>{user?.Experience}</Text>

              </>
            )}
          </View>
      
      <Button title="Close" onPress={() => onClose()} />

          </ScrollView>
       </View>   
    </Modal>
  );
};

const imageUploaderStyles=StyleSheet.create({
    container:{
        //elevation:1,
        marginTop:7,
        marginLeft:10,
        height:150,
        width:150,
        backgroundColor:'#c1c9d6',
        //position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})
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
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
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
    experienceText: {
      fontSize: 20,
      marginBottom: 30,
      marginHorizontal: 20,
      marginLeft: 5,
      textAlign: 'left',
      lineHeight: 20,
    },
    messageButton: {
      backgroundColor: '#3498db',
      padding: 5,
      borderRadius: 10,
      marginTop: 20,
      alignItems: 'center',
      width: 140
    },
    messageButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
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
        marginTop:65,
        justifyContent:"space-between"
    },
    textContainer:{
        flex:1, 
        justifyContent:"space-evenly", 
        height:165,
        width: 120,
        
    },
    containerItems:{
        alignSelf:'center',
        paddingLeft:50,
        position:"relative",
        alignSelf:"center",
        right:35,
        fontSize:25,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#A72B2A',
    }
});


export default OthersProfile;
