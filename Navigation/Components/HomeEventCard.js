import React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'; // Import useNavigation from react-native-paper
import { useNavigation } from '@react-navigation/native'; // Also import useNavigation from react-navigation/native

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const LeftContent = props => <Avatar.Icon {...props} icon="newspaper" />

const NewsCard = ({ user }) => {
  const navigation = useNavigation(); // Move useNavigation inside the NewsCard component

  const handlePress = () => {
    navigation.navigate('EventDetailsScreen', { event: user });
  };

  return (
    <PaperProvider theme={theme}>
      <Card>
        <Card.Title title={user.Sponser} subtitle={user.Date} left={LeftContent} />
        <Card.Content>
          <Text variant="titleLarge">{user.Title}</Text>
          <Text variant="bodyMedium">{user.Description.slice(0, 70) + "..."}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: user.Image_Link }} />
        <Card.Actions>
          <Button onPress={handlePress}>open</Button>
        </Card.Actions>
      </Card>
    </PaperProvider>
  );
};

export default NewsCard;
