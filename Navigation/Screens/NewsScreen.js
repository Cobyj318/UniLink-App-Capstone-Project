import * as React from 'react' ;
import {View} from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider,Card, Layout, Text } from '@ui-kitten/components';

export default function NewsScreen({navigation}){
    return(
        <ApplicationProvider {...eva} theme={eva.light}>
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Card>
            <Text
                onPress={()=> alert('This is the "News" screen')}
                style={{ fontSize:26, fontWeight:'bold'}}>
                    News
            </Text>
            </Card>    
        </View> 
        </ApplicationProvider>
    );
}