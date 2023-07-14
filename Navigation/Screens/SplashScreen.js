import * as React from 'react' ;
import {View, Text,StyleSheet} from 'react-native';
import MainContainer from '../MainContainer';
import NewUserScreen from './NewUserScreen';
import {Button,DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

export default function SplashScreen( {navigation} ){
    return(
    <PaperProvider theme={theme}>
        <View style={styles.ViewStyle}>
            <Text style={styles.SplashscreenText}>Uni-Link</Text>
            <Button onPress={()=> navigation.navigate(NewUserScreen)} mode="contained" style={styles.Signup}>Sign Up</Button>
            <Button onPress={()=> navigation.navigate(MainContainer)} mode="contained" style={styles.Existinguser}>Existing User</Button>
        </View>
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
    Signup: {
        position:'absolute', 
        bottom:350,
    },
    Existinguser: {
        position: 'absolute',
        bottom:300,
    },
    SplashscreenText: {
         fontSize:60, 
         fontWeight:'bold', 
         color:'white',
         bottom:80,
    },
    ViewStyle: {
        flex: 1, 
        alignItems:'center', 
        justifyContent:'center', 
        backgroundColor:'#4d5f80'
   },
});