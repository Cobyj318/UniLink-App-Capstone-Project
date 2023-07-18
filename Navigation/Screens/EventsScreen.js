import * as React from 'react' ;
import {StyleSheet,SafeAreaView,ScrollView,StatusBar,RefreshControl} from 'react-native';
import { Modal, Portal,FAB, Text, Button,TextInput,DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import EventCard from '../Components/EventCard';
import { useState,useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore"; 
import { firestore } from "../../src/firebase_init/firebase"
import InnerScreenB from './InnerScreenB';

export default function EventsScreen({navigation}){
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, 'Event_data'));
      const usersData = [];
      querySnapshot.forEach((doc) => {
        const { Title, Description, Sponser, Date } = doc.data();
        usersData.push({
          id: doc.id,
          Title,
          Description,
          Sponser,
          Date,
        });
      });
      setUsers(usersData);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 500);
    }
  }, []);
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

  const containerStyle = {backgroundColor: 'white', padding: 20};  
  const FloatingButton = () => (<FAB backgroundColor={'#3498db'} icon="plus" style={styles.fab} onPress={()=> navigation.navigate(InnerScreenB)}/>);
  
  return(
    <PaperProvider theme={theme}>
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <EventCard users={users}/>     
        </ScrollView>
        <FloatingButton/> 
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
