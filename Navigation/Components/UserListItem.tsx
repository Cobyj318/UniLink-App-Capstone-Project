import { useNavigation } from "@react-navigation/core";
import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useChatContext } from "stream-chat-react-native-core";
import AuthContext from "../Contexts/Authentication";
import ChannelScreen from "../Screens/Messaging_screens/ChannelScreen";

const UserListItem = ({ user }) => {
  const { client } = useChatContext();

  const userId = 'Vadim5';
  const navigation = useNavigation();
  const [selectedChannel, setSelectedChannel] = useState(null);

  const onPress = async () => {
    if (!user.id || !userId) {
      return;
    }
    const channel = client.channel("messaging", { members: [user.id, userId] });
    await channel.watch();

    console.log(channel);

    navigation.navigate('ChannelScreen', { channel }); // Wrap channel inside an object
  };

  return (
    <Pressable onPress={onPress} style={styles.root}>
      <Image style={styles.image} source={{ uri: user.image }} />
      <Text>{user.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 50,
    marginRight: 10,
  },
});

export default UserListItem;
