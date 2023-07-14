import * as React from 'react';
import {StyleSheet} from 'react-native'; 
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
const LeftContent = props => <Avatar.Icon {...props} icon="circle" />
const EventCard = ({ users }) => (
  <PaperProvider theme={theme}>
    {users.map((user, index) => (
      <Card key={index}>
        <Card.Title title={user.Sponser} subtitle={user.Date} left={LeftContent} />
        <Card.Content>
          <Text variant="titleLarge">{user.Title}</Text>
          <Text variant="bodyMedium">{user.Description}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions style={styles.RSVP}>
          <Button style={styles.RSVP} onPress={() => alert('Thank you for RSVPING!')}>RSVP</Button>
        </Card.Actions>
      </Card>
    ))}
  </PaperProvider>
);
const styles = StyleSheet.create({
  RSVP: {
    position: 'center',
  },
});
export default EventCard;
