import React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'; // Import useNavigation from react-native-paper
import { useNavigation } from '@react-navigation/native'; // Also import useNavigation from react-navigation/native
import { View,StyleSheet } from 'react-native';
import { Image } from 'expo-image';
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
const NewsCardV2= ({news})=> {
  const navigation = useNavigation();

  return (
    <PaperProvider theme={theme}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <LeftContent />
            <Text style={styles.cardHeaderText}>{news?.From}</Text>
          </View>
          <Text variant="titleLarge">{news?.Title}</Text>
        <Image source={{ uri: 'https://picsum.photos/700' }}  style={styles.image} />
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  cardContent: {
    padding: 10,
    backgroundColor: 'white',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderText: {
    marginLeft: 10,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
  },
});
export default NewsCardV2;
