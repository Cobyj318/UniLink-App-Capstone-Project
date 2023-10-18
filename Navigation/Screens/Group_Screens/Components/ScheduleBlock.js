// ScheduleBlock.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ScheduleBlock = ({ day }) => {
  const [availability, setAvailability] = useState(Array(24).fill(true));

  const renderHourBlock = (hour, index) => (
    <TouchableOpacity
      key={hour}
      style={[styles.hourBlock, { backgroundColor: availability[index] ? '#6ab04c' : '#d9534f' }]}
      onPress={() => toggleAvailability(index)}
    >
      <Text style={styles.hourText}>{hour}</Text>
    </TouchableOpacity>
  );

  const toggleAvailability = (index) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index] = !updatedAvailability[index];
    setAvailability(updatedAvailability);
  };

  return (
    <View style={styles.dayScheduleContainer}>
      <Text style={styles.dayTitle}>{day}</Text>
      <View style={styles.hoursContainer}>
        {[...Array(24).keys()].map((hour, index) => renderHourBlock(`${hour}:00`, index))}
      </View>
    </View>
  );
};


const Schedule = () => {
  // const { groupDetails } = route.params;
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {daysOfWeek.map((day) => (
        <ScheduleBlock key={day} day={day} />
      ))}
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  dayScheduleContainer: {
    marginRight: 20,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hoursContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  hourBlock: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 5,
    marginRight: 5,
  },
  hourText: {
    color: 'white',
  },
  goBackButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  goBackButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

