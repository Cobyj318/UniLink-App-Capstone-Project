import * as React from 'react';
import { View, Text, Image, SafeAreaView, Button, TouchableOpacity, StatusBar } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const CamScreen = ( {navigation} ) => {

    let camRef = React.useRef();
    const [camPermitted, setCamPermits] = React.useState();
    const [camRollPermitted, setCamRollPermits] = React.useState();
    const [photo, setPhoto] = React.useState()

    React.useEffect(() => 
            {(async() => {
                const camPermissions = await Camera.requestCameraPermissionsAsync();
                //const micPermissions = await Camera.requestMicrophonePermissionsAsync();
                const camRollPermissions = await MediaLibrary.requestPermissionsAsync();
                setCamPermits(camPermissions.status === "granted")
                setCamRollPermits(camRollPermissions.status === "granted")
            })();
        }, []);

    let takePic = async () => {
        let options ={
            quality: 1,
            base64: true,
            exif: false
        };
        let newPhoto = await camRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    }

    if (photo){
        let sharePic = () => {
            shareAsync(photo.uri).then(() => {
                setPhoto(undefined);
            })
        };

        let savePhoto = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };
        return(<SafeAreaView style={{ flex: 1 }}>
            <Image source={{ uri: "data:image/photo.base64," + photo.base64}}/>
            <Button title="Share" onPress={sharePic}/>
            {camRollPermitted ? <Button title="Save" onPress={savePhoto}/> : undefined}
            <Button title="Discard" onPress={() => setPhoto(undefined)}/>
        </SafeAreaView>);}
        
    if(camPermitted === undefined){
        return <Text>Testing Camera</Text>
    } else if (!camPermitted) {
        return <Text>Denied</Text>
    }
    
    return(
        <Camera style={{flex:1}}>
            <View>
                <Button title={"Take Pic"} onPress={takePic} style={{ flex:1}}/>
            </View>
        </Camera>
    )
}

export default CamScreen;