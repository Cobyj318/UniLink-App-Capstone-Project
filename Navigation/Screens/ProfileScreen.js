import * as React from 'react' ;
import {View, Text} from 'react-native';
import handleSubmit from '../../src/firebase_init/handleUserSubmit';
import { useRef } from 'react';

export default function ProfileScreen({navigation}){
    const dataRef = useRef()
 
    const submithandler = (e) => {
      e.preventDefault()
      handleSubmit(dataRef.current.value)
      dataRef.current.value = ""
    }
    return(
    <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <Text
            onPress={()=> navigation.navigate('Home')}
            style={{ fontSize:26, fontWeight:'bold'}}>
                Profile Screen
        </Text>    
    </View>
    );
}