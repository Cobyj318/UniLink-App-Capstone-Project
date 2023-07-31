import { View, Text, StyleSheet,Button, KeyboardAvoidingView } from "react-native";
import React, { useState,useEffect } from "react";
import { FIREBASE_AUTH } from "../../src/firebase_init/firebase";
import { TextInput } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ExistingUser } from "../MainStack";
import NewUserScreen from "./NewUserScreen";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signUp =async()=>{
    setLoading(true);
    try
    {
        const response=await createUserWithEmailAndPassword(auth,email,password);
        console.log(response);
        alert('Thank you for registering!')
        navigation.navigate(NewUserScreen);
    }
    catch (error:any){
        console.log(error);
        alert('Sign up failed'+ error.message);
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
    <Button title="Create Account" onPress={()=> signUp()}/>
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

export default SignUpScreen;
