import React, { useState } from "react";
import { View, Text, StyleSheet, Button, KeyboardAvoidingView, ImageBackground } from "react-native";
import { FIREBASE_AUTH } from "../../../src/firebase_init/firebase";
import { TextInput } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ExistingUser } from "../../MainStack";
import NewUserScreen from "./NewUserScreen";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Thank you for registering!');
      navigation.navigate(NewUserScreen);
    } catch (error) {
      console.log(error);
      alert('Sign up failed' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/image.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)} />
          <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)} />
          {loading ? <ActivityIndicator size={"large"} color="0000ff" /> :
            <Button title="Create Account" onPress={() => signUp()} />
          }
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
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
