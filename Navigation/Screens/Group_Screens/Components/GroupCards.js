import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { IconButton, Button} from 'react-native-paper';
import { cardstyles } from '../Stylings/GroupCardStyles';

const GroupsCard = ({ item, handlePress}) => {
 
  const [likedProjects, setLikedProjects] = useState([]);
  const handleToggleLike = (projectId) => {
    const isLiked = likedProjects.includes(projectId);
    if (isLiked) {
      setLikedProjects(likedProjects.filter((id) => id !== projectId));
    } else {
      setLikedProjects([...likedProjects, projectId]);
    }
  };
  
  const handleJoinProject = (projectId) => {
    console.log('Joining Project:', projectId);
    // Implement logic to join the project
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
            icon={likedProjects.includes(item.id) ? 'heart' : 'heart-outline'}
            color={likedProjects.includes(item.id) ? 'red' : 'black'}
            size={20}
            onPress={() => handleToggleLike(item.id)}
          />
          <Button onPress={() => handleJoinProject(item.id)}>Join Project</Button>
        </View>
      </View>
    </View>
  );
};

export default GroupsCard;
