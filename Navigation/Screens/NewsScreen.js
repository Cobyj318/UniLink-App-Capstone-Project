import * as React from 'react' ;
import {StyleSheet,
        SafeAreaView,
        ScrollView,
        StatusBar} 
from 'react-native';
import NewsCard from '../Compoenents/NewsCard';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function LatechNewsScreen() {
    return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
    </ScrollView>
    </SafeAreaView>
    );
  }
  
function SportsNewsScreen() {
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <NewsCard/>
            <NewsCard/>
            <NewsCard/>
            <NewsCard/>
            <NewsCard/>
            <NewsCard/>
        </ScrollView>
        </SafeAreaView>
    );
  }
const Tab = createMaterialTopTabNavigator();

export default function NewsScreen({navigation}){
    return(
        <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen name="LaTech" component={LatechNewsScreen} />
          <Tab.Screen name="Sports" component={SportsNewsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
   
    );
}



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
  });