import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { useActionSheet } from '@expo/react-native-action-sheet';


export default function UploadThing( {isEditing} ) {
  const { showActionSheetWithOptions } = useActionSheet();
  
  const openOptions = () =>{
    const options = ["Delete", "Save", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2; 

      showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex, //the third button will be the 'Cancel' button
          destructiveButtonIndex, //the first button will be the 'Delete' option
        },
        (buttonIndex) => {
          alert("Index pressed: " + buttonIndex);
        }
      );
  }

  const [image, setImage] = useState(null);
  useEffect(() => {
    checkForCameraRollPermission()
  }, []);
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
  };

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
                          <TouchableOpacity onPress={() => openOptions()} style={imageUploaderStyles.uploadBtn} >
                              <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                              <AntDesign name="camera" size={20} color="black" />
                          </TouchableOpacity>
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