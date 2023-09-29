import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image, Button, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'; // Import TouchableOpacity for custom button styling
import UploadThing from '../Components/uploadThing';
import PortfolioScreen from './PortfolioScreen';
import { fetchData } from '../DBFunctions/FetchData';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';
import { fetchUserData } from '../Components/UserData';
import { CircularImage } from '../Components/CircleImage';
import { useRoute } from '@react-navigation/native';

export default function OthersProfileScreen({ navigation, otheruser }) {
  const [Image_, setImage_] = useState('');

  console.log(otheruser);

  const userImage = otheruser ? otheruser.Profile_Image : '';
  useEffect(() => {
    setImage_(userImage);
  }, []);

  return (
    <View style={{ flex: 1, alignSelf: 'center' }}>
      <View style={Pfstyles.container}>
        <CircularImage imageUrl={otheruser?.Profile_Image}/>
        <View style={Pfstyles.textContainer}>
          <Text style={Pfstyles.containerItems}>Tags Here</Text>
        </View>
      </View>

      <Text style={{ flex: 1 }}>Friends</Text>

      <TouchableOpacity onPress={() => navigation.navigate('PortfolioScreen')}>
        <Text style={{ color: '#3498db', marginVertical: 10 }}>Portfolio</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CollaborationScreen')}>
        <Text style={{ color: '#3498db', marginVertical: 10 }}>Create and join other people's Projects</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Bio: {
    marginTop: 10,
    backgroundColor: "#ffffff",
    borderRadius: 40,
    minHeight: 50,
    width: 325,
    fontSize: 20,
    paddingLeft: 10,
  },
});

const Pfstyles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    height: 165,
    width: 325,
    borderRadius: 70,
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    height: 165,
  },
  containerItems: {
    alignSelf: 'center',
    paddingLeft: 50,
    position: "relative",
    alignSelf: "center",
    right: 35,
    fontSize: 20,
  },
});
