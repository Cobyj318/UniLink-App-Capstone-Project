import * as React from 'react';
import { Pressable, View, Text, FlatList, Image } from 'react-native';
import { Button, IconButton, Chip } from 'react-native-paper';
import { projects } from '../Screens/Group_Screens/GroupConstansts';
import { cardstyles } from '../Screens/Group_Screens/Stylings/GroupCardStyles';

const ProjectBrowser = ({navigation}) => {
      const [likedProjects, setLikedProjects] = React.useState([]);
      const [selectedTag, setSelectedTag] = React.useState('All');
    
      const handlePress = (project) => {
        console.log('Project pressed:', project);
        navigation.navigate('GroupDetailsScreen', { groupDetails: project });
      };
    
      const handleJoinProject = (projectId) => {
        console.log('Joining Project:', projectId);
        // Implement logic to join the project
      };
    
      const handleToggleLike = (projectId) => {
        const isLiked = likedProjects.includes(projectId);
    
        if (isLiked) {
          setLikedProjects(likedProjects.filter((id) => id !== projectId));
        } else {
          setLikedProjects([...likedProjects, projectId]);
        }
      };
    
      const filterProjectsByTag = (tag) => {
        return tag === 'All' ? projects : projects.filter(project => project.Tags.includes(tag));
      };
    
      const renderItem = ({ item }) => (
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
    
      return (
        <View style={cardstyles.container}>
          <View style={cardstyles.tagContainer}>
          <Chip
            selected={selectedTag === 'All'}
            onPress={() => setSelectedTag('All')}
            >
            All
            </Chip>
            <Chip
            selected={selectedTag === 'Freshman'}
            onPress={() => setSelectedTag('Freshman')}
            >
            Freshman
            </Chip>
            <Chip
            selected={selectedTag === 'Sophomore'}
            onPress={() => setSelectedTag('Sophomore')}
            >
            Sophomore
            </Chip>
            <Chip
            selected={selectedTag === 'Junior'}
            onPress={() => setSelectedTag('Junior')}
            >
            Junior
            </Chip>
            <Chip
            selected={selectedTag === 'Senior'}
            onPress={() => setSelectedTag('Senior')}
            >
            Senior
            </Chip>
            <Chip
            selected={selectedTag === 'AI'}
            onPress={() => setSelectedTag('AI')}
            >
            AI
            </Chip>
            <Chip
            selected={selectedTag === 'IoT'}
            onPress={() => setSelectedTag('IoT')}
            >
            IoT
            </Chip>
            <Chip
            selected={selectedTag === 'E-commerce'}
            onPress={() => setSelectedTag('E-commerce')}
            >
            E-commerce
            </Chip>
            <Chip
            selected={selectedTag === 'Sustainability'}
            onPress={() => setSelectedTag('Sustainability')}
            >
            Sustainability
            </Chip>
            <Chip
            selected={selectedTag === 'Design'}
            onPress={() => setSelectedTag('Design')}
            >
            Design
            </Chip>
            <Chip
            selected={selectedTag === 'Mental Health'}
            onPress={() => setSelectedTag('Mental Health')}
            >
            Mental Health
            </Chip>
            <Chip
            selected={selectedTag === 'Research'}
            onPress={() => setSelectedTag('Research')}
            >
            Research
            </Chip>
            <Chip
            selected={selectedTag === 'Music'}
            onPress={() => setSelectedTag('Music')}
            >
            Music
            </Chip>
            <Chip
            selected={selectedTag === 'Governance'}
            onPress={() => setSelectedTag('Governance')}
            >
            Governance
            </Chip>
            <Chip
            selected={selectedTag === 'History'}
            onPress={() => setSelectedTag('History')}
            >
            History
            </Chip>
            <Chip
            selected={selectedTag === 'Chemical Engineering'}
            onPress={() => setSelectedTag('Chemical Engineering')}
            >
            Chemical Engineering
            </Chip>

          </View>
          <FlatList
            data={filterProjectsByTag(selectedTag)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={cardstyles.flatListContainer}
          />
        </View>
      );
    };
    export default ProjectBrowser;