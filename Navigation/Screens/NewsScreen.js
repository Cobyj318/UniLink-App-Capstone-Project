import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar,KeyboardAvoidingView } from 'react-native';
import NewsCard from '../Components/NewsCard';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import NewsCardV2 from '../Components/NewsCardV2';
import CommentSection from '../Components/CommentSection';

// Screen for displaying the detailed news content
function NewsDetailsScreen() {
  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.scrollView}>
        <NewsCard/>
        <CommentSection/>
      </ScrollView>
      </KeyboardAvoidingView>

  );
};

function LatechNewsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </ScrollView>
    </SafeAreaView>
  );
}

// Screen for displaying the sports news
function SportsNewsScreen() {
  return (
      <ScrollView style={styles.scrollView}>
        <NewsCardV2 />
        <NewsCardV2 />
        <NewsCardV2 />
        <NewsCardV2 />
        <NewsCardV2 />
        <NewsCardV2 />
      </ScrollView>
  );
}

const Tab = createMaterialTopTabNavigator();
const LatechStack = createStackNavigator(); // Create a new stack navigator for LatechNewsScreen

// Stack navigator for LatechNewsScreen
function LatechStackScreen() {
  return (
    <LatechStack.Navigator
      screenOptions={{headerShown: false, }}// Hide the header for all screens in this stack
    >
      <LatechStack.Screen name="LatechNews" component={LatechNewsScreen} />
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
