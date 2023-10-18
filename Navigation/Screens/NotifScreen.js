import React, {useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity} from 'react-native';
import { accentColors, primaryColors } from "../Components/Colors"
import { doc,getDoc } from 'firebase/firestore';
import { firestore } from '../../src/firebase_init/firebase';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';
import { Image } from 'expo-image';
import { RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native';

const NotifScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataFromFirebase();
    setLoading(false);
  }, []);

  const onRefresh = async () => {
    setLoading(true);
    console.log("Refresh");
    await fetchDataFromFirebase();
    setLoading(false);
  };
  const fetchDataFromFirebase = async () => {
    try {
      const notifdocRef = doc(firestore, 'Notifications', FIREBASE_AUTH.currentUser.uid);
      const docSnapshot = await getDoc(notifdocRef);
      if (docSnapshot.exists()) {
        const notifData = docSnapshot.data();
        setNotifications(notifData);
        console.log("notifData.conenct: ",notifData.Connects);
        console.log("notifData.conenct: ",notifData.Connects?.type);
      } else {
        console.log("Document does not exist.");
      }
    } catch (error) {
      console.error("Error fetching notification data:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      ) : (
        <FlatList
          data={notifications?.Connects}
          renderItem={RenderNotifTypes}
          keyExtractor={(item) => item?.id}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        />
      )}
    </SafeAreaView>
  );
  
};

const RenderNotifTypes = ({ item }) => {
  console.log("This is the item in the rendertype:", item);

  const renderItemContent = () => {
    if (item?.type === "Connection") {
      return (
        <TouchableOpacity onPress={() => console.log("Connect")} style={styles.connectBtn}>
          <Text style={{ color: "#ffffff", alignSelf: "center" }}>+</Text>
        </TouchableOpacity>
      );
    } else if (item?.type === "Mutuals") {
      return (
        <TouchableOpacity onPress={() => console.log("View Project")} style={styles.viewBtn}>
          <Text style={{ color: "#ffffff", alignSelf: "center", fontSize: 12 }}>View</Text>
        </TouchableOpacity>
      );
    }
    return null; // Default case
  };
  if (item!==null){return (
    <View style={styles.item}>
        <Image source={{ uri: item?.image }} style={styles.userPfp} />
        <Text>{item?.title}</Text>
        {renderItemContent()}
    </View>
  );}
  else return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:primaryColors.blue,
  },
  item: {
    flex:1,
    flexDirection:'row',
    borderWidth:2,
    borderRadius:10,
    backgroundColor: 'white',
    marginVertical: 4,
    marginHorizontal: 16,
    borderColor: primaryColors.red,
  },
  userPfp: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  connectBtn: {
    padding:10,
    backgroundColor: accentColors.lightblue,
    borderRadius: 20,
    marginTop:5,
    marginLeft:10,
    marginRight:10,
    width:35,
    position: 'absolute',
    right:0,
  },
  viewBtn: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: accentColors.lightblue,
    borderRadius: 20,
    marginTop:5,
    marginLeft:10,
    marginRight:10,
    position: 'absolute',
    right:0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotifScreen;