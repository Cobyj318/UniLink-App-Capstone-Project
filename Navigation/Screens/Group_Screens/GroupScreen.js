import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, RefreshControl, View, ActivityIndicator } from 'react-native';
import { FAB, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import GroupCard from '../../Components/GroupCards';
import { useState, useEffect } from 'react';
import { fetchData } from '../../DBFunctions/FetchData';
import { primaryColors } from '../../Components/Colors';

export default function GroupsScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to handle pull-to-refresh
  const onRefresh = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const usersData = await fetchData(); // Call the fetchData function
      setUsers(usersData);
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
            refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
          >
            
            <GroupCard users={users} navigation={navigation}/>
          </ScrollView>
        )}
      </SafeAreaView>
      {/* <FloatingButton /> */}
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
    backgroundColor:primaryColors.blue,
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
});
