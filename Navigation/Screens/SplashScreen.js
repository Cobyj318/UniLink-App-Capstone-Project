import * as React from 'react' ;
import {View, Text} from 'react-native';
import MainContainer from '../MainContainer';
import ProfileScreen from './ProfileScreen';
import NewUserScreen from './NewUserScreen';
import { firestore } from "../../src/firebase_init/firebase"

export default function SplashScreen({navigation}){
    return(
    <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <Text 
            onPress={()=> navigation.navigate('Main')}
            style={{ fontSize:26, fontWeight:'bold'}}>
            Splash Screen </Text>    
    </View>
    );
}