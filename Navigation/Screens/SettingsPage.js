import * as React from 'react' ;
import { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Alert, Pressable, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteSelfData } from '../DBFunctions/editData';

export default function SettingsPage({navigation}){
    const [modalVisibility, setModalVisibility] = useState(false);
    const confirmDelete = () => {
        setModalVisibility(false);
        signOut();
        deleteSelfData();
    }

    const denyDelete = () => {
        setModalVisibility(false);
    }

    const askDelete = () => {
        setModalVisibility(true);
 }    
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
    }
})