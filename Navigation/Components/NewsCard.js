import React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const LeftContent = (props) => <Avatar.Icon {...props} icon="newspaper" />;

const NewsCard = () => {
  const navigation = useNavigation(); // Initialize useNavigation hook

  const handleOkButtonPress = () => {
    // Navigate to 'NewsDetails' screen when 'Ok' button is pressed
    navigation.navigate('NewsDetailsScreen');
  };

  return (
    <PaperProvider theme={theme}>
      <Card>
        <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button onPress={handleOkButtonPress}>Ok</Button> 
        </Card.Actions>
      </Card>
    </PaperProvider>
  );
};

export default NewsCard;
