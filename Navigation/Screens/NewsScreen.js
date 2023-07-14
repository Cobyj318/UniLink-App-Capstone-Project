import * as React from 'react' ;
<<<<<<< Updated upstream
import {View, Text} from 'react-native';

export default function NewsScreen({navigation}){
    return(
=======
import {View} from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider,Card, Layout, Text } from '@ui-kitten/components';
import {Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './ChatScreen';

const Chat = "ChatScreen";
const Stack = createNativeStackNavigator();

export default function NewsScreen({navigation}){
    return(

        <ApplicationProvider {...eva} theme={eva.light}>
>>>>>>> Stashed changes
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Text
                onPress={()=> alert('This is the "News" screen')}
                style={{ fontSize:26, fontWeight:'bold'}}>
                    News
<<<<<<< Updated upstream
            </Text>   
            <Text
        onPress={()=> alert('You have RSVP')}
        style={{ fontSize:26, fontWeight:'bold'}}>
            Create Status Post
        </Text>
=======
            </Text>
            </Card>    
            <Button 
        title="Go to About" 
        onPress={() => navigation.navigate('ChatScreen')} 
      />
>>>>>>> Stashed changes
        </View> 
    );
}

