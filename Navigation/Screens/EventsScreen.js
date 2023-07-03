import * as React from 'react' ;
import {StyleSheet,View} from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider,Card, Layout, Text, Input,Button, Modal  } from '@ui-kitten/components';


export default function EventsScreen({navigation}){
    
  const [value, setValue] = React.useState('');
  const [value1,setValue2] = React.useState('');

  const [visible, setVisible] = React.useState(false);
    return(
<ApplicationProvider {...eva} theme={eva.light}>
    <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            
            <Text
            onPress={()=> alert('This is the "Events" screen')}
            style={{ fontSize:50, fontWeight:'bold'}}>
                Events screen
            </Text>  
            
    
        <Button style={{ fontSize:26, fontWeight:'bold'}}>
            RSVP
        </Button> 
           
        <Button 
            onPress={() => setVisible(true)} 
            style={{ fontSize:26, fontWeight:'bold'}}>
                Create Event
        </Button> 
        <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
        > 
            <Card disabled={true}>
            <Text 
                style={{ fontSize:25, fontWeight:'bold'}}>
                Input event details!
            </Text>

            <Input
            placeholder='Name of your event'
            value={value}
            onChangeText={nextValue => setValue(nextValue)}
            />
             <Input
            placeholder='Details'
            value={value1}
            onChangeText={nextValue => setValue2(nextValue)}
            />
            <Button onPress={() => setVisible(false)}>
                Enter
            </Button>
            <Button onPress={() => setVisible(false)}>
                DISMISS
            </Button>
            </Card>
        </Modal>
    </View>
</ApplicationProvider>
    )
}


const styles = StyleSheet.create({
    container: {
      minHeight: 192,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });