import * as React from 'react' ;
import {StyleSheet,SafeAreaView,ScrollView,StatusBar,FlatList} from 'react-native';
import { Modal, Portal,FAB, Text, Button,TextInput,DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import EventCard from '../Components/EventCard';
import { useState,useEffect } from 'react';
import HandleUserEvents from '../../src/firebase_init/handleUserEvents';
import { collection, getDocs } from "firebase/firestore"; 
import { firestore } from "../../src/firebase_init/firebase"
import NewUserScreen from './NewUserScreen';
import InnerScreenB from './InnerScreenB';

export default function EventsScreen({navigation}){
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "Event_data"));
      const usersData = [];
      querySnapshot.forEach((doc) => {
        const {Title,Description,Sponser,Date} = doc.data();
        usersData.push({
          id:doc.id,
          Title,
          Description,
          Sponser,
          Date,
        });
      });
      setUsers(usersData);
    };
    fetchData();
  }, []);

  const [visible, setVisible] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [sponser, setSponser] = React.useState("");
  const [date, setDate] = React.useState("");
  const hideModal = () => setVisible(false);
  
  const containerStyle = {backgroundColor: 'white', padding: 20};  
  const FloatingButton = () => (<FAB backgroundColor={'#3498db'} icon="plus" style={styles.fab} onPress={()=> navigation.navigate(InnerScreenB)}/>);
  
  return(
    <PaperProvider theme={theme}>
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <EventCard users={users}/>     
        </ScrollView>
        <FloatingButton/>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} dismissable={false} >
            <Text>Enter Details for your event.</Text>
            <TextInput label="Title" value={title} onChangeText={title => setTitle(title)}  />
            <TextInput label="Description" value={desc} onChangeText={desc => setDesc(desc)}  />
            <TextInput label="Sponser" value={sponser} onChangeText={sponser => setSponser(sponser)}  />
            <TextInput label="Date" value={date} onChangeText={date => setDate(date)}  />
            <Button onPress={() => {HandleUserEvents(title,desc,sponser,date);hideModal();}}>Enter</Button>
            <Button onPress={hideModal}>Dismiss</Button>
          </Modal>
        </Portal>
    </SafeAreaView>
    </PaperProvider>
    );
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

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
