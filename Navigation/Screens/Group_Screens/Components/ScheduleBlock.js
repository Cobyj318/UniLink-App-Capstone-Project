// ScheduleBlock.js

import React from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ScheduleBlock = ({ day }) => {
  const renderHourBlock = (hour, isAvailable) => (
    <View key={hour} style={[styles.hourBlock, { backgroundColor: isAvailable ? '#6ab04c' : '#d9534f' }]}>
      <Text style={styles.hourText}>{hour}</Text>
    </View>
  );

  return (
    <View style={styles.dayScheduleContainer}>
      <Text style={styles.dayTitle}>{day}</Text>
      <View style={styles.hoursContainer}>
        {[...Array(24).keys()].map((hour) => renderHourBlock(`${hour}:00`, Math.random() < 0.7))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
scheduleContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    },
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
});

const Schedule= () => {
return(
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {daysOfWeek.map((day) => <ScheduleBlock key={day} day={day} />)}
    </ScrollView>
)
}

export default Schedule;
