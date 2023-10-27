import * as React from 'react' ;
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Modal, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteSelfData } from '../DBFunctions/editData';

export default function SettingsPage({navigation}){
    const [modalVisibility, setModalVisibility] = useState(false);
    const [tutorVisbility, setTutorVisibilities] = useState(false);
    const tutorScreenshots = [{title: "Welcome to Uni-Link", image: require('../../assets/image.png'), text: "With the Uni-Link app, we want to connect students of different majors to help each other with project needing assistance from other fields of studies" },
    {title: "Home Page", image:require("../../assets/image.png") , text: "Here on the home page, you can see events going on around campus, your messages, your notifications, events you've RSVP for, and Projects that you like."},
    {title: "Creating Events", image:require("../../assets/image.png"), text: "With the blue plus, you can create your own events that you wish for others to join. "}, 
    {title: "Messaging", image: require("../../assets/image.png"), text: "By tapping the message icon in the home page, you can message other users on the app with individual or group messages"},
    {title: "Projects", image: require("../../assets/image.png"), text: "In the 'Groups' page, you can view all the public groups projects and filter through them based on tags provided. Then, you can like them to know more about them for later or ask to join. All your liked project can be viewed in the home page."},
    {title: "Profile", image: require("../../assets/image.png"), text: "Here you can customize your profile image and change any personal information"},
                                ];

    const confirmDelete = () => {
        setModalVisibility(false);
        signOut();
        deleteSelfData();
    }

    const denyDelete = () => {
        setModalVisibility(false);
    };

    const askDelete = () => {
        setModalVisibility(true);
    };    
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
    const openTutorial = () => {
        setTutorVisibilities(true);
    };
    const exitTutorial = () => {
        setTutorVisibilities(false);
    }

    return(
        <View>
            <TouchableOpacity onPress={signOut}>
                <Text style={{ color: '#ff0000', marginVertical: 10 }}>Sign Out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={askDelete}>
                <Text style={{ color: '#ff0000', marginVertical: 10 }}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ color: '#ff0000', marginVertical: 10 }}>Block Users</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ color: '#000000', marginVertical: 10 }}>Set Visibility</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openTutorial}>
                <Text style={{ color: '#000000', marginVertical: 10 }}>View Tutorial</Text>
            </TouchableOpacity>
            <Modal animationType='fade' transparent={true} visible={modalVisibility}>
                <View style={styles.centeringModal}>
                    <View style={styles.modalDesign}>
                        <Text>Are you sure you want to delete your account?</Text>
                        <View style={styles.modalButtonsView}>
                            <Pressable onPress={confirmDelete} style={styles.modalButtons}>
                                <Text>Yes</Text>
                            </Pressable>
                            <Pressable onPress={denyDelete} style={styles.modalButtons}>
                                <Text>No</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal animationType="slide" visible={tutorVisbility}>
                <View style={styles.centeringModal}>
                    <View style={tutorStyles.tutorDesign}>
                        <Pressable style={{height:15, width:30}} onPress={exitTutorial}>
                            <Text>Exit</Text>
                        </Pressable>
                        <FlatList snapToInterval={345}horizontal pagingEnabled={true} showsHorizontalScrollIndicator={true} style={tutorStyles.tutorDesign} data={tutorScreenshots} renderItem={({item}) => 
                            <View style={{paddingHorizontal:28}}>
                                <Text style={tutorStyles.headerDesign}>{item.title}</Text>
                                <Image style={styles.backgroundImage} source={item.image}/>
                                <Text style={tutorStyles.promptDesign}>{item.text}</Text>
                            </View>}>
                                
                        </FlatList>
                    </View>
                </View>
            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    centeringModal:{
        flex:1, 
        justifyContent:'center',
        alignItems: 'center',
        marginTop:22,
    },
    modalDesign:{
        flex: 1,
        flexDirection:'column',
        margin: 70,
        marginVertical:280,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
    },
    modalButtonsView:{
        flex:1,
        flexDirection:'row',
    },
    modalButtons:{
        paddingTop:30,
        marginHorizontal: 30,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        width:280,
        borderRadius:25,
        height: 380
    }
})

const tutorStyles = StyleSheet.create({
    tutorDesign:{
        //flex: 1,
        //flexDirection:'column',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
    },
    headerDesign:{
        fontSize:50,
        textAlign:'center',
        marginBottom:10,
        width:290
    },
    promptDesign:{
        fontSize:20,
        textAlign:'center',
        marginTop:10,
        width:290
    }
})