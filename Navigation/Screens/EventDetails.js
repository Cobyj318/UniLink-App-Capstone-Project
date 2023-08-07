import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { CircularImage } from '../Components/CircleImage';
import { accentColors, primaryColors } from '../Components/Colors';
import RedLine from '../Components/RedLine';

const EventDetailsScreen = () => {
  function RandomInt() {
    const randomNum = Math.floor(Math.random() * (701 - 500) + 500); // Generate a random number between 0 and 700
    const randomNumAsString = randomNum.toString();// Convert the random number to a string
    return randomNumAsString;
  }

  const route = useRoute();
  const { event } = route.params; // Access the 'event' data from route.params
  const dummyevent = {
    title: 'Sample Event',
    date: 'August 30, 2023',
    location: 'Sample Venue, City',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu lectus ac ligula sagittis malesuada in et sapien.',
    image: { uri: 'https://picsum.photos/'+RandomInt() },
  };
  const screenHeight = Dimensions.get('window').height;
  const viewHeightPercentage = 30;
  const viewHeight = (screenHeight * viewHeightPercentage) / 100;

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <View style={[styles.blueHeader,{ height: viewHeight }]}>
        <CircularImage imageUrl='https://picsum.photos/700'/>
        <View style={styles.textContainer}>
          <Text style={styles.blueHeadertext}  >{event.Title}</Text>
          <Text style={styles.blueHeadertext}>{event.Date}</Text>
          <View style={styles.sponsorContainer}>
            <Text style={styles.sponsertext }>{event.Sponser}</Text>
          </View>
        </View>
      </View>
      <RedLine/>
      <Text style={styles.eventTitle}>{event.Title}</Text>
      <Text style={styles.eventDate}>{event.Date}</Text>
      <Text style={styles.eventLocation}>{dummyevent.location}</Text>
      <Text style={styles.eventDescription}>{event.Description}</Text>
      <View>
      <Button>Edit</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  blueHeader:{
    backgroundColor:primaryColors.blue,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer:{
    alignItems: 'center',
    flex:1,
  },
  eventImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  eventDate: {
    fontSize: 16,
    marginTop: 5,
  },
  eventLocation: {
    fontSize: 16,
    marginTop: 5,
    color: '#888',
  },
  eventDescription: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'left',
    paddingHorizontal: 20,
  },
  blueHeadertext:{
    color:'#69B3E7',
    fontSize:20,
    flexWrap:'wrap'
  },
  sponsertext:{
    color:accentColors.lightblue,
    fontSize:20,
    flex:1,
    flexWrap:'wrap'
   
  },
  sponsorContainer: {
    flexDirection:'row',
  },
  
});

export default EventDetailsScreen;
