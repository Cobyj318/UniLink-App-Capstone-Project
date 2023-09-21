import React,{ useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Text, Dimensions, ActivityIndicator,RefreshControl  } from 'react-native';
import HomeEventCard from '../Components/HomeEventCard';
import RedLine from '../Components/RedLine';
import onRefresh from '../DBFunctions/RefreshFunctions';
import { fetchData } from '../DBFunctions/FetchData';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';
import { neutralColors, primaryColors } from '../Components/Colors';
import { fetchUserData} from '../Components/UserData';
import { fetchtagData } from '../DBFunctions/FetchData';
import { firestore } from '../../src/firebase_init/firebase';
import { updateDoc, doc, collection, getDocs} from '@firebase/firestore';
// import HomeNewsCard from "../Components/HomeNewsCard"
import NewsCardV2 from '../Components/HomeNewsCard';

const fetchNewsData = async () => {
  try {
    const eventsRef = collection(firestore, 'News_data');
    const querySnapshot = await getDocs(eventsRef);
    const newsData = [];
    querySnapshot.forEach((doc) => {
      const { Body, Title,From} = doc.data();
      newsData.push({
        id: doc.id,
        Title,
        From,
        Body,
      });
    });
    return newsData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to track if data is being fetched
  const [news, setNews] = useState([]);
  const userEmail = userDetails ? userDetails.FirstName : '';
  const screenHeight = Dimensions.get('window').height;
  const viewHeightPercentage = 15;
  const viewHeight = (screenHeight * viewHeightPercentage) / 100;
  // const userImage=userDetails ? userDetails.Profile_Image : '';
  
  const fetchNewsDatafordisplay = async () => {
    setIsLoading(true); // Set loading state to true when fetching data
    const newsData = await fetchNewsData();
    setNews(newsData);
    setIsLoading(false); // Set loading state to false when data fetching is complete
  };
  useEffect(() => {
    const fetchDataAndUserData = async () => {
      setIsLoading(true); // Set loading state to true when fetching data
      const usersData = await fetchData();
      setUsers(usersData);
      const userData = await fetchUserData(FIREBASE_AUTH.currentUser?.uid);
      setUserDetails(userData[0]);
      setIsLoading(false); // Set loading state to false when data fetching is complete
    };
    fetchDataAndUserData();  
    fetchNewsDatafordisplay();
    },[]);

    return (
      <View style={styles.container}>
        {isLoading ? ( // Check if data is loading and show the ActivityIndicator
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="white" />
            </View>
          ) : (
      <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh(setRefreshing, setUsers)} />}>
        <View style={[styles.header, { height: viewHeight }]}>
            <Text style={styles.headerText}>Welcome Back, {userEmail}</Text>
        </View>
        <RedLine />
        <Text style={styles.titlesTextfirst}>Events</Text>
        <ScrollView horizontal style={styles.topScroll}>
          {users.map((user) => (
            <View style={styles.card} key={user.id}>
              <HomeEventCard user={user} />
            </View>
          ))}
        </ScrollView>
        <Text style={styles.titlesText}>News</Text>
        <ScrollView horizontal style={styles.bottomScroll}>
          {news.map((user) => (
            <View style={styles.card} key={user.id}>
              <NewsCardV2 news={user}/>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.titlesText}>Projects</Text>
        <ScrollView horizontal style={styles.bottomScroll}>
          {users.map((user) => (
            <View style={styles.card} key={user.id}>
              <HomeEventCard user={user} />
            </View>
          ))}
          
        </ScrollView>
      </ScrollView>)}
    </View>
  );
};

const styles = StyleSheet.create({
  topScroll: {
    maxHeight: 460,
    marginTop: 10,
    flexDirection: 'row',
  },
  bottomScroll: {
    maxHeight: 460,
    marginBottom: 10,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: primaryColors.blue,
  },
  scrollView: {
    backgroundColor: neutralColors.lightblue,
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: neutralColors.lightblue,
    margin: 4,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  titlesText:{
    fontSize:30, 
    fontWeight:'bold',
    paddingLeft: 20,
    paddingBottom:10,
  },
  titlesTextfirst:{
    fontSize:30, 
    fontWeight:'bold',
    paddingLeft: 20,
    paddingTop:10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
