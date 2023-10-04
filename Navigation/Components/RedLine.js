import React from 'react';
import { View, StyleSheet } from 'react-native';
import { primaryColors } from './Colors';

const RedLine = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    height: 5,
    backgroundColor: primaryColors.red,
    width: '100%',
    borderRadius: 2.5, // Adjust the borderRadius to control the roundness of the edges
  },
});

export default RedLine;
