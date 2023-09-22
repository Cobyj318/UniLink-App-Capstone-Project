import * as React from 'react';
import { ImageBackground, View, Text, StyleSheet, Image } from 'react-native';
import { Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Portal } from 'react-native-paper';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

const BGImage = require('../../assets/SplashBG.png');
const Logo = require('../../assets/LaTechLogo.png');

export default function SplashScreen({ navigation }) {
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
