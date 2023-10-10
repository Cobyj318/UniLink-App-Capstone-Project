import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import ChipInputs from './Components/ChipInput';
import { primaryColors } from '../../Components/Colors';
import { FIREBASE_AUTH } from '../../../src/firebase_init/firebase';
import { fetchUserData } from '../../Components/UserData';
import CreateGroup from '../../DBFunctions/CreateGroup';
import updateGroupIds from '../../DBFunctions/updateGroupIds';

export default function GroupCreationScreen({ navigation, route }) {
  const { onRefresh } = route.params;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [sponser, setSponser] = useState("");
  const [major, setMajor] = useState("");
  const [date, setDate] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [members, setMembers] = useState([]);
  const [membersID, setMembersID] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataAndUserData = async () => {
    try {
      setLoading(true);
      const userData = await fetchUserData(FIREBASE_AUTH.currentUser?.uid);
      setUserDetails(userData[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataAndUserData();
  }, [onRefresh]);

  useEffect(() => {
    if (userDetails) {
      setMembers([userDetails?.FirstName + " " + userDetails?.LastName]);
      setMembersID([FIREBASE_AUTH.currentUser?.uid]);
    }
  }, [userDetails]);

  const isFormValid = () => {
    return title.trim() !== "" && desc.trim() !== "" && sponser.trim() !== "";
  };

  const handleEnter = async () => {
    if (!isFormValid()) {
      alert("Please fill out all fields before entering the event.");
      return;
    }
    try {
      await fetchDataAndUserData();
      const newGroup = {
        Owner: major,
        CreatedDate: date,
        Title: title,
        Description: desc,
        Members: members,
        MembersID: membersID,
        Image_Link: 'https://picsum.photos/1100',
        Tags: tags,
      };
	  await CreateGroup(newGroup);
	  await updateGroupIds();
      console.log('New Group:', newGroup);
      setTitle("");
      setDesc("");
      setSponser("");
      setDate("");
      setMembers([]);
      setMembersID([]);
      setTags([]);
      navigation.goBack();

      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.redline}>
        <View style={styles.content}>
          {loading && <ActivityIndicator size="large" color="#3498db" />}
          {!loading && (
            <>
              <Text>Enter Details for your event.</Text>
              <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
              <TextInput placeholder="Description" value={desc} onChangeText={setDesc} style={styles.input} />
              <TextInput placeholder="Sponsor" value={sponser} onChangeText={setSponser} style={styles.input} />
              <TextInput placeholder="Major" value={major} onChangeText={setMajor} style={styles.input} />
              <ChipInputs selectedTags={tags} setSelectedTags={setTags} />

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                    setTitle("");
                    setDesc("");
                    setSponser("");
                    setDate("");
                  }}
                  style={[styles.button, styles.dismissButton]}
                >
                  <Text>Dismiss</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEnter} style={[styles.button, styles.enterButton]}>
                  <Text>Enter</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: primaryColors.blue,
    backgroundColor: primaryColors.blue,
    borderWidth: 15,
  },
  redline: {
    flex: 1,
    borderColor: primaryColors.red,
    backgroundColor: 'white',
    borderWidth: 5,
    borderRadius: 10,
  },
  content: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  enterButton: {
    backgroundColor: '#3498db',
    flex: 1,
    marginLeft: 5,
  },
  dismissButton: {
    backgroundColor: '#3498db',
    flex: 0.8,
  },
});
