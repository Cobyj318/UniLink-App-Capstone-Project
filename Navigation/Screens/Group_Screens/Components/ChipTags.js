// ChipTags.js
import React, { useRef, useEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Chip } from 'react-native-paper';
import { StyleSheet } from "react-native";

const ChipTags = ({ selectedTag, setSelectedTag }) => {
  const scrollViewRef = useRef();
  const tags = [
    'All', 'Freshman', 'Sophomore', 'Junior', 'Senior', 'AI',
    'IoT', 'E-commerce', 'Sustainability', 'Design', 'Mental Health',
    'Research', 'Music', 'Governance', 'History', 'Chemical Engineering'
  ];

  useEffect(() => {
    // Scroll to the selected tag when it changes
    if (scrollViewRef.current) {
      const tagIndex = tags.indexOf(selectedTag);
      const offsetX = tagIndex * tagWidth;
      scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
    }
  }, [selectedTag]);

  const windowWidth = Dimensions.get('window').width;
  const chipsPerRow = 3; // Adjust as needed
  const tagWidth = windowWidth / chipsPerRow;

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={cardstyles.tagContainer}
    >
      <View style={{ flexDirection: 'row'}}>
        {tags.map(tag => (
          <Chip key={tag} selected={selectedTag === tag} onPress={() => setSelectedTag(tag)} style={{ width: tagWidth}}>
            {tag}
          </Chip>
        ))}
      </View>
    </ScrollView>
  );
};

export default ChipTags;

export const cardstyles = StyleSheet.create({
  tagContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});
