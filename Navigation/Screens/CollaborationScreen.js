import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TextInput, Alert, Text,TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Card, Title, Paragraph, Button, Menu } from 'react-native-paper';
import { getFirestore, collection, addDoc, doc, deleteDoc, getDocs, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { app, firestore, FIREBASE_AUTH, FieldValue } from "../../src/firebase_init/firebase";
import SimpleMenu from "../Components/SimpleMenu";

const CollaborationScreen = () => {
  const [projects, setProjects] = useState([]);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;
  const [selectedTags, setSelectedTags] = useState([]);
  const tags = [];

  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {

    const fetchSkills = async () => {
      try {
        const eventsRef = collection(firestore, 'Portfolio_tags');
        const querySnapshot = await getDocs(eventsRef);
        const SkillsData = [];
        querySnapshot.forEach((doc) => {
          const {Skills} = doc.data();
          SkillsData.push({
            Skills
          });
        });
        console.log(SkillsData[0].Skills);
        setAvailableTags(SkillsData[0].Skills);
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    };

    fetchSkills();
  }, []);
  
    useEffect(() => {
    const fetchProjects = async () => {
      try {
        const db = getFirestore();
        const projectsRef = collection(db, 'Projects');
        const querySnapshot = await getDocs(projectsRef);
        
        const fetchedProjects = querySnapshot.docs.map(doc => {
          const projectData = doc.data();
          return {
            id: doc.id,
            ...projectData,
          };
        });
        
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects from Firestore:', error);
      }
    };

    fetchProjects();
  }, []); // Run this effect only once when the component mounts


  const renderCard = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.deleteButtonContainer}>
        {item.createdBy === user.email && (
          <Button
            mode="contained"
            color="red"
            onPress={() => handleDeleteProject(item)}
            style={styles.deleteButton}
            labelStyle={styles.buttonText}
          >
            Delete
          </Button>
        )}
      </View>
      <Card.Content>
        <Title style={styles.title}> {item.title}</Title>
        <Paragraph style={styles.description}>Description: {item.description}</Paragraph>
        {item.tags && item.tags.length > 0 && (
          <Paragraph style={styles.tags}>
            Required Skills: {item.tags.join(', ')}
          </Paragraph>
        )}
      </Card.Content>
      <View style={styles.actionsContainer}>
        <Button
          mode="contained"
          color="#e74c3c"
          onPress={() => handleJoinRequest(item)}
          style={styles.joinButton}
          labelStyle={styles.buttonText}
        >
          Request to join
        </Button>
        <Paragraph style={styles.creator}>Created by: {item.createdBy}</Paragraph>
      </View>
    </Card>
  );
  


  const handleJoinRequest = (project) => {
    // Handle the join request for the selected project
    // You can implement your logic here
    console.log(`Requested to join ${project.title}`);
  };

  const handleCreateProject = async () => {
    if (newProjectName && newProjectDescription) {
      const user = auth.currentUser;
      if (user) {
        try {
          const db = getFirestore();
  
          const newProject = {
            title: newProjectName,
            description: newProjectDescription,
            createdBy: user.email,
            members: [],
            tags: selectedTags, // Add selectedTags to the project object
          };
  
          // Add the new project to the Firestore collection and get the DocumentReference
          const projectsRef = collection(db, 'Projects');
          const docRef = await addDoc(projectsRef, newProject);
  
          // Get the auto-generated ID from the DocumentReference object
          const projectId = docRef.id;

          const userRef = doc(firestore, 'User_data', 'xZTwL2HaJUYZXA1gzXdM'); // Assuming the user's document is stored with their UID
        await updateDoc(userRef, {
          Projects: arrayUnion(newProject.title),
        });
  
          // Create a new project object with the auto-generated ID
          const projectWithId = {
            ...newProject,
            id: projectId,
          };
  
          // Update the projects state with the new project
          setProjects([...projects, projectWithId]);
  
          // Clear the input fields and toggle the creation form
          setNewProjectName('');
          setNewProjectDescription('');
          setIsCreatingProject(false);
        } catch (error) {
          console.error('Error adding new project to Firestore:', error);
        }
      } else {
        console.log('User not authenticated.');
      }
    }
  };



  const handleDeleteProject = (project) => {
    Alert.alert(
      'Delete Project',
      `Are you sure you want to delete the project "${project.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteProject(project);
  
            // Assuming you have access to the user object (e.g., user state)
            const user = auth.currentUser;
            if (user) {
              try {
                const userRef = doc(firestore, 'User_data', 'xZTwL2HaJUYZXA1gzXdM');
                await updateDoc(userRef, {
                  Projects: arrayRemove(project.title),
                });
              } catch (error) {
                console.error('Error removing project from user:', error);
              }
            }
          },
        },
      ]
    );
  };

  const deleteProject = async (project) => {
    try {
      const db = getFirestore();
      console.log(project);
      const projectRef = doc(db, 'Projects', project.id);
      await deleteDoc(projectRef);
  
      // Update the projects state to remove the deleted project
      const updatedProjects = projects.filter((p) => p.id !== project.id);
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error deleting project from Firestore:', error);
    }
  };

  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };


 
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <FlatList
        data={projects}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
      />
      {isCreatingProject ? (
        <ScrollView style={styles.createProjectContainer}>
          <TextInput
            style={styles.input}
            placeholder="Project Name"
            value={newProjectName}
            onChangeText={setNewProjectName}
          />
          <TextInput
            style={styles.input}
            placeholder="Project Description"
            value={newProjectDescription}
            onChangeText={setNewProjectDescription}
          />
          <View style={styles.tagSelection}>
            <Text>Select Tags:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {availableTags.map(tag => (
                <TouchableOpacity
                  key={tag}
                  onPress={() => handleTagSelection(tag)}
                  style={[
                    styles.tagOption,
                    selectedTags.includes(tag) && styles.selectedTagOption,
                  ]}
                >
                  <Text>{tag}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <Button
            mode="contained"
            color="#e74c3c"
            onPress={handleCreateProject}
            style={styles.createButton}
          >
            Create
          </Button>
          <Button
            mode="outlined" // Change the style as needed
            color="#333" // Change the color as needed
            onPress={() => setIsCreatingProject(false)} // Close the menu
            style={styles.closeButton}
          >
            Close
          </Button>
        </ScrollView>
      ) : (
        <Button
          mode="contained"
          color="#e74c3c"
          onPress={() => setIsCreatingProject(true)}
          style={styles.createProjectButton}
        >
          Create Project
        </Button>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f5f5f5',
    },
    card: {
      marginBottom: 16,
      elevation: 4,
      borderRadius: 8,
      backgroundColor: 'white',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
    },
    description: {
      marginTop: 8,
      color: '#555',
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    joinButton: {
      backgroundColor: '#e74c3c',
    },
    joinButtonText: {
      color: 'white',
    },
    creator: {
      color: '#666',
      fontStyle: 'italic',
      marginLeft: 8,
    },
    createProjectContainer: {
      padding: 20,
      backgroundColor: 'white',
      height: 275,
      elevation: 1,
      borderRadius: 8,
      marginTop: 10,
    },
    input: {
      marginBottom: 12,
      padding: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
    },
    createButton: {
      backgroundColor: '#e74c3c',
      bottom: -15,
    },
    createProjectButton: {
      alignSelf: 'center',
      marginTop: 16,
      marginBottom: 16,
    },
    deleteButtonContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1
      },
    deleteButton: {
        backgroundColor: '#8B0000',
        marginRight: 8,
        zIndex: 2
      },
      buttonText: {
        color: 'white',
      },
      tagSelection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
      },
      tagOption: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 6,
        marginHorizontal: 4,
      },
      selectedTagOption: {
        backgroundColor: '#e74c3c',
        borderColor: '#e74c3c',
      },
      damenucontainer: {
        flex: 1,
        backgroundColor: "#fff",
      },
      closeButton: {
        marginTop: 30,
        alignSelf: 'center',
      },
  });

export default CollaborationScreen;
