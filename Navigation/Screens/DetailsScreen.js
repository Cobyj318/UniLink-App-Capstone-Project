import * as React from 'react' ;
import {View, Text} from 'react-native';

export default function DetailsScreen({navigation}){
    <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <Text
            onPress={()=> alert('This is the "Details" screen')}
            style={{ fontSize:26, fontWeight:'bold'}}>
                Details screen
        </Text>    
    </View>
}