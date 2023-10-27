import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import ChipInputs from './Components/ChipInput';
import { primaryColors } from '../../Components/Colors';
import { FIREBASE_AUTH } from '../../../src/firebase_init/firebase';
import { fetchUserData } from '../../Components/UserData';
import CreateGroup from '../../DBFunctions/CreateGroup';
import updateGroupIds from '../../DBFunctions/updateGroupIds';
import { firestore } from '../../../src/firebase_init/firebase';
import {doc, getDoc } from 'firebase/firestore';

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
  const [searchMember, setSearchMember] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [availableFriends, setAvailableFriends] = useState([]);

  const searchForMembers = async (query) => {
    const results = availableFriends.filter(member => member.name.toLowerCase().includes(query.toLowerCase()));
    setSearchResults(results);
  };

  const addMember = (member) => {
    if (!membersID.includes(member.id)) {
      setMembers([...members, member.name]);
      setMembersID([...membersID, member.id]);
      setSearchMember(''); // Clear the search input
      setSearchResults([]); // Clear the search results
    } else {
      console.log("Member already added.");
    }
  };
  const fetchDataAndUserData = async () => {
    try {
      setLoading(true);
      const userData = await fetchUserData(FIREBASE_AUTH.currentUser?.uid);
      setUserDetails(userData[0]);
      console.log(userData[0].true_connections);
      // Check if true_connections exist and is not empty
      if (userData[0]?.true_connections) {
        // Retrieve friends' details using their document IDs from true_connections
        const friendsDataPromises = userData[0].true_connections.map(async docId => {
          const docSnapshot = await getDoc(doc(firestore, 'User_data', docId));
          const friendData = docSnapshot.data();
          return { 
            id: docId, 
            name: `${friendData?.FirstName} ${friendData?.LastName}`
          };
        });
      const friendsData = await Promise.all(friendsDataPromises);
      setAvailableFriends(friendsData);
      }  
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
        Updates:[],
      };
      console.log("this is all the members",membersID);
	  CreateGroup(newGroup);
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
              <TextInput 
  placeholder="Search member" 
  value={searchMember} 
  onChangeText={(text) => {
    setSearchMember(text);
    searchForMembers(text);
  }} 
  style={styles.input} 
/>

{searchResults.map(member => (
  <TouchableOpacity key={member.id} onPress={() => addMember(member)}>
    <Text>{member.name}</Text>
  </TouchableOpacity>
))}

<View>
  <Text>Added Members:</Text>
  {members.map((memberName, index) => (
    <Text key={index}>{memberName}</Text>
  ))}
</View>
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
