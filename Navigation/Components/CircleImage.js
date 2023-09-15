import React from 'react';
import { Image } from 'expo-image';
import { View, StyleSheet } from 'react-native';


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export const CircularImage = ({ imageUrl }) => {
    return (
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
    );
  };

const imageSize = 150; // Adjust this value to set the size of the circular image

const styles = StyleSheet.create({
  container: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2, // This sets the border radius to half the size, creating a circular shape
    overflow: 'hidden', // This ensures the image stays within the circular boundary
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
