import * as React from 'react' ;
import {View, Text} from 'react-native';
import MainContainer from '../MainContainer';
import ProfileScreen from './ProfileScreen';

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