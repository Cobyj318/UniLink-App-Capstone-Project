  import { View, Text, StyleSheet, Button, TextInput, FlatList, Pressable, Image} from 'react-native';
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
  import useCachedResources from '../../../hooks/useCachedResources';
  import UserListItem from '../../Components/UserListItem';

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
    const CurrentUser = 'Vadim5';
    const Profile_Image = 'https://static.thenounproject.com/png/5034901-200.png';
    const [users, setUsers] = useState([]);
    const [userID, setUserID] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const goBack = () => {
      setSelectedChannel(null);
      setSearchResults([]);
    };

    const onUserPressed = async (user) => {
      const channel = client.channel('messaging', {
        members: [CurrentUser, user.id],
        name: `Chat between ${CurrentUser} and ${user.id}`,
      });
    
      await channel.watch();
      setSelectedChannel(channel);
    };

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

    if (!isLoadingComplete || !isReady) {
      return null;
    } else {
      return (
        <SafeAreaProvider>
          <OverlayProvider>
            
            <Chat client={client}>
              <SearchBar onSearch={handleSearch} />
              {selectedChannel ? (
                <Channel channel={selectedChannel}>
                  <View style={styles.channelContainer}>
                  <View style={styles.goBackButtonContainer}>
                      <Button title="Go back" onPress={goBack} />
                    </View>
                    <MessageList style={{ flex: 0.7 }} />
                    
                    <MessageInput style={{ flex: 0.3 }} />
                    <View style={styles.goBackButtonContainer}>
                      <Button title="Go back" onPress={goBack} />
                    </View>
                  </View>

                  
                </Channel>
              ) : (
                <View style={styles.container}>
                  <ChannelList // Use ChannelList component
                    filters={{ members: { $in: [CurrentUser] } }} // Set the filter to display channels with the current user
                    onSelect={onChannelPressed} // Add the onSelect prop to handle selecting a channel
                  />
                  </View>

              )}
            </Chat>
          </OverlayProvider>

          {searchResults.length > 0 && (
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
          )}
        
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
    channelContainer: {
      flex: 1,
    },
    goBackButtonContainer: {
      marginBottom: 10,
      paddingHorizontal: 20,
      paddingVertical: 1,
    },
    userItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    userImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
  });
