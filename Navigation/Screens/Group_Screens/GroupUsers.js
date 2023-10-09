import React from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { accentColors, primaryColors } from '../../Components/Colors';
import RedLine from '../Home_Screens/Components/RedLine';
import { Image } from 'expo-image';
import Schedule from './Components/ScheduleBlock';
import { useNavigation } from '@react-navigation/native';


const GroupDetailsScreen = ({ route }) => {
    const { groupDetails } = route.params;
    const navigation = useNavigation();

    // Dummy data for group schedule (replace with actual data or logic)
    const groupSchedule = [
        { day: 'Monday', time: '10:00 AM - 12:00 PM', isAvailable: true },
        { day: 'Tuesday', time: '02:00 PM - 04:00 PM', isAvailable: false },
        // Add more schedule entries as needed
      ];
    
      return (
        <View style={{ flex: 1 }} behavior="padding" enabled>
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={{ uri: groupDetails.Image_Link }} style={styles.image} />
                <RedLine />

                <View style={styles.projectDetailsContainer}>
                    <Text style={styles.sectionTitle}>{groupDetails.Title}</Text>
                    <Text style={styles.subtitle}>{groupDetails.CreatedDate}</Text>
                    <View style={styles.sponsorContainer}>
                        <Text style={styles.sponsertext}>{groupDetails.Owner}</Text>
                    </View>
                </View>
        
                <View style={styles.descriptionContainer}>
                    <Text style={styles.sectionTitle}>Project Description</Text>
                    <Text style={styles.eventDescription}>{groupDetails.Description}</Text>
                </View>
        
                <View style={styles.membersContainer}>
                    <Text style={styles.sectionTitle}>Members</Text>
                    {groupDetails.Members.map((member, index) => (
                    <Text key={index} style={styles.memberText}>
                        {member}
                    </Text>
                    ))}
                </View>
                <TouchableOpacity onPress={() => console.log('Implement your logic to show project location')}>
                    <Text style={styles.sectionTitle}>Project Location</Text>
                </TouchableOpacity>
                    <Button onPress={() => console.log('Edit button pressed')}>Edit</Button>    
                <View style={styles.scheduleContainer}>
                    <Text style={styles.sectionTitle}>Group Schedule</Text>
                    {/* <Schedule/> */}
                    <TouchableOpacity onPress={() => 
                        navigation.navigate('GroupSchedule')}>
                        <Text style={styles.sectionTitle}>Look at Schedule</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
      );
    };
    
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  imageHeader: {
    width: '100%',
    height: '30%', // Adjust the height based on your preference
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
