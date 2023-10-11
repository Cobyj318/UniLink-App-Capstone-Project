import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Pressable, Image } from 'react-native';
import { OverlayProvider, Chat, ChannelList, Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { StreamChat } from 'stream-chat';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from '../../../hooks/useCachedResources';
import SearchBar from '../../Components/SearchBar';
import { FIREBASE_AUTH } from '../../../src/firebase_init/firebase';
import { fetchUserData } from '../../Components/UserData';

const MessageScreen = ({ navigation }) => {
	const API_KEY = '52h96fb6ezvf';
	const client = StreamChat.getInstance(API_KEY);
	const isLoadingComplete = useCachedResources();
	const [isReady, setIsReady] = useState(false);
	const [selectedChannel, setSelectedChannel] = useState(null);
	const CurrentUser = 'VadidscasxaX';
	const Profile_Image = 'https://static.thenounproject.com/png/5034901-200.png';
	const [users, setUsers] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [userDetails, setUserDetails] = useState(null);


	const renderUserItem = ({ item }) => (
		<Pressable onPress={() => onUserPressed(item)}>
		<View style={styles.userItem}>
			<Image source={{ uri: item.image }} style={styles.userImage} />
			<Text>{item.id}</Text>
		</View>
		</Pressable>
	);

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
	const fetchDataAndUserData = async () => {
		try {
		  const userData = await fetchUserData(FIREBASE_AUTH.currentUser?.uid);
		  setUserDetails(userData[0]);
		} catch (error) {
		  console.error("Error fetching user data:", error);
		} finally {
		}
	  };
	const connectUser = async () => {
		// Assuming FIREBASE_AUTH.currentuser contains user information
		const id = FIREBASE_AUTH.currentUser.uid;
		const email=FIREBASE_AUTH.currentUser.displayName;
		console.log("THIS IS EMAIL ",email," THIS IS ID ",id);		
		await client.connectUser(
		  {
			id: id, // Use the user ID from Firebase
			name: email, // Use the user email as the name (you can modify this accordingly)
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
		console.log('User connected');
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
                	<ChannelList filters={{ members: { $in: [CurrentUser] } }} onSelect={onChannelPressed}/>
              	</View>
            	)}
          	</Chat>
          	{searchResults.length > 0 && (
            	<View style={styles.container}>
              		<Text>Search Results:</Text>
              		<FlatList
                	data={searchResults}
                	renderItem={renderUserItem}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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

export default MessageScreen;
