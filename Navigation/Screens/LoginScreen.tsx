import { View, StyleSheet,Button, KeyboardAvoidingView } from "react-native";
import React, { useState,useEffect } from "react";
import { FIREBASE_AUTH } from "../../src/firebase_init/firebase";
import { TextInput } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { signInWithEmailAndPassword} from "firebase/auth";
import { ExistingUser } from "../MainStack";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { enc, AES } from 'react-native-crypto-js';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;


  const saveLoginInfo = async (email, password) => {
    try {
      const encryptedEmail = AES.encrypt(email, 'your-secret-key').toString();
      const encryptedPassword = AES.encrypt(password, 'your-secret-key').toString();
  
      await AsyncStorage.setItem('userEmail', encryptedEmail);
      await AsyncStorage.setItem('userPassword', encryptedPassword);
    } catch (error) {
      console.error('Error saving login info:', error);
    }
  };
  const signIn= async ()=>{
    setLoading(true);
    try
    {
        const response=await signInWithEmailAndPassword(auth, email,password);
        saveLoginInfo(email,password);
        navigation.replace(ExistingUser);
    }
    catch (error: any){
        console.log(error);
        alert('Sign In failed'+ error.message);
    }
    finally {
        setLoading(false);
    }
}
  
  return (
    <View style={styles.container}>
    <KeyboardAvoidingView behavior="padding">
      <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
      <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
    {loading ? <ActivityIndicator size={"large"} color="0000ff"/>:
    <>
    <Button title="Login" onPress={()=> signIn()}/>
    </>
    }
    </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default LoginScreen;
