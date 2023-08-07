import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const Tags = ({ tags, onTagAdd, color }) => {
  const [customTag, setCustomTag] = useState('');

  const addTag = (tag) => {
    if (tag.trim() !== '') {
      onTagAdd(tag);
      setCustomTag('');
    }
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {tags.map((tag, index) => (
        <View key={index} style={[styles.container, { backgroundColor: color }]}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
      <TouchableOpacity onPress={() => addTag(customTag)}>
        <View style={[styles.container, styles.addTagContainer]}>
          <Text style={[styles.tagText, styles.addTagText]}>+</Text>
        </View>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Add custom tag"
        value={customTag}
        onChangeText={setCustomTag}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 4,
    marginRight: 8,
  },
  tagText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addTagContainer: {
    backgroundColor: '#3498db', // Blue color for the "+" tag
  },
  addTagText: {
    fontSize: 24,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 4,
    marginRight: 8,
    backgroundColor: 'white',
  },
});

export default Tags;
