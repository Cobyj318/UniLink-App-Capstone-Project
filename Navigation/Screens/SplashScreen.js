import * as React from 'react';
import { ImageBackground, View, Text, StyleSheet, Image } from 'react-native';
import MainContainer from '../MainContainer';
import NewUserScreen from './NewUserScreen';
import { Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Portal } from 'react-native-paper';

const BGImage = require('../../assets/SplashBG.png');
const Logo = require('../../assets/LaTechLogo.png');

export default function SplashScreen({ navigation }) {
  return (
    <PaperProvider theme={theme}>
      {/* Background Image */}
      <ImageBackground source={BGImage} resizeMode='cover' style={styles.image}>
        <View style={styles.Tint}>
          <Portal>
            {/* LaTech Logo */}
            <Image style={styles.logo} source={Logo} />
            <View style={styles.TopMenu}>
              {/* App Title */}
              <Text style={styles.SplashscreenText}>Uni-Link</Text>
              {/* Sign Up Button */}
              <Button onPress={() => navigation.navigate(NewUserScreen)} mode="contained" style={styles.Signup} buttonColor={'#cb333b'}>Sign Up</Button>
              {/* Existing User Button */}
              <Button onPress={() => navigation.navigate(MainContainer)} mode="contained" style={styles.Existinguser} buttonColor={'#cb333b'}>Existing User</Button>
            </View>
          </Portal>
        </View>
      </ImageBackground>
    </PaperProvider>
  );
}

// Custom theme for PaperProvider
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
  logo: {
    width: 200,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    top: 200,
    left: 90,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  Existinguser: {
    position: 'absolute',
    bottom: 300,
    width: 135,
  },
  Signup: {
    position: 'absolute',
    bottom: 350,
    width: 135,
  },
  SplashscreenText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    bottom: 100,
  },
  Tint: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003087',
    opacity: 0.8,
  },
  TopMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
