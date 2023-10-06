import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const likedProjectsData = [
    { id: 1, title: 'Liked Project 1', description: 'Description for Liked Project 1' },
    { id: 2, title: 'Liked Project 2', description: 'Description for Liked Project 2' },
    // Add more liked projects as needed
  ];

const LikedProjectsScreen = ({ likedProjects }) => {
    const likedProjectsData = [
        { id: 1, title: 'Liked Project 1', description: 'Description for Liked Project 1' },
        { id: 2, title: 'Liked Project 2', description: 'Description for Liked Project 2' },
        // Add more liked projects as needed
      ];
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Liked Projects</Text>
      <FlatList
        data={likedProjectsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.projectContainer}>
            <Text style={styles.projectTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
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
  projectContainer: {
    marginBottom: 16,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LikedProjectsScreen;
