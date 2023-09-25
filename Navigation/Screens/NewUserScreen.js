import * as React from 'react';
import { useState } from 'react';
import {View,TextInput,Button,Alert,StyleSheet,KeyboardAvoidingView,} from 'react-native';
import { storage } from '../../src/firebase_init/firebase';
import HandleUserSubmit from '../../src/firebase_init/handleUserSubmit';
import UploadThing from '../Components/uploadThing';
import { ExistingUser } from '../MainStack';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

const NewUserScreen = ({ navigation }) => {
  const [Image_, setImage_] = useState('');
  const [uploading, setUploading] = useState(false);
  const [FirstName, setFirst] = useState('');
  const [LastName, setLast] = useState('');
  const [Major, SetMajor] = useState('');

  const submitHandler = async (FirstName, LastName, Major) => {
    if (FirstName === '' || LastName === '' || Major === '') {
      Alert.alert('Missing Entries', 'You have empty entries', [{ text: 'OK' }]);
    } else {
      const storageRef = ref(storage,`images/${FIREBASE_AUTH.currentUser?.uid}/${Date.now()}.jpg`);
      const response = await fetch(Image_);
      const blob = await response.blob();
      try {
        setUploading(false);
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);
        HandleUserSubmit(
          FirstName,
          LastName,
          Major,
          FIREBASE_AUTH.currentUser?.uid,
          downloadURL
        );
        setUploading(true);
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploading(false);
      }
      if(uploading){navigation.replace(ExistingUser);}
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <View style={styles.UploadContainer}>
          <UploadThing
            isEditing={true}
            navigation={navigation}
            setImage_={setImage_}
          />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(val) => setFirst(val)}
          placeholder="First Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={(val) => setLast(val)}
          placeholder="Last Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={(val) => SetMajor(val)}
          placeholder="Major"
        />
        <Button
          title="Submit"
          onPress={() => submitHandler(FirstName, LastName, Major)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  UploadContainer: {
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
});
