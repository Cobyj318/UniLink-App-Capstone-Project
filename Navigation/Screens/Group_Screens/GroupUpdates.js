import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Modal } from 'react-native';
import { FAB } from 'react-native-paper';
import { FlatList } from 'react-native';
import { neutralColors, primaryColors } from '../../Components/Colors';
import { updateDoc, doc } from "@firebase/firestore"
import { firestore } from '../../../src/firebase_init/firebase';
import renderUpdateCard from './Components/renderUpdateCard';

const GroupUpdates = ({ route }) => {
    const { groupDetails } = route.params;
    const [isModalOpen, setModalOpen] = useState(false);
    const [newUpdate, setNewUpdate] = useState({ title: '', date: '', description: '' });
    const [updates, setUpdates] = useState(groupDetails?.updates||[]);

    const addUpdate = async () => {
		// Validate and add the new update to the updates array
		if (newUpdate.title && newUpdate.date && newUpdate.description) {
		  const updatedUpdates = [...updates, newUpdate];
		  setUpdates(updatedUpdates);
		  try {
			const ref = doc(firestore, "Groups", groupDetails.id);
			await updateDoc(ref, {
			  updates: updatedUpdates 
			});
			setNewUpdate({ title: '', date: '', description: '' });
			console.log("Update added successfully to Firestore");
		  } catch (error) {
			console.error("Error adding update to Firestore: ", error);
		  }
	  
		  setModalOpen(false);
		}
	  };

	  
    const FloatingButton = () => (
      <FAB backgroundColor={'#3498db'} icon="plus" style={styles.fab} onPress={()=>setModalOpen(true)} />
    );
    return (
      <View style={styles.container}>
        <Text style={styles.cardTitle}>{groupDetails.Title}</Text>

        <Modal
          	visible={isModalOpen}
          	animationType="slide"
          	transparent={true}
          	onRequestClose={()=>setModalOpen(false)}
        >
        	<View style={styles.modalcontainer}>
        		<View style={styles.redline}>
					<Text>Add New Update</Text>
					<TextInput
					placeholder="Title"
					value={newUpdate.title}
					style={styles.input}
					onChangeText={(text) => setNewUpdate({ ...newUpdate, title: text })}
					/>
					<TextInput
					placeholder="Date"
					value={newUpdate.date}
					style={styles.input}
					onChangeText={(text) => setNewUpdate({ ...newUpdate, date: text })}
					/>
					<TextInput
					placeholder="Description"
					value={newUpdate.description}
					style={styles.input}
					onChangeText={(text) => setNewUpdate({ ...newUpdate, description: text })}
					/>
					<Button title="Add Update" onPress={addUpdate} />
					<Button title="Cancel" onPress={()=>setModalOpen(false)} />
          		</View>
          	</View>
        </Modal>
        <FlatList
          data={updates}
          renderItem={renderUpdateCard}
        />
        <FloatingButton/>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
	backgroundColor:neutralColors.lightblue,
  },
  modalcontainer: {
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
    padding: 10,
    justifyContent: 'center' 
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center'

  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default GroupUpdates;
