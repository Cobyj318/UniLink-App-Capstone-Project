import React from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { accentColors} from '../../Components/Colors';
import RedLine from '../Home_Screens/Components/RedLine';
import { Image } from 'expo-image';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CommentSection from '../../Components/CommentSection';

const Tab = createMaterialTopTabNavigator();



const GroupDetailsScreen = ({ route }) => {
  const { groupDetails } = route.params;
  console.log('Group Details:', groupDetails);

  // Replace with actual user ID or logic to get user ID
  const User_ID = 'User123';

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{uri: groupDetails.Image_Link}} style={styles.image}/>
        {/* Project Details Section */}
        <RedLine />
        {/* <TabScreens/> */}
        <View style={styles.projectDetailsContainer}>
          <Text style={styles.sectionTitle}>{groupDetails.Title}</Text>
          <Text style={styles.subtitle}>{groupDetails.CreatedDate}</Text>
          <View style={styles.sponsorContainer}>
            <Text style={styles.sponsertext}>{groupDetails.Owner}</Text>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Project Description</Text>
          <Text style={styles.eventDescription}>{groupDetails.Description}</Text>
        </View>
        
        {/* Members Section */}
        <View style={styles.membersContainer}>
          <Text style={styles.sectionTitle}>Members</Text>
          {groupDetails.Members.map((member, index) => (
            <Text key={index} style={styles.memberText}>{member}</Text>
          ))}
        </View>
        
        {/* Location Section */}
        <TouchableOpacity onPress={() => console.log('Implement your logic to show project location')}>
          <Text style={styles.sectionTitle}>Project Location</Text>
          {/* Include logic to show location details */}
        </TouchableOpacity>

        {/* Edit Button (if the user is the owner) */}
        {groupDetails.Owner === User_ID && (
          <Button onPress={() => console.log('Edit button pressed')}>Edit</Button>
        )}
        <CommentSection/>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  imageHeader: {
    width: '100%',
    height: 300, // Adjust the height based on your preference
  },
  projectDetailsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  descriptionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#666',
    fontSize: 16,
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'left',
  },
  membersContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  memberText: {
    fontSize: 16,
    marginBottom: 5,
  },
  sponsertext: {
    color: accentColors.lightblue,
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  sponsorContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default GroupDetailsScreen;
