<<<<<<< Updated upstream
import * as React from 'react' ;
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import ChatScreen from './ChatScreen'
export default class MessageScreen extends React.Component {
    state = {
        name: ""
    };

    continue = () => {
        this.props.navigation.navigate("ChatScreen", { name: this.state.name});
    };

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        console.log(params)
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.circle} />
                <View style ={{ marginTop: 64 }}>
                    <Image 
                        source={require("../assets/chat.png")}
                        style={{ width: 100, height: 100, alignSelf: "center" }}
                    />
                </View>
                <View style={{ marginHorizontal: 32 }}>
                    <Text style={styles.header}>Search User</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Search User" 
                        onChangeText= {name => {
                            this.setState({ name})
                        }}
                        value={this.state.name}
                    />
                    <View style={{ alignItems: "flex-end", marginTop: 64}}>
                        <TouchableOpacity style={styles.continue} onPress={this.continue}>
                            <Ionicons name="md-arrow-round-forward" size={24} color="FFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F5F7"
    },
    continue: {
        width: 70,
        height: 70, 
        borderRadius: 70  / 2, 
        backgroundColor: "9075E3",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        marginTop: 32,
        height: 50, 
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#BAB7C3",
        borderRadius: 30,
        paddingHorizontal: 16,
        color: "514E5A",
        fontWeight: "600" 
    }
});
=======
import {View, Text} from 'react-native';
import { OverlayProvider, Chat, ChannelList} from 'stream-chat-expo';
import {StreamChat} from 'stream-chat';
import React, {useEffect, useState} from "react";
import getUserEvents from '../../src/firebase_init/getUserEvents'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from "../../hooks/useCachedResources";

export default function MessageScreen({navigation}){
    const API_KEY = "52h96fb6ezvf"
    const client = StreamChat.getInstance(API_KEY);
    const isLoadingComplete = useCachedResources();

    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
      const connectUser = async () => {
      await client.connectUser(
        {
          id: 'vadim1',
          name: 'Vadim Savin',
          image: 'https://i.imgur.com/fR9Jz14.png',
      },
      client.devToken('vadim1')
      );
  
      const channel = client.channel("messaging", "public", {
        name: "Public Chat Room",
      });
      await channel.watch();
  
      setIsReady(true);
      console.log("User connected");
    }
      connectUser();
      return () => client.disconnectUser();
  
  }, []);
  console.log(isReady);
  getUserEvents(); 

  if (!isLoadingComplete || !isReady) {
    return null;
  } else {

    return(
    <SafeAreaProvider>
    <OverlayProvider>
      <Chat client={client}> 
        <ChannelList />
      </Chat>
    </OverlayProvider>
    </SafeAreaProvider>
    
    );
  }
}
>>>>>>> Stashed changes
