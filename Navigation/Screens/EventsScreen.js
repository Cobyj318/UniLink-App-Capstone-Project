import * as React from 'react' ;
import {StyleSheet,
        SafeAreaView,
        ScrollView,
        StatusBar} 
from 'react-native';
import EventCard from '../Compoenents/EventCard';
import { Modal, Portal,FAB, Text, Button,TextInput,DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};


export default function NewsScreen({navigation}){
  
  const [visible, setVisible] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};  
  const FloatingButton = () => (<FAB backgroundColor={'#3498db'} icon="plus" style={styles.fab} onPress={() => setVisible(true)}/>
  
  );
  return(
    <PaperProvider theme={theme}>
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>       
        </ScrollView>
        <FloatingButton/>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} dismissable={false} >
            <Text>Enter Details for your event.</Text>
            <TextInput label="Title" value={title} onChangeText={title => setTitle(title)}  />
            <TextInput label="Description" value={desc} onChangeText={desc => setDesc(desc)}  />

            <Button onPress={hideModal}>Enter</Button>
            <Button onPress={hideModal}>Dismiss</Button>
          </Modal>
        </Portal>
    </SafeAreaView>
    </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      backgroundColor: 'white',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
    container: {
      minHeight: 192,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    fab: {
    
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  });
