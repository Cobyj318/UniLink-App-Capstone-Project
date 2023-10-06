import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import Tags from '../Components/Tags';
import { app, firestore, FIREBASE_AUTH, FieldValue } from "../../src/firebase_init/firebase";
import { collection, doc, getDoc, getDocs, updateDoc, arrayUnion } from 'firebase/firestore'; // Import Firestore methods
import { fetchUserData } from '../Components/UserData';

auth = FIREBASE_AUTH;
const PortfolioScreen = () => {
  const [skills, setSkills] = useState([]);
  const [menuSkills, setMenuSkills] = useState([]); // State to hold menuSkills
  const [menuInterests, setMenuInterests] = useState([]); // State to hold menuInterests
  const [interests, setInterests] = useState([]);
  const [projects,setProjects] = useState([]);
  const [customTag, setCustomTag] = useState('');
  const [tagCategory, setTagCategory] = useState(null); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const auth = FIREBASE_AUTH; 
  const user = auth.currentUser;
  const [experienceDescription, setExperienceDescription] = useState('');
const [isEditMode, setIsEditMode] = useState(false);
const [userProjects, setUserProjects] = useState([]);


  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(firestore, 'User_data', 'xZTwL2HaJUYZXA1gzXdM');
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot) {
          const userData = userSnapshot.data();
          setSkills(userData.Skills || []);
          setInterests(userData.Interests || []);
          setProjects(userData.Projects || []);
          setExperienceDescription(userData.Experience || "");

          // Set other initial tags from the user's data
        } else {
          console.log('User data not found.');
        }
      } else {
        console.log('User not authenticated.');
      }
    };

    fetchUserData();
  }, [user]);
  
const fetchtagData = async () => {
  try {
    const eventsRef = collection(firestore, 'Portfolio_tags');
    const querySnapshot = await getDocs(eventsRef);
    const tagData = [];
    querySnapshot.forEach((doc) => {
      const { Interests, Skills} = doc.data();
      tagData.push({
        id: doc.id,
        Interests,
        Skills
      });
    });
    return tagData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

useEffect(() => {
  const fetchDataAndUserData = async () => {
    const tagData = await fetchtagData();
    setMenuSkills(tagData[0].Skills); // Update menuSkills state
    setMenuInterests(tagData[0].Interests); // Update menuInterests state
  };
  fetchDataAndUserData();
}, []);

const toggleDeleteModal = () => {
  setIsDeleteModalVisible(!isDeleteModalVisible);
};

const deleteSelectedTag = async () => {
  // Determine the appropriate array based on the selectedTag's category (skills, interests, etc.)
  let updatedArray = [];

  switch (tagCategory) {
    case 'skills':
      updatedArray = skills.filter((tag) => tag !== selectedTag);
      setSkills(updatedArray);
      await deleteTagFromFirebase('skills', selectedTag);
      break;
    case 'interests':
      updatedArray = interests.filter((tag) => tag !== selectedTag);
      setInterests(updatedArray);
      await deleteTagFromFirebase('interests', selectedTag);
      break;
    case 'projects':
      updatedArray = Projects.filter((tag) => tag !== selectedTag);
      setProjects(updatedArray);
      // You can implement a similar function to delete from Firebase for projects if needed
      break;
    default:
      break;
  }

  // After deletion, close the modal and clear the selected tag
  setIsDeleteModalVisible(false);
  setSelectedTag(null);
};

const deleteTagFromFirebase = async (category, tag) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(firestore, 'User_data', 'xZTwL2HaJUYZXA1gzXdM');
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        //console.log(userData);
        const updatedArray = userData[category].filter(item => item !== tag);
        await updateDoc(userRef, {
          [category]: updatedArray,
        });
      }
    }
  } catch (error) {
    console.error('Error deleting tag from Firebase:', error);
  }
};

