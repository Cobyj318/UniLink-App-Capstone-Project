import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, SafeAreaView, Text, StyleSheet, Button, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import ActionSheet from './ActionSheet';
import CamScreen from '../Screens/CamScreen';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Cams } from '../MainStack';
import { updateDoc, deleteDoc, doc, collection, query, where } from 'firebase/firestore';
import { firestore, storage } from '../../src/firebase_init/firebase';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase'; 
import { fetchUserPfp } from './RetreiveUserPfp';


/**
 * @property {string} uri - The URI of the selected image.

 * A React component representing an image uploader with options to take a photo or upload an image from the camera roll.
 *
 * @param {boolean} props.isEditing - Indicates whether the component is in editing mode.
 * @returns {JSX.Element} The JSX representation of the image uploader.
 */

export default function UploadThing( {isEditing,navigation} ) {
  
  const userId = FIREBASE_AUTH.currentUser?.uid;
  
  /*if (){
    fetchUserPfp(userId);
  }*/
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 1];
  console.log(prevRoute);
  const handlePress = () => { navigation.navigate(Cams);
                              closeActionSheet();
                            
                            };
  /**
   * @type {Array<Object>} actionItems - An array of action items to be displayed in the action sheet.
   */
  const actionItems = [
    {
      id: 1,
      label: 'Take a Photo',
      onPress: () => handlePress(),
    },
    {
      id: 2,
      label: 'Upload Image',
      onPress: () => {addImage()}
    }
  ];

  /**
   * @type {boolean} actionSheet - changes the state of the action sheet.
   */
  const [actionSheet, setActionSheet] = useState(false);

  /**
   * Closes the action sheet.
   *
   * @function closeActionSheet
   * @returns {void}
   */
  const closeActionSheet = () => setActionSheet(false);

  /**
   * @type {string | null} image - The URI of the selected image or null if no image is selected.
   */
  const [image, setImage] = useState(null);
  useEffect(() => {
    checkForCameraRollPermission()
  }, []);
  if (Profile_Image) {setImage(Profile_Image)};
  
  /**
   * Opens the image picker to select an image from the camera roll.
   *
   * @async
   * @function addImage
   * @returns {Promise<void>}
   */
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });
    if (!_image.canceled) {
      updatePFP(_image.uri);
      setImage(_image.uri);
    }
    closeActionSheet();
  };

  const updatePFP = async (_image) =>{
    const storageRef = ref(storage, `images/pfps/${Date.now()}.jpg`);
    const response = await fetch(_image);
    const blob = await response.blob();

    try {
    const snapshot = await uploadBytes(storageRef, blob);
    // The image is successfully uploaded, now get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Download URL:', downloadURL);

    setUploading(false); // Set uploading state to false after successful upload
    } catch (error) {
    console.error("Error uploading image:", error);
    setUploading(false); // Set uploading state to false if there's an error
    }

    try{
      const pfpRef = doc(firestore, 'User_data', userId); 
      await updateDoc(pfpRef, {                             
        Profile_Image: downloadURL
      });
    } catch (error) {console.log(error)};
  };



  /**
   * Checks if camera roll permissions are granted and alerts the user if they are not.
   *
   * @async
   * @function checkForCameraRollPermission
   * @returns {Promise<void>}
   */
  const  checkForCameraRollPermission = async()=>{
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Please grant camera roll permissions inside your system's settings");
    }else{
      //console.log('Media Permissions are granted')
    }
  }; 
  if(isEditing === true){
    return (
              <View style={imageUploaderStyles.container}>
                  {image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                      <View style={imageUploaderStyles.uploadBtnContainer}>
                          <TouchableOpacity onPress={() => setActionSheet(true)} style={imageUploaderStyles.uploadBtn} >
                              <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                              <AntDesign name="camera" size={20} color="black" />
                          </TouchableOpacity>
                <Modal isVisible={actionSheet}
                  style={{margin: 0, justifyContent: 'flex-end'}}>
                  <ActionSheet actionItems={actionItems} onCancel={closeActionSheet}/>
                </Modal>
                      </View>
              </View>
    );
  }
  else if(isEditing === false){
    return (
      <View style={imageUploaderStyles.container}>
          {image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  };
}

const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'#c1c9d6',
        position:'relative',
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