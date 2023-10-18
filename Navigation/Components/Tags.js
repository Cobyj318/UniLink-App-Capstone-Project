import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tags = ({ tags, color, openDropdown, onDeleteTag, editable, style }) => {
  const [selectedTag, setSelectedTag] = useState(null);

  const openDeleteModal = (tag) => {
    setSelectedTag(tag);
  };

  const closeDeleteModal = () => {
    setSelectedTag(null);
  };

  return (
    <View style={[styles.tagsContainer, style]}>
      {tags.map((tag, index) => {
        // Skip rendering if the tag is empty or null
        if (!tag) {
          return null;
        }

        return (
          <TouchableOpacity
            key={index}
            style={[styles.tag, styles.pill, { borderColor: color }]}
            onLongPress={editable ? () => onDeleteTag(tag) : null}
            >
            <Text style={{ color: 'white' }}>{tag}</Text>
          </TouchableOpacity>
        );
      })}
 
 {editable && (
        <TouchableOpacity style={[styles.addTag, styles.pill, { borderColor: color }]} onPress={openDropdown}>
          <Ionicons name="add" size={16} color={'white'} />
        </TouchableOpacity>
      )}

      {/* Delete Confirmation Modal */}
      <Modal visible={selectedTag !== null} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.deleteModal}>
            <Text style={styles.deleteMessage}>Delete tag "{selectedTag}"?</Text>
            <View style={styles.deleteButtonsContainer}>
              <TouchableOpacity onPress={() => deleteTag(selectedTag)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeDeleteModal}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ... (styles and other parts of the component remain unchanged)

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row', // Ensure tags are in a row
    flexWrap: 'wrap', // Allow tags to wrap to the next row
    alignItems: 'center', // Center align tags vertically
    paddingHorizontal: 5, // Adjust horizontal padding for consistent spacing
  },
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
  pill: {
    borderRadius: 20, // Adjust the radius to create a pill shape
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    backgroundColor: '#3498db',
  },
});

export default Tags;
