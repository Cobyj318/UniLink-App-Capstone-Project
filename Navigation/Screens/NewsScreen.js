import * as React from 'react';
import { useState,useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar,KeyboardAvoidingView } from 'react-native';
import NewsCard from '../Components/NewsCard';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import NewsCardV2 from '../Components/NewsCardV2';
import CommentSection from '../Components/CommentSection';
import { firestore } from '../../src/firebase_init/firebase';
import { updateDoc, doc, collection, getDocs} from '@firebase/firestore';
import NewsDetailsScreen from './NewsDetails';

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


function LatechNewsScreen() {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);

  const fetchNewsDatafordisplay = async () => {
    setLoading(true); // Set loading state to true when fetching data
    const newsData = await fetchNewsData();
    setNews(newsData);
    setLoading(false); // Set loading state to false when data fetching is complete
  };
  useEffect(() => {
    fetchNewsDatafordisplay();
  }, []);

  return (
      <ScrollView style={styles.scrollView}>
      {news?.map((id) => (
          <NewsCard key={id.id} news={id}/>
        ))}
      </ScrollView>
  );
}

// Screen for displaying the sports news
function SportsNewsScreen() {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);

  const fetchNewsDatafordisplay = async () => {
    setLoading(true); // Set loading state to true when fetching data
    const newsData = await fetchNewsData();
    setNews(newsData);
    setLoading(false); // Set loading state to false when data fetching is complete
  };
  useEffect(() => {
    fetchNewsDatafordisplay();
  }, []);

  return (
      <ScrollView style={styles.scrollView}>
      {news?.map((id) => (
          <NewsCard key={id.id} news={id}/>
        ))}
      </ScrollView>
  );
}

const Tab = createMaterialTopTabNavigator();
const LatechStack = createStackNavigator(); // Create a new stack navigator for LatechNewsScreen

// Stack navigator for LatechNewsScreen
function LatechStackScreen() {
  
  return (
    <LatechStack.Navigator screenOptions={{headerShown: false, }}>
      <LatechStack.Screen name="LatechNews" component={LatechNewsScreen}/>
      <LatechStack.Screen name="NewsDetailsScreen" component={NewsDetailsScreen} />
      {/* You can add more screens specific to LatechNewsScreen here */}
    </LatechStack.Navigator>
  );
}

export default function NewsScreen({ navigation }) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        {/* Tab screen for displaying LatechNews */}
        <Tab.Screen name="LaTech" component={LatechStackScreen} />
        {/* Tab screen for displaying SportsNews */}
        <Tab.Screen name="Sports" component={SportsNewsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: 'white',
  },
  text: {
    fontSize: 42,
  },
});
