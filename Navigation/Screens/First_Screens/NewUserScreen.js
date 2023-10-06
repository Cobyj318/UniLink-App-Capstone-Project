import * as React from 'react';
import { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import { storage } from '../../../src/firebase_init/firebase';
import HandleUserSubmit from '../../../src/firebase_init/handleUserSubmit';
import UploadThing from '../../Components/uploadThing';
import { ExistingUser } from '../../MainStack';
import { FIREBASE_AUTH } from '../../../src/firebase_init/firebase';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { Picker } from '@react-native-picker/picker';

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
      const storageRef = ref(storage, `images/${FIREBASE_AUTH.currentUser?.uid}/${Date.now()}.jpg`);
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
        navigation.replace(ExistingUser);
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploading(false);
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/image.png')}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.container}>
          <View style={styles.uploadContainer}>
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
          <View style={styles.pickerContainer}>
          <Picker
            selectedValue={Major}
            style={styles.picker}
            onValueChange={(itemValue) => SetMajor(itemValue)}
          >
            <Picker.Item label="Select Major" value="" />
  <Picker.Item label="Computer Science" value="Computer Science" />
  <Picker.Item label="Mechanical Engineering" value="Mechanical Engineering" />
  <Picker.Item label="Electrical Engineering" value="Electrical Engineering" />
  <Picker.Item label="Civil Engineering" value="Civil Engineering" />
  <Picker.Item label="Chemical Engineering" value="Chemical Engineering" />
  <Picker.Item label="Biomedical Engineering" value="Biomedical Engineering" />
  <Picker.Item label="Industrial Engineering" value="Industrial Engineering" />
  <Picker.Item label="Aerospace Engineering" value="Aerospace Engineering" />
  <Picker.Item label="Computer Engineering" value="Computer Engineering" />
  <Picker.Item label="Software Engineering" value="Software Engineering" />
  <Picker.Item label="Environmental Engineering" value="Environmental Engineering" />
  <Picker.Item label="Information Technology" value="Information Technology" />
  <Picker.Item label="Business Administration" value="Business Administration" />
  <Picker.Item label="Marketing" value="Marketing" />
  <Picker.Item label="Finance" value="Finance" />
  <Picker.Item label="Accounting" value="Accounting" />
  <Picker.Item label="Biology" value="Biology" />
  <Picker.Item label="Chemistry" value="Chemistry" />
  <Picker.Item label="Physics" value="Physics" />
  <Picker.Item label="Psychology" value="Psychology" />
          </Picker>
          </View>
          <Button
            title="Submit"
            onPress={() => submitHandler(FirstName, LastName, Major)}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default NewUserScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  uploadContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  picker: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginVertical: 4,
  },
  pickerContainer: {
   
  },
});
