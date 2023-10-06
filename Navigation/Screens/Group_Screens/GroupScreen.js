import * as React from 'react';
import { SafeAreaView, RefreshControl, View, ActivityIndicator, FlatList} from 'react-native';
import { FAB, DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import { useState, useEffect } from 'react';
import { fetchData } from '../../DBFunctions/FetchData';
import { styles } from './Stylings/GroupScreenStyles';
import { cardstyles } from './Stylings/GroupCardStyles';
import { projects } from './Components/GroupConstansts';
import GroupCard from './Components/GroupCards';
import ChipTags from './Components/ChipTags';
import { FIREBASE_AUTH } from '../../../src/firebase_init/firebase';

export default function GroupsScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = React.useState('All');
  const auth=FIREBASE_AUTH;

  // Function to handle pull-to-refresh
  const onRefresh = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const usersData = await fetchData(); // Call the fetchData function
      setUsers(usersData);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventData = await fetchData();
        setUsers(eventData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false when the data is fetched
      }
    };
    fetchEventData();
  }, []);

  // Custom FloatingButton component to navigate to CreateEventScreen
  const FloatingButton = () => (
    <FAB backgroundColor={'#3498db'} icon="plus" style={styles.fab} onPress={() => navigation.navigate('CreateEventScreen', { onRefresh: onRefresh })} />
  );

  const filterProjectsByTag = (tag) => {
    return tag === 'All' ? projects : projects.filter(project => project.Tags.includes(tag));
  };
  console.log(auth.currentUser.uid);
  const handlePress = (project) => {
    console.log('Project pressed:', project);

    const isMember = project.MembersID.includes(auth?.currentUser.uid);
    if (isMember) {
      navigation.navigate('GroupUsers', { groupDetails: project });
    } else {
      navigation.navigate('GroupDetailsScreen', { groupDetails: project });
    }
  };

  const renderItem = ({ item }) => (
    <GroupCard
      item={item}
      handlePress={handlePress}
    />
  );

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3498db" />
          </View>
        ) : (
          <View style={styles.scrollView}>
            <ChipTags selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
            <FlatList
              data={filterProjectsByTag(selectedTag)}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={cardstyles.flatListContainer
              }
              refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
            />
          </View>
        )}
      </SafeAreaView>
      {/* <FloatingButton /> */}
    </PaperProvider>
  );
}

// Theme configuration for PaperProvider
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
