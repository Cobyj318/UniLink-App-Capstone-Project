import React,{ useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator,} from 'react-native';
import { fetchData } from '../../DBFunctions/FetchData';
import { FIREBASE_AUTH } from '../../../src/firebase_init/firebase';
import { primaryColors } from '../../Components/Colors';
import { fetchUserData} from '../../Components/UserData';
import EventsScreen from './EventsScreen';

const HomeScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to track if data is being fetched
  
  const fetchDataAndUserData = async () => {
    setIsLoading(true); // Set loading state to true when fetching data
    const eventData = await fetchData();
    setUsers(eventData);
    const userData = await fetchUserData(FIREBASE_AUTH.currentUser?.uid);
    setUserDetails(userData[0]);
    console.log(FIREBASE_AUTH.currentUser?.uid);
    console.log(userData[0]);
    setIsLoading(false); // Set loading state to false when data fetching is complete
  };
  useEffect(() => {
    fetchDataAndUserData();      
  },[]);
    return (
    <View style={styles.container}>
      {isLoading ? 
      ( // Check if data is loading and show the ActivityIndicator
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>  
      ) : (
        <EventsScreen userDetails={userDetails} navigation={navigation}/>     
      )}
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: primaryColors.blue,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
