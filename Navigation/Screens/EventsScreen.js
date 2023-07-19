// EventsScreen.js

import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, RefreshControl } from 'react-native';
import { FAB, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import EventCard from '../Components/EventCard';
import { useState, useEffect } from 'react';
import CreateEventScreen from './InnerScreenB';
//import onRefresh from '../DBFunctions/refreshFunctions';
import { fetchData } from '../DBFunctions/FetchData';

export default function EventsScreen({ navigation }) {
  
const onRefresh = async (setRefreshing, setUsers) => {
  setRefreshing(true);
  try {
    const usersData = await fetchData(); // Call the fetchData function
    setUsers(usersData);
  } catch (error) {
    console.error('Error refreshing data:', error);
  } finally {
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }
};
  // State to manage the refreshing status of the ScrollView
  const [refreshing, setRefreshing] = React.useState(false);

  // State to store the fetched event data
  const [users, setUsers] = useState([]);

  // useEffect to fetch the event data when the component mounts
  useEffect(() => {
    const fetchEventData = async () => {
      // Call the fetchData function to fetch event data from Firebase
      const usersData = await fetchData();
      setUsers(usersData);
    };
    fetchEventData();
  }, []);

  // Custom FloatingButton component to navigate to CreateEventScreen
  const FloatingButton = () => (
    <FAB backgroundColor={'#3498db'} icon="plus" style={styles.fab} onPress={() => navigation.navigate(CreateEventScreen)} />
  );

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} 
          // Add a RefreshControl to enable pull-to-refresh functionality
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh(setRefreshing, setUsers)} />}>
          {/* Render the EventCard component and pass the fetched event data as props */}
          <EventCard users={users} />
        </ScrollView>
      </SafeAreaView>
      {/* Render the custom FloatingButton */}
      <FloatingButton />
    </PaperProvider>
  );
}

// Theme configuration for PaperProvider
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
    marginHorizontal: 10,
  },
  text: {
    fontSize: 42,
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
