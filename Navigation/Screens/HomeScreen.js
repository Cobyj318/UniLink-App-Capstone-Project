import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar, SafeAreaView, Text } from 'react-native';
import HomeEventCard from '../Components/HomeEventCard';
import { useState, useEffect } from 'react';
import { fetchData } from '../DBFunctions/FetchData';
import onRefresh from '../DBFunctions/RefreshFunctions';
import { RefreshControl } from 'react-native';

const HomeScreen = ({ navigation }) => {
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
        <Text style={{ fontSize:30, fontWeight:'bold'}}>Events</Text>
        <ScrollView horizontal style={styles.topScroll}>
          {/* Map through the users array to create horizontal cards */}
          {users.map((user) => (
            <View style={styles.card} key={user.id}>
              {/* Pass the user data as prop to HomeEventCard */}
              <HomeEventCard user={user} />
            </View>
          ))}
        </ScrollView>
        <Text style={{ fontSize:30, fontWeight:'bold'}}>News</Text>
        <ScrollView horizontal style={styles.bottomScroll}>
          {/* Map through the users array to create horizontal cards */}
          {users.map((user) => (
            <View style={styles.card} key={user.id}>
              {/* Pass the user data as prop to HomeEventCard */}
              <HomeEventCard user={user} />
            </View>
          ))}
        </ScrollView>
        <Text style={{ fontSize:30, fontWeight:'bold'}}>Clubs</Text>
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
    backgroundColor: 'lightblue',
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
