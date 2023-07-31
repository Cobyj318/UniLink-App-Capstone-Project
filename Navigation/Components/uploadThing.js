import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, SafeAreaView, Text, StyleSheet, Button, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import ActionSheet from './ActionSheet';
import CamScreen from '../Screens/CamScreen';
import * as ImagePicker from 'expo-image-picker';
import { Cams } from '../MainStack'

/**
 * @property {string} uri - The URI of the selected image.

 * A React component representing an image uploader with options to take a photo or upload an image from the camera roll.
 *
 * @param {boolean} props.isEditing - Indicates whether the component is in editing mode.
 * @returns {JSX.Element} The JSX representation of the image uploader.
 */

export default function UploadThing( {navigation, isEditing} ) {

  /**
   * @type {Array<Object>} actionItems - An array of action items to be displayed in the action sheet.
   */
  const actionItems = [
    {
      id: 1,
      label: 'Take a Photo',
      onPress: () => { navigation.navigate(CamScreen) }
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
        setImage(_image.uri);
    }
    closeActionSheet();
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