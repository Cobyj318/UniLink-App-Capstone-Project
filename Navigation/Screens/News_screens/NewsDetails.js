import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { CircularImage } from '../../Components/CircleImage';
import { accentColors, primaryColors } from '../../Components/Colors';
import RedLine from '../../Components/RedLine';
import { FIREBASE_AUTH } from '../../../src/firebase_init/firebase';
import CommentSection from '../../Components/CommentSection';

const NewsDetailsScreen = () => {
  const route = useRoute();
  const { news } = route.params;
  console.log(news);

  const User_ID = FIREBASE_AUTH.currentUser?.uid;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{height:40,backgroundColor:primaryColors.blue,}}/>
      <View style={[styles.blueHeader]}>
        <View style={styles.textContainer}>
          <Text style={styles.blueHeadertext}>{news?.Title}</Text>
          <Text style={styles.blueHeadertext}>{news?.Date}</Text>
          <View style={styles.sponsorContainer}>
            <Text style={styles.sponsertext}>{news?.From}</Text>
          </View>
        </View>
      </View>
      <View style={{height:40,backgroundColor:primaryColors.blue,}}/>
      <RedLine />
      <Text style={styles.newsTitle}>{news?.Title}</Text>
      <Text style={styles.newsDate}>{news?.Date}</Text>
      <Text style={styles.newsDescription}>{news?.Body}</Text>
      {news?.Creator === User_ID && (
        <Button onPress={() => console.log('Edit button clicked')}>Edit</Button>
      )}
      <CommentSection/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  blueHeader: {
    backgroundColor: primaryColors.blue,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    flex: 1,
  },
  newsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  newsDate: {
    fontSize: 16,
    marginTop: 5,
  },
  newsLocation: {
    fontSize: 16,
    marginTop: 5,
    color: '#888',
  },
  newsDescription: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'left',
    paddingHorizontal: 20,
  },
  blueHeadertext: {
    color: '#69B3E7',
    fontSize: 40,
    flexWrap: 'wrap',
  },
  sponsertext: {
    color: accentColors.lightblue,
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
  },
  sponsorContainer: {
    flexDirection: 'row',
    paddingLeft: 50,
  },
});

export default NewsDetailsScreen;
