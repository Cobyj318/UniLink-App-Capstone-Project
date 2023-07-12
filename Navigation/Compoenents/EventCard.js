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

const EventCard = () => (
  
  <PaperProvider theme={theme}>
  <Card>
    <Card.Title title="Event Going On" subtitle="Description of Event" left={LeftContent} />
    <Card.Content>
      <Text variant="titleLarge">Event Going On</Text>
      <Text variant="bodyMedium">Small description of Event</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions style={styles.RSVP}>
      
      <Button style={styles.RSVP} onPress={()=> alert('Thank you for RSVPING!')}>RSVP</Button>
    </Card.Actions>
  </Card>
  </PaperProvider>
);

export default EventCard;


const styles = StyleSheet.create({
  RSVP: {
    position:'center',
  }
  
});
