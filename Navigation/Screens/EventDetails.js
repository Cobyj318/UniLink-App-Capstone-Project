import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={dummyevent.image} style={styles.eventImage} />
      <Text style={styles.eventTitle}>{event.Title}</Text>
      <Text style={styles.eventDate}>{event.Date}</Text>
      <Text style={styles.eventLocation}>{dummyevent.location}</Text>
      <Text style={styles.eventDescription}>{dummyevent.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
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
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default EventDetailsScreen;
