import React from 'react';
import { View, Text,StyleSheet} from 'react-native';

export default renderUpdateCard = ({ item }) => {
	return (
	  <View style={styles.updateCard}>
		<Text style={styles.cardTitle}>{item.title}</Text>
		<Text style={styles.cardDate}>{item.date}</Text>
		<Text style={styles.cardDescription}>{item.description}</Text>
	  </View>
	);
  };

  const styles = StyleSheet.create({
    updateCard: {
      backgroundColor: 'white',
      padding: 15,
      marginVertical: 10,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    cardDate: {
      fontSize: 14,
      color: '#888',
      marginBottom: 6,
    },
    cardDescription: {
      fontSize: 15,
    },

  });