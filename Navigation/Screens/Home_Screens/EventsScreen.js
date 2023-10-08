import * as React from 'react';
import { StyleSheet, SafeAreaView,Text, ScrollView, StatusBar, RefreshControl, View, ActivityIndicator } from 'react-native';
import { FAB, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import EventCard from './Components/EventCard';
import { useState, useEffect } from 'react';
import { fetchData } from '../../DBFunctions/FetchData';
import { primaryColors } from '../../Components/Colors';
import RedLine from './Components/RedLine';

export default function EventsScreen({ navigation,userDetails }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to handle pull-to-refresh
  const onRefresh = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const usersData = await fetchData(); // Call the fetchData function
      setUsers(usersData);
      console.log(userDetails.FirstName);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {setTimeout(() => {
      setLoading(false)
    }, 500);
    }
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventData = await fetchData();
        setUsers(eventData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false when the data is fetched
      }
    };
    fetchEventData();
  }, []);

  // Custom FloatingButton component to navigate to CreateEventScreen
  const FloatingButton = () => (
    <FAB backgroundColor={'#3498db'} icon="plus" style={styles.fab} onPress={() => navigation.navigate('CreateEventScreen', {onRefresh: onRefresh,})}/>
  );

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        {loading ? (
          // Show the loading icon when data is being fetched
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3498db" />
          </View>
        ) : (
          // Show the ScrollView when data is loaded
          <ScrollView
            style={styles.scrollView}
            // Add a RefreshControl to enable pull-to-refresh functionality
            refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
          >  
            <View style={[styles.header]}>
              <Text style={styles.headerText}>Welcome Back {userDetails?.FirstName}! </Text>
            </View>
            <RedLine/>
            {/* Render the EventCard component and pass the fetched event data as props */}
            <EventCard users={users} />
          </ScrollView>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor:primaryColors.blue,
    justifyContent:'center',
    alignItems:'center',
  },
  headerText:{
    fontSize:40, 
    fontWeight:'bold',
    color:'white',
    textAlign: 'center', // Center text horizontally
    textAlignVertical: 'center',
  },
});
