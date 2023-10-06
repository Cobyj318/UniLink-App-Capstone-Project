import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';



const RSVPedEvents = ({ rsvpedEvents }) => {
    const rsvpedEventsData = [
        { id: 1, title: 'Event 1', date: '2023-10-10' },
        { id: 2, title: 'Event 2', date: '2023-10-15' },
        // Add more events as needed
      ];
    return (
    <View style={styles.container}>
      <Text style={styles.title}>RSVPed Events</Text>
      <FlatList
        data={rsvpedEventsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  eventContainer: {
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RSVPedEvents;
