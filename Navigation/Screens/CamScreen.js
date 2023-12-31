import * as React from 'react';
import { View, Text, Image, SafeAreaView, Button, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Camera, CameraType, } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';
import {primaryColors, neutralColors} from "../Components/Colors"
import { updateDoc, doc, collection, getDocs, query, where, documentId } from 'firebase/firestore';
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { storage,firestore } from "../../src/firebase_init/firebase";
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';
import { fetchUserData } from '../Components/UserData';

/**
 * @typedef {Object} PhotoObject
 * @property {string} uri - The URI of the photo.
 * @property {string} base64 - The base64 representation of the photo.
 */

/**
 * @typedef {Object} CamScreenProps
 * @property {Object} navigation - The React Navigation object for navigation purposes.
 */

/**
 * A React component representing the camera screen.
 *
 * @param {CamScreenProps} props - The props passed to the component.
 * @returns {JSX.Element} The JSX representation of the camera screen.
 */

const CamScreen = ( {navigation, pageFrom} ) => {

    let camRef = React.useRef();
    const routes = navigation.getState()?.routes;
    const prevPage = routes[routes.length - 2];
    console.log(prevPage.name);

    const [imageLink, setImageLink] = React.useState("");
    const [uploading, setUploading] = React.useState(false);
    const [userDetails, setUserDetails] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true); // State to track if data is being fetched
    React.useEffect(() => {
        const fetchDataAndUserData = async () => {
            const userData = await fetchUserData(FIREBASE_AUTH.currentUser?.uid);
            //console.log(userData);
            setUserDetails(userData[0]);
            setIsLoading(false); // Set loading state to false when data fetching is complete
        };
        fetchDataAndUserData();  
        },[]);
    //setImageLink(userDetails.Profile_Image);



    
    /**
     * @type {boolean} camPermitted - checks and changes camera permissions.
     */
    const [camPermitted, setCamPermits] = React.useState();
    
    /**
     * @type {boolean} camRollPermitted - checks and changes camera roll permissions.
     */
    const [camRollPermitted, setCamRollPermits] = React.useState();
    
    /**
     * @type {PhotoObject} photo - The photo object captured by the camera.
     */
    const [photo, setPhoto] = React.useState()
    //const nameFrom = nameFrom.params

    React.useEffect(() => 
            {(async() => {
                const camPermissions = await Camera.requestCameraPermissionsAsync();
                //const micPermissions = await Camera.requestMicrophonePermissionsAsync();
                const camRollPermissions = await MediaLibrary.requestPermissionsAsync();
                setCamPermits(camPermissions.status === "granted")
                setCamRollPermits(camRollPermissions.status === "granted")
            })();
        }, []);

    if(camPermitted === undefined){
        return <Text>Testing Camera</Text>
    } else if (!camPermitted) {
        return <Text>Denied</Text>
    }

    /**
     * Takes a picture using the camera and sets the photo state.
     *
     * @async
     * @function takePic
     * @returns {Promise<void>}
     */
    let takePic = async () => {
        let options ={
            quality: 0,
            base64: true,
            exif: false,
        };
        
        let newPhoto = await camRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
        }

    if (photo){

        /**
         * Shares the captured photo.
         *
         * @function sharePic
         * @returns {void}
         */
        let sharePic = () => {
            shareAsync(photo.uri).then(() => {
                setPhoto(undefined);
            })
        };

        /**
         * Saves the captured photo to the device's camera roll and navigates to the Sign Up screen.
         *
         * @function savePhoto
         * @returns {void}
         */
        let savePhoto = async () => {
            /*MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });*/
            const storageRef = ref(storage, `images/${FIREBASE_AUTH.currentUser?.uid}/${Date.now()}.jpg`);
            const response = await fetch(photo.uri);
            const blob = await response.blob();
        
            try {
            const snapshot = await uploadBytes(storageRef, blob);

            // The image is successfully uploaded, now get the download URL
            const downloadURL = await getDownloadURL(snapshot.ref);
            //console.log('Download URL:', downloadURL);
            setImageLink(downloadURL);

            setUploading(false); // Set uploading state to false after successful upload
            } catch (error) {
            console.error("Error uploading image:", error);
            setUploading(false); // Set uploading state to false if there's an error
            }
            if (imageLink != null) {
                const userRef = collection(firestore, 'User_data');

                let firestoreQuery = query(userRef, where('Id', '==',  FIREBASE_AUTH.currentUser?.uid));

                const querySnapshot = await getDocs(firestoreQuery);
                const docos = querySnapshot.docs[0];
                console.log(imageLink);

                const docref = doc(firestore, 'User_data', docos.id);
                updateDoc(docref, {Profile_Image: imageLink})
                navigation.goBack();
            }
            else{
                navigation.goBack();
            }
        };

        /**
         * Disposes of the taken photo and returns to camera screen to retake it.
         *
         * @function retakePick
         * @returns {void}
         */
        let retakePick = () => {
            setPhoto(undefined);
            takePic()
        }
        return(
        <SafeAreaView style={{ flex: 1 }}>
            <Image style={{ flex: 1 }} source={{ uri: "data:image/jpg;base64," + photo.base64}}/>
            {camRollPermitted ? <Button title="Save" onPress={savePhoto}/> : undefined}
            <Button title="Retake" onPress={retakePick}/>
        </SafeAreaView>);}
    
    return(
        <Camera style={{flex:1,}} ref ={camRef}>
            <View style={{ flex:1, justifyContent:"flex-end",}}>
                <View style={styles.photoBtnContainer}>
                    <TouchableOpacity style={styles.takePhotoBtn} onPress={takePic}>
                        <Text> </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Camera>
    )
}

export default CamScreen;



const styles = StyleSheet.create({
    takePhotoBtn: {
        backgroundColor: primaryColors.red,
        borderRadius: 45,
        borderWidth:15,
        borderColor:neutralColors.darkblue,
        width:80,
        height:80,
        alignSelf:"center",
        marginBottom:15,
        marginTop:15,
        
    },
    photoBtnContainer:{
        backgroundColor:'rgba(0, 0, 0, 0.8)',
        backfaceVisibility: 'hidden',
    }
})