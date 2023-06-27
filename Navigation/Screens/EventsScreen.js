import * as React from 'react' ;
import {View, Text,Pressable} from 'react-native';

export default function EventsScreen({navigation}){
    return(
    <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <Text
            onPress={()=> alert('This is the "Events" screen')}
            style={{ fontSize:26, fontWeight:'bold'}}>
                Events screen
        </Text>    
        
            <Text
            onPress={()=> alert('You have RSVP')}
            style={{ fontSize:26, fontWeight:'bold'}}>
                RSVP
            </Text>
        
    </View>
    )
}