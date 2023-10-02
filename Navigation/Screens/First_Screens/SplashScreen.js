import * as React from 'react';
import { useState,useEffect } from 'react';
import { ImageBackground, View, Text, StyleSheet, Image } from 'react-native';
import { Button,Portal, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import { FIREBASE_AUTH } from '../../../src/firebase_init/firebase';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { enc, AES } from 'react-native-crypto-js';
import { signInWithEmailAndPassword} from "firebase/auth";

const BGImage = require('../../../assets/SplashBG.png');
const Logo = require('../../../assets/LaTechLogo.png');
const auth = FIREBASE_AUTH;

export default function SplashScreen({ navigation }) {
  
  const [loading, setLoading] = useState(false);
  // Set up your sign-in function
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // If sign-in is successful, update the user state
      navigation.replace('TabNavigator');
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  };
  // Check if there is user data saved in AsyncStorage
  const loadLoginInfo = async () => {
    try {
      const encryptedEmail = await AsyncStorage.getItem('userEmail');
      const encryptedPassword = await AsyncStorage.getItem('userPassword');
      if (encryptedEmail && encryptedPassword) {
        const decryptedEmail = AES.decrypt(encryptedEmail, 'your-secret-key').toString(enc.Utf8);
        const decryptedPassword = AES.decrypt(encryptedPassword, 'your-secret-key').toString(enc.Utf8);
        
        // Try to sign in with the saved credentials
        await signIn(decryptedEmail, decryptedPassword);
      }
    } catch (error) {
      console.error('Error loading login info:', error);
    }
  };
  
  useEffect(() => {
    loadLoginInfo();
  }, []);

 
  return (
    <PaperProvider theme={theme}>
      <ImageBackground source={BGImage} resizeMode='cover' style={styles.image}>
        <View style={styles.Tint}>
          <Portal>
            <View style={styles.container}>
              {/* App Logo */}
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={Logo} />
              </View>
              {/* App Title */}
              <View style={styles.titleContainer}>
                <Text style={styles.SplashscreenText}>Uni-Link</Text>
              </View>
              {/* Buttons */}
              <View style={styles.buttonContainer}>
                {/* Sign Up Button */}
                <Button onPress={() => navigation.navigate(SignUpScreen)} mode="contained" style={styles.Signup} buttonColor={'#cb333b'}>Sign Up</Button>
                {/* Existing User Button */}
                <Button onPress={() => navigation.navigate(LoginScreen)} mode="contained" style={styles.Existinguser} buttonColor={'#cb333b'}>Existing User</Button>
              </View>
            </View>
          </Portal>
        </View>
      </ImageBackground>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20, // Add margin between logo and title
  },
  logo: {
    width: 200,
    height: 180,
    alignSelf: 'center',
  },
  titleContainer: {
    marginBottom: 10, // Add margin between title and buttons
  },
  SplashscreenText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%', // Set the width of the button wrapper
    marginTop: 10,
  },
  Existinguser: {
    marginTop: 20,
    width: '40%',
  },
  Signup: {
    marginTop: 10,
    width: '40%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  Tint: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003087',
    opacity: 0.8,
  },
});