const deleteTag = async (tagToDelete) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(firestore, 'test_data', 'xZTwL2HaJUYZXA1gzXdM');
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        
        switch (tagCategory) {
          case 'skills':
            userData.Skills = userData.Skills.filter(tag => tag !== tagToDelete);
            break;
          case 'interests':
            userData.Interests = userData.Interests.filter(tag => tag !== tagToDelete);
            break;
          case 'projects':
            // Adjust the field name based on your data structure
            // userData.Projects = userData.Projects.filter(tag => tag !== tagToDelete);
            break;
          default:
            break;
        }

        // Update the Firestore document with the modified userData
        await updateDoc(userRef, userData);

      // Update the local state to remove the tag
      switch (tagCategory) {
        case 'skills':
          setSkills(skills.filter((tag) => tag !== tagToDelete));
          break;
        case 'interests':
          setInterests(interests.filter((tag) => tag !== tagToDelete));
          break;
        case 'projects':
          setProjects(projects.filter((tag) => tag !== tagToDelete));
          break;
        default:
          break;
      }
      
      setSelectedTag(null); // Close the delete confirmation modal
    }
  }
  } catch (error) {
    console.error('Error deleting tag:', error);
  }
};
  const toggleDropdown = (category) => {
    setIsDropdownOpen(!isDropdownOpen);
    setCustomTag('');
    setTagCategory(category);
  };
  const addTag = async (tag) => {
    if (tag.trim() !== '') {
      if (!skills.includes(tag) && !interests.includes(tag)) {
        switch (tagCategory) {
          case 'skills':
            setSkills([...skills, tag]);
            await updateTagInFirebase('skills', tag);
            break;
          case 'interests':
            setInterests([...interests, tag]);
            await updateTagInFirebase('interests', tag);
            break;
          case 'projects':
            // Projects array is static, so you might not want to add tags to it
            break;
          default:
            break;
        }
        setIsDropdownOpen(false);
      } else {
        console.log('Tag already exists.');
      }
    }
  };
  
  const updateTagInFirebase = async (category, tag) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(firestore, 'User_data', 'xZTwL2HaJUYZXA1gzXdM');
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          switch (category) {
            case 'skills':
              userData.Skills = [...userData.Skills, tag]; // Add the tag to the Skills array
              console.log("welp");
              break;
            case 'interests':
              userData.Interests = [...userData.Interests, tag]; // Add the tag to the Interests array
              break;
            case 'projects':
              // You need to implement the logic for updating projects if needed
              break;
            case 'experience':
              userData.Experience = tag; // Update the Experience field
              break;
            default:
              break;
          }
  
          // Update the Firestore document with the modified userData
          await updateDoc(userRef, userData);
        }
      }
    } catch (error) {
      console.error('Error updating tag in Firebase:', error);
    }
  };

  const closeDropdown = () => {
    console.log('Closing dropdown');
    setIsDropdownOpen(false);
    setCustomTag('');
  };

  const getTagsForCategory = () => {
    switch (tagCategory) {
      case 'skills':
        return menuSkills; // Use the state value for menuSkills
      case 'interests':
        return menuInterests; // Use the state value for menuInterests
      case 'projects':
        return projects;
      default:
        return [];
    }
  };

  return (
    <View style={styles.container}>
    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Skills</Text>
    <Tags
  tags={skills}
  color="#9b59b6"
  openDropdown={() => toggleDropdown('skills')}
  onDeleteTag={(tag) => {
    setSelectedTag(tag);
    toggleDeleteModal();
  }}
/>
      <Modal visible={isDropdownOpen} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={closeDropdown} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#3498db" />
            </TouchableOpacity>
            <Picker
              selectedValue={customTag}
              onValueChange={(itemValue) => setCustomTag(itemValue)}
            >
              <Picker.Item label="Select Tag" value="" />
              {getTagsForCategory().map((tag, index) => (
                <Picker.Item key={index} label={tag} value={tag} />
              ))}
            </Picker>
            <TouchableOpacity onPress={() => addTag(customTag)}>
              <Text style={styles.dropdownAddText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Interests</Text>
      <Tags
  tags={interests}
  color="#3498db"
  openDropdown={() => toggleDropdown('interests')}
  onDeleteTag={(tag) => {
    setSelectedTag(tag);
    toggleDeleteModal();
  }}
/>

      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Projects</Text>
      <Tags
  tags={projects}
  color="#e74c3c"
  openDropdown={() => toggleDropdown('projects')}
  onDeleteTag={(tag) => {
    setSelectedTag(tag);
    toggleDeleteModal();
  }}
/>
<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Experience 
{isEditMode ? (
  <TouchableOpacity onPress={() => setIsEditMode(false)}>
  <Text
    style={styles.editModeButton}
    onPress={async () => {
      await updateTagInFirebase('experience', experienceDescription);
      console.log("Changed");
      setIsEditMode(false);
    }}
  >
    Save
  </Text>
</TouchableOpacity>
) : (
  <TouchableOpacity onPress={() => setIsEditMode(true)}>
    <Text style={styles.editModeButton}>Edit</Text>
  </TouchableOpacity>
)}
</Text>

{isEditMode ? (
  <TextInput
    style={styles.experienceTextInput}
    value={experienceDescription}
    onChangeText={setExperienceDescription}
    multiline
  />
) : (
  <Text style={styles.experienceText}>{experienceDescription}</Text>
)}


      <Modal visible={isDeleteModalVisible} transparent={true} animationType="slide">
  <View style={styles.deleteModalContainer}>
    <View style={styles.deleteModalContent}>
      <Text style={styles.deleteModalText}>Delete Tag?</Text>
      <View style={styles.deleteModalButtonContainer}>
        <TouchableOpacity
          style={[styles.deleteModalButton, { backgroundColor: 'red' }]}
          onPress={deleteSelectedTag}
        >
          <Text style={styles.deleteModalButtonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.deleteModalButton, { backgroundColor: 'gray' }]}
          onPress={() => {
            setIsDeleteModalVisible(false);
            setSelectedTag(null);
          }}
        >
          <Text style={styles.deleteModalButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </View>
    
    
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'top',
    paddingLeft: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end', // Adjust modal position
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Slightly transparent background
  },
  dropdownContainer: {
    width: '100%', // Expand to full width of the screen
    backgroundColor: 'white',
    borderTopLeftRadius: 20, // Adjust radius for top corners
    borderTopRightRadius: 20,
    padding: 15, // Increase padding for better spacing
  },
  dropdownAddText: {
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 2,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  tagText: {
    color: 'white',
    fontSize: 14, // Decrease font size for better fit
    fontWeight: 'bold',
  },

  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap', // This allows tags to wrap when reaching the edge
    maxWidth: '100%', // Ensure that the tags don't exceed the screen width
  },
  addTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  addTagText: {
    color: 'white',
    fontSize: 14, // Decrease font size for better fit
    fontWeight: 'bold',
  },
  deleteModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  deleteModalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 250,
    alignItems: 'center',
  },
  deleteModalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  deleteModalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  deleteModalButton: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  deleteModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  experienceText: {
    fontSize: 20,
    marginBottom: 30,
    marginHorizontal: 20,
    marginLeft: 5,
    textAlign: 'left',
    lineHeight: 20,
  },
  experienceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  experienceText: {
    fontSize: 20,
    marginBottom: 30,
    marginHorizontal: 20,
    marginLeft: 5,
    textAlign: 'left',
    lineHeight: 20,
  },
  experienceTextInput: {
    fontSize: 20,
    marginBottom: 30,
    marginHorizontal: 20,
    marginLeft: 5,
    textAlign: 'left',
    lineHeight: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  editModeButton: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PortfolioScreen;
