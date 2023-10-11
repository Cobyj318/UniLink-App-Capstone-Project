import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PortfolioScreen from './PortfolioScreen';
import { RefreshControl } from 'react-native';
import { Image } from 'expo-image';

const UserProfile = ({ route }) => {
  const { CardUser } = route.params;
  const [userDetails, setUserDetails] = useState(CardUser);
  const [loading, setLoading] = useState(false);
  console.log(userDetails);
  const userName = `${userDetails ? userDetails.FirstName : ''} ${userDetails ? userDetails.LastName : ''}`;
  const userImage = userDetails ? userDetails.Profile_Image : '';

  const onRefresh = async () => {
    try {
      console.log("Refreshing");
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <ScrollView style={{ flex: 1, alignSelf: 'center' }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
      <View style={Pfstyles.container}>
        <Image source={{ uri: userImage }} style={{ width: 100, height: 100, borderRadius: 50 }} />
        <View style={Pfstyles.textContainer}>
          <Text style={Pfstyles.containerItems}>Tags Here</Text>
        </View>
      </View>
      <View style={styles.Bio}>
        <Text style={{ fontSize: 30, fontWeight: "700", alignSelf: 'center' }}>Portfolio</Text>
        <PortfolioScreen />
      </View>
      <View style={styles.Bio}>
        <Text style={{ fontSize: 30, fontWeight: "700", alignSelf: 'center' }}>Connections</Text>
      </View>
    </ScrollView>
  );
}

export default UserProfile;

const styles = StyleSheet.create({
  notEditing: {
    flex: 1,
    color: "#ffffff"
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },
  editing: {
    flex: 1,
    color: "#99a19b"
  },
  editBtn: {
    flex: 1
  },
  saveEditsBtn: {
    flex: 1
  },
  Bio: {
    paddingTop: 10,
    flex: 1,
    marginTop: 10,
    backgroundColor: "#ffffff",
    borderRadius: 40,
    minHeight: 150,
    width: 325,
    fontSize: 20,
    overflow: 'hidden',
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
    justifyContent: "space-between"
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    height: 165
  },
  containerItems: {
    alignSelf: 'center',
    paddingLeft: 50,
    position: "relative",
    alignSelf: "center",
    right: 35,
    fontSize: 20,
  }
});
