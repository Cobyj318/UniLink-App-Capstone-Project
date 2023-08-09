import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Tags from '../Components/Tags';
import { collection, getDocs } from '@firebase/firestore';
import { firestore } from '../../src/firebase_init/firebase';

export default function PortfolioScreen() {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchSkillsFromFirebase();
  }, []);

  const fetchSkillsFromFirebase = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'Portfolio_tags'));
      const skillsList = querySnapshot.docs.map(doc => doc.data().skills).flat();
      setSkills(skillsList);
    } catch (error) {
      console.error('Error fetching skills', error);
    }
  };

  const handleTagAdd = (tag) => {
    // Handle adding the tag to your state or Firebase
    setTags(prevTags => [...prevTags, tag]);
  }

  return (
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'top', paddingLeft: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Skills</Text>
      <Picker
        selectedValue={selectedSkill}
        onValueChange={(itemValue) => setSelectedSkill(itemValue)}
      >
        <Picker.Item label="Select Skill" value="" />
        {skills.map((skill, index) => (
          <Picker.Item key={index} label={skill} value={skill} />
        ))}
      </Picker>
      <Tags tags={tags} onTagAdd={handleTagAdd} color="#9b59b6" />
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Interests</Text>
      <Tags tags={['Singing']} onTagAdd={() => {}} color="#3498db" /> 
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Projects</Text>
      <Tags tags={['UniLink App']} onTagAdd={() => {}} color="#e74c3c" /> 
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Experience</Text>
      <Text> I worked as a Janitor at a hospital for 2 years in High School </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 4,
    marginRight: 8,
    backgroundColor: 'white',
  },
});
