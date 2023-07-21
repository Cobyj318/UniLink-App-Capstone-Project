import { View, Text, StyleSheet, Button, TextInput, FlatList, Image, Pressable } from 'react-native';
import {
  OverlayProvider,
  Chat,
  ChannelList, // Import ChannelList
  Channel, 
  MessageList, 
  MessageInput,
  useChatContext
} from 'stream-chat-expo';
import { StreamChat } from 'stream-chat';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from '../UniLink-App-Capstone-Project copy/hooks/useCachedResources';
import UserListItem from './UserListItem';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a user..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

export default function MessageScreen({ navigation }) {
  const API_KEY = '52h96fb6ezvf';
  const client = StreamChat.getInstance(API_KEY);
  const isLoadingComplete = useCachedResources();
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const CurrentUser = 'Jacob';
  const Profile_Image = 'https://static.thenounproject.com/png/5034901-200.png';
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchUsers = async () => {
    const response = await client.queryUsers({});
    setUsers(response.users);
  };

  useEffect(() => {
    const connectUser = async () => {
      await client.connectUser(
        {
          id: CurrentUser,
          name: CurrentUser,
          image: Profile_Image,
        },
        client.devToken(CurrentUser)
      );

      const channelId = 'Uni_Link';
      const channel = client.channel('messaging', channelId, {
        name: 'Uni-Link ChatRoom',
        members: [CurrentUser],
      });
      await channel.watch();

      setIsReady(true);
      console.log('User connected');
    };
    fetchUsers();
    connectUser();
    return () => client.disconnectUser();
  }, []);

  const handleSearch = async (searchText) => {
    if (!searchText) {
      setSearchResults([]);
      return;
    }

    const response = await client.queryUsers({ id: { $autocomplete: searchText } });
    setSearchResults(response.users);
  };

  const onChannelPressed = (channel) => {
    setSelectedChannel(channel);
  };

  const onUserPressed = async (user) => {
    const channel = client.channel('messaging', {
      members: [CurrentUser, user.id],
      name: `Chat between ${CurrentUser} and ${user.id}`,
    });

    await channel.watch();
    setSelectedChannel(channel);
  };

  if (!isLoadingComplete || !isReady) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
    <OverlayProvider>
      <Chat client={client}>
        <SearchBar onSearch={handleSearch} />
        {searchResults.length > 0 ? (
          <View style={styles.container}>
            <Text>Search Results:</Text>
            <FlatList
              data={searchResults}
              renderItem={({ item }) => (
                <Pressable onPress={() => onUserPressed(item)}>
                  <View style={styles.userItem}>
                    <Image source={{ uri: item.image }} style={styles.userImage} />
                    <Text>{item.id}</Text>
                  </View>
                </Pressable>
              )}
              keyExtractor={(item) => item.id}
            /> 
          </View>
        ) : null}
        <View style={styles.container}>
          <ChannelList
            filters={{ members: { $in: [CurrentUser] } }}
            onSelect={onChannelPressed}
          />
        </View>
      </Chat>
    </OverlayProvider>
  </SafeAreaProvider>
);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});
