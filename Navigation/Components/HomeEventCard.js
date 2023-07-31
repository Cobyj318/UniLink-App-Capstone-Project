import React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

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

const NewsCard = ({ user }) => (
  <PaperProvider theme={theme}>
    <Card>
      <Card.Title title={user.Sponser} subtitle={user.Date} left={LeftContent} />
      <Card.Content>
        <Text variant="titleLarge">{user.Title}</Text>
        <Text variant="bodyMedium">{user.Description.slice(0,70)+"..."}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  </PaperProvider>
);

export default NewsCard;
