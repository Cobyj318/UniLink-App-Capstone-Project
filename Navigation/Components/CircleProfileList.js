import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';

const CircleProfileList = ({ connections }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.circle}>
        <Image source={{ uri: item.profilePicture }} style={styles.profilePic} />
      </View>
    );
  };

  return (
    <FlatList
      data={connections}
      keyExtractor={(item) => item.id.toString()} // Modify with your unique identifier
      renderItem={renderItem}
      horizontal
    />
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 5,
    overflow: 'hidden',
  },
  profilePic: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});

export default CircleProfileList;
