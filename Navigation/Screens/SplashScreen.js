import * as React from 'react' ;
import {View, Text, Button} from 'react-native';
import MainContainer from '../MainContainer';
import NewUserScreen from './NewUserScreen';
import { firestore } from "../../src/firebase_init/firebase"


export default function SplashScreen( {navigation} ){
    return(
    <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <Text 
            style={{ fontSize:26, fontWeight:'bold'}}>
            Splash Screen </Text>
        <Button onPress={()=> navigation.navigate(NewUserScreen)} title={"New User"}/>
        <Button onPress={()=> navigation.navigate(MainContainer)} title={"Old User"}/>
        <Button 
        title="Go to About" 
        onPress={() => navigation.navigate('ChatScreen')} 
      />
    </View>
    
    );
}
/*<Button title="Sign up"/>
            <Button title="Log in"/>*/