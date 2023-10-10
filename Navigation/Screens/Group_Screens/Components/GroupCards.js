import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../../src/firebase_init/firebase';
import { FIREBASE_AUTH } from '../../../../src/firebase_init/firebase';
import { cardstyles } from '../Stylings/GroupCardStyles';

const GroupsCard = ({ item, handlePress }) => {
  const [likedProjects, setLikedProjects] = useState([]);

  useEffect(() => {
    const fetchLikedProjects = async () => {
      try {
        const userRef = doc(firestore, 'User_data', FIREBASE_AUTH.currentUser?.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        const userLikedProjects = userData.liked_projects || [];

        setLikedProjects(userLikedProjects);
      } catch (error) {
        console.error('Error fetching liked projects:', error);
      }
    };

    fetchLikedProjects();
  }, []);

  const handleToggleLike = async (group) => {
    try {
      const userRef = doc(firestore, 'User_data', FIREBASE_AUTH.currentUser?.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      const likedProjects = userData.liked_projects || [];

      const isLiked = likedProjects.some((likedGroup) => likedGroup.id === group.id);

      let updatedLikedProjects;
      if (isLiked) {
        // If already liked, remove from liked projects
        updatedLikedProjects = likedProjects.filter((likedGroup) => likedGroup.id !== group.id);
        alert('Unliked the Group');
      } else {
        // If not liked, add to liked projects
        updatedLikedProjects = [...likedProjects, group];
        alert('Liked the Group');
      }

      await updateDoc(userRef, { liked_projects: updatedLikedProjects });
      setLikedProjects(updatedLikedProjects);
    } catch (error) {
      console.error('Error updating liked projects:', error);
    }
  };

  return (
    <View style={cardstyles.projectCardContainer}>
      <View style={cardstyles.projectCard}>
        <Image source={{ uri: item.Image_Link }} style={cardstyles.cardImage} />
        <View style={cardstyles.cardContent}>
          <Text style={cardstyles.title}>{item.Title}</Text>
          <Text style={cardstyles.subtitle}>{item.CreatedDate}</Text>
          <Text style={cardstyles.description}>{item.Description}</Text>
          <Pressable onPress={() => handlePress(item)} style={cardstyles.pressable}>
            <Text style={cardstyles.viewDetails}>View Details</Text>
          </Pressable>
        </View>
        <View style={cardstyles.cardActions}>
          <IconButton
            icon={likedProjects.some((likedGroup) => likedGroup?.id === item?.id) ? 'heart' : 'heart-outline'}
            color={likedProjects.some((likedGroup) => likedGroup?.id === item?.id) ? 'red' : 'black'}
            size={20}
            onPress={() => handleToggleLike(item)}
          />
          <Button onPress={() => handleJoinProject(item.id)}>Join Project</Button>
        </View>
      </View>
    </View>
  );
};

export default GroupsCard;
