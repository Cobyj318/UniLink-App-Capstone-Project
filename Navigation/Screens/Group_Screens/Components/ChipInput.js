import React, { useRef, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';

const ChipInputs = ({ selectedTags, setSelectedTags }) => {
  const scrollViewRef = useRef();
  const tags = [
    'All', 'Freshman', 'Sophomore', 'Junior', 'Senior', 'AI',
    'IoT', 'E-commerce', 'Sustainability', 'Design', 'Mental Health',
    'Research', 'Music', 'Governance', 'History', 'Chemical Engineering'
  ];


  const tagWidth = 100; // Adjust as needed

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.tagContainer}
    >
      <View style={{ flexDirection: 'row' }}>
        {tags.map(tag => (
          <Chip
            key={tag}
            selected={selectedTags.includes(tag)}
            onPress={() => {
              const updatedTags = selectedTags.includes(tag)
                ? selectedTags.filter(selectedTag => selectedTag !== tag)
                : [...selectedTags, tag];
              setSelectedTags(updatedTags);
            }}
            style={{ width: tagWidth, margin: 5 }}
          >
            {tag}
          </Chip>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = {
  tagContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
};

export default ChipInputs;
