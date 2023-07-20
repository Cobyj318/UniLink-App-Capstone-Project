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
      const channelId = 'my_channel_id'
      const channel = client.channel("messaging", channelId, {
        name: "Public Chat Room",
        members: ["vadim1"]
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