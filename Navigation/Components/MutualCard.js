import React, { useState, useEffect} from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};


const MutualCard = ({user,AllUsers, onDisconnect}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [CardUser,setCarduser]=useState(null);
  const LeftContent = ({ style }) => (
    <View>
    {CardUser?.Profile_Image ? 
      (<Avatar.Image source={{ uri: CardUser?.Profile_Image}} size={40} style={style} />):
      (<Avatar.Icon size={40} icon="account" />
    )}
    </View>
  );
  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
      console.log("User:",user,"  AllUser:",AllUsers);
      const foundUser = AllUsers.find(use => use.id === user);
      if (foundUser) {
        console.log("User found:", foundUser);
        setCarduser(foundUser);
      } 
  }, [user]);

  const handleDisconnectPress = () => {
    onDisconnect(user); // Call the onDisconnect callback with the user's name
  };

  return (
    <TouchableOpacity onPress={handleExpand}>
      <PaperProvider theme={theme}>
        <Card style={styles.card}>
        <Card.Title title={CardUser ? CardUser.FirstName+" "+CardUser.LastName : ''} subtitle={CardUser ? CardUser.Major : ''} left={LeftContent} />
          {isExpanded && (
            <Card.Content>
              <Text variant="bodyLarge">{CardUser ? CardUser.About_me : ''}</Text>
            </Card.Content>
          )}
          {isExpanded && <Card.Cover source={{ uri: CardUser?.Profile_Image }} />}
          {isExpanded && (
            <Card.Actions>
              <Button buttonColor='#CB333B' textColor='white'>Cancel</Button>
              <Button buttonColor='#003087' onPress={handleDisconnectPress}>Disconnect</Button>
            </Card.Actions>
          )}
        </Card>
      </PaperProvider>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  }
});

export default MutualCard;
