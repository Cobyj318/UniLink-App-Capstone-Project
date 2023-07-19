import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar, SafeAreaView, Text } from 'react-native';
import HomeEventCard from '../Components/HomeEventCard';
import { useState, useEffect } from 'react';
import { fetchData } from '../DBFunctions/FetchData';
//import onRefresh from '../DBFunctions/refreshFunctions';
import { RefreshControl } from 'react-native';



const HomeScreen = ({ navigation }) => {
    
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
    // State to store the fetched event data
    const [users, setUsers] = useState([]);
    // State to manage the refreshing status of the ScrollView
    const [refreshing, setRefreshing] = React.useState(false);
    // useEffect to fetch the event data when the component mounts
    useEffect(() => {
        const fetchEventData = async () => {
        // Call the fetchData function to fetch event data from Firebase
        const usersData = await fetchData();
        setUsers(usersData);
    };
    fetchEventData();
    }, []);

    return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh(setRefreshing, setUsers)} />}>
        <ScrollView horizontal style={styles.topScroll}>
          {/* Map through the users array to create horizontal cards */}
          {users.map((user) => (
            <View style={styles.card} key={user.id}>
              {/* Pass the user data as prop to HomeEventCard */}
              <HomeEventCard user={user} />
            </View>
          ))}
        </ScrollView>

        <ScrollView horizontal style={styles.bottomScroll}>
          {/* Map through the users array to create horizontal cards */}
          {users.map((user) => (
            <View style={styles.card} key={user.id}>
              {/* Pass the user data as prop to HomeEventCard */}
              <HomeEventCard user={user} />
            </View>
          ))}
          
        </ScrollView>
        <ScrollView horizontal style={styles.bottomScroll}>
          {/* Map through the users array to create horizontal cards */}
          {users.map((user) => (
            <View style={styles.card} key={user.id}>
              {/* Pass the user data as prop to HomeEventCard */}
              <HomeEventCard user={user} />
            </View>
          ))}
          
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topScroll: {
    maxHeight: 400,
    marginTop: 10,
    flexDirection: 'row',
  },
  bottomScroll: {
    maxHeight: 400,
    marginBottom: 10,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'lightblue',
    marginHorizontal: 10,
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: 'lightblue',
    margin: 4,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
