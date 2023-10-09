import React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const LeftContent = (props) => <Avatar.Icon {...props} icon="newspaper" />;

const NewsCard = ({news}) => {
  const navigation = useNavigation(); // Initialize useNavigation hook
  const handleOkButtonPress = () => {
    // Navigate to 'NewsDetails' screen when 'Ok' button is pressed
    console.log(news);
    navigation.navigate('NewsDetailsScreen',{news});
  };

  return (
    <PaperProvider theme={theme}>
      <Card>
        <Card.Title title={news?.Title} subtitle={news?.From} left={LeftContent} />
        <Card.Content>
          <Text variant="titleLarge">{news?.Title}</Text>
          <Text variant="bodyMedium">{news?.Body.slice(0, 100) + '...'}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={handleOkButtonPress}>View</Button> 
        </Card.Actions>
      </Card>
    </PaperProvider>
  );
};
export default NewsCard;

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
