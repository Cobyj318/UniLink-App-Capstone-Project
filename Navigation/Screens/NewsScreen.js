import * as React from 'react' ;
import {View, Text} from 'react-native';

export default function NewsScreen({navigation}){
    return(
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Text
                onPress={()=> alert('This is the "News" screen')}
                style={{ fontSize:26, fontWeight:'bold'}}>
                    News
            </Text>    
        </View> 
    );
}