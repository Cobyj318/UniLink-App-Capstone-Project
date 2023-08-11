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

const NewsCard = ({ news }) => {
  const navigation = useNavigation(); // Move useNavigation inside the NewsCard component
  
  const handlePress = () => {
    navigation.navigate('NewsDetailsScreen', { news});
  };
  console.log(news?.From);
  return (
    <PaperProvider theme={theme}>
      <Card>
        <Card.Title title={news?.From} subtitle={news?.Date} left={LeftContent} />
        <Card.Content>
          <Text variant="titleLarge">{news?.Title}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
          <Button onPress={handlePress}>open</Button>
        </Card.Actions>
      </Card>
    </PaperProvider>
  );
};

export default NewsCard;
