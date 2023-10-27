import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, FlatList, Pressable, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import { OverlayProvider, Chat, ChannelList, Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { StreamChat } from 'stream-chat';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from '../../../hooks/useCachedResources';
import SearchBar from '../../Components/SearchBar';
import { FIREBASE_AUTH } from '../../../src/firebase_init/firebase';
import { fetchUserData } from '../../Components/UserData';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';


const MessageScreen = () => {
  const API_KEY = '52h96fb6ezvf';
  const client = StreamChat.getInstance(API_KEY);
  const isLoadingComplete = useCachedResources();
  const [isReady, setIsReady] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const CurrentUser = FIREBASE_AUTH.currentUser.displayName;
  const Profile_Image = FIREBASE_AUTH.currentUser.photoURL;
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
const [selectedUserIds, setSelectedUserIds] = useState([]);
const [isInChannel, setIsInChannel] = useState(false);
const toggleUserSelection = (userId) => {
  setSelectedUserIds((prevSelectedUserIds) => {
    if (prevSelectedUserIds.includes(userId)) {
      return prevSelectedUserIds.filter((id) => id !== userId);
    } else {
      return [...prevSelectedUserIds, userId];
    }
  });
};





  // Function to open the modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };
  
  const goBack = () => {
    setSelectedChannel(null);
    setIsInChannel(false);
    
  };

  const handleSearch2 = (text) => {
    setSearchQuery(text);
  
    // Filter users based on the search query
    if (text != '') {
    const results = users.filter((user) =>
      user.id.toLowerCase().startsWith(text.toLowerCase())
    );
  
    setFilteredUsers(results);
    }else {
      setFilteredUsers([]);
    }
  };

  const addUserToGroup = (user) => {
    // Check if the user is already in the groupMembers list to avoid duplicates
    if (!groupMembers.some((member) => member.id === user.id)) {
      setGroupMembers([...groupMembers, user]);
    }
  };
  

  const onUserPressed = async (user) => {
    setSelectedUser(user.id);
    const channel = client.channel('messaging', {
      members: [FIREBASE_AUTH.currentUser.uid, user.id],
      name: `Group Chat: ${CurrentUser} and ${user.id}`,
    });
    await channel.watch();
    setSelectedChannel(channel);
  };

  const createGroupChatWithSelectedUsers = async () => {
    // Check if there are members selected
    if (selectedUserIds.length === 0) {
      // Handle the case where no members are selected
      return;
    }

    // Include the current user in the group
    const memberIds = [...selectedUserIds, FIREBASE_AUTH.currentUser.uid];

    // Use Stream Chat's client to create a new group chat
    const channel = client.channel('messaging', {
      members: memberIds,
      name: `Group Chat: ${CurrentUser} and ${selectedUserIds.join(', ')}`,
    });

    // Watch the new channel
    await channel.watch();

    // Clear the selected users
    setSelectedUserIds([]);

    // Close the modal
    closeModal();

    // Navigate to the newly created group chat or perform any other desired action
  };

  

  const fetchUsers = async () => {
    const response = await client.queryUsers({});
    setUsers(response.users);
  };

  const connectUser = async () => {
	const id = FIREBASE_AUTH.currentUser.uid;
    const email = FIREBASE_AUTH.currentUser.displayName;
    await client.connectUser(
      {
        id: id,
        name: email,
        image: Profile_Image,
      },
      client.devToken(id)
    );

    const channelId = 'Uni_Link';
    const channel = client.channel('messaging', channelId, {
      name: 'Uni-Link ChatRoom',
      members: [id],
    });
    await channel.watch();
    setIsReady(true);
  };

  useEffect(() => {
    fetchUsers();
    connectUser();
    return () => client.disconnectUser();
  }, []);

  const handleSearch = async (searchText) => {
    if (!searchText) {
      setSearchResults([]);
      return;
    }
    const response = await client.queryUsers({ name: { $autocomplete: searchText } });
    setSearchResults(response.users);
  };

  const onChannelPressed = (channel) => {
    setIsInChannel(true);
    setSelectedChannel(channel);
  };

  if (!isLoadingComplete || !isReady) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <OverlayProvider>
          
          <Chat client={client}>
            
            
            {/* Render the open modal button */}
            
            {/* Render the modal */}
            <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Search for Users</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search users"
          value={searchQuery}
          onChangeText={handleSearch2}
        />

        <Button title="Create Group Chat" onPress={createGroupChatWithSelectedUsers} />

        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable onPress={() => toggleUserSelection(item.id)}>
              <View
                style={[
                  styles.userItem,
                  selectedUserIds.includes(item.id) && styles.selectedUser, // Apply highlight style
                ]}
              >
                <Image source={{ uri: item.image }} style={styles.userImage} />
                <Text>{item.name}</Text>
              </View>
            </Pressable>
          )}
        />

        <Button title="Close" onPress={closeModal} />
      </View>
      </Modal>
      

            
            {selectedChannel ? (
              <Channel channel={selectedChannel}>
                <View style={styles.channelContainer}>
                  <View style={styles.goBackButtonContainer}>
                    <Button title="Go back" onPress={goBack} />
                  </View>
                  <MessageList style={{ flex: 0.7 }} />
                  <MessageInput style={{ flex: 0.3 }} />
                  
                </View>
              </Channel>
            ) : (
              <View style={styles.container}>
                <ChannelList filters={{ members: { $in: [FIREBASE_AUTH.currentUser.uid] } }} onSelect={onChannelPressed} />
              </View>
            )}
             {!isInChannel && (
        <TouchableOpacity style={styles.plusButton} onPress={openModal}>
          <Ionicons name="ios-add" size={40} color="white" />
        </TouchableOpacity>
      )}
          </Chat>
          {searchResults.length > 0 && (
            <View style={styles.container}>
              <Text>Search Results:</Text>
              <FlatList
                data={searchResults}
                renderItem={({ item }) => (
                  <Pressable onPress={() => onUserPressed(item)}>
                    <View style={styles.userItem}>
                      <Image source={{ uri: item.image }} style={styles.userImage} />
                      <Text>{item.name}</Text>
                    </View>
                  </Pressable>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          )}
        </OverlayProvider>
      </SafeAreaProvider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
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
  openModalButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },

  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 20,
    right: 39,
    height: 550,
    width: 300
  },
  selectedUser: {
    backgroundColor: 'yellow', // You can use any highlight color you prefer
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue', // Customize the background color
    padding: 10, // Add padding to the icon
    borderRadius: 50, // Make it a circle
  },
  
});

export default MessageScreen;
