import * as React from 'react' ;
import {View, Text, Button} from 'react-native';
import MainContainer from '../MainContainer';
import NewUserScreen from './NewUserScreen';

export default function SplashScreen( {navigation} ){
    return(
    <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <Text style={{ fontSize:26, fontWeight:'bold'}}>
            Splash Screen 
        </Text>
        <Button onPress={()=> navigation.navigate(NewUserScreen)} title={"New User"}/>
        <Button onPress={()=> navigation.navigate(MainContainer)} title={"Old User"}/>
    </View>
    
    );
}
/*<Button title="Sign up"/>
            <Button title="Log in"/>*/