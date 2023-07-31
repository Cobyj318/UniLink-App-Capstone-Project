import React from 'react';
import { View, StyleSheet } from 'react-native';
import { primaryColors } from './Colors';

const RedLine = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    height: 5, // Set the height to adjust the line thickness
    backgroundColor: primaryColors.red,
    width: '100%', // This will make the line run from one side to the other
  },
});

export default RedLine;
