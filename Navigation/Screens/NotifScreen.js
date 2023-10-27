import React, {useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity} from 'react-native';
import { accentColors, primaryColors } from "../Components/Colors"
import { doc,getDoc,setDoc  } from 'firebase/firestore';
import { firestore } from '../../src/firebase_init/firebase';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';
import { Image } from 'expo-image';
import { RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { updateDoc } from 'firebase/firestore';

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
        console.log("notifData.conect: ",notifData.Connects);
        console.log("notifData.conect: ",notifData.Connects?.type);
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
  const addToTrueConnections = async (itemToAdd) => {
    try {
      const notifdocRef = doc(firestore, 'Notifications', FIREBASE_AUTH.currentUser.uid);
      const userDocRef = doc(firestore, 'User_data', FIREBASE_AUTH.currentUser.uid);  
      const otheruserRef=doc(firestore, 'User_data',itemToAdd);
      const otheruserDocSnapshot=await getDoc(userDocRef);
      const userDocSnapshot = await getDoc(userDocRef);
      const notifSnapshot=await getDoc(notifdocRef);
      if (userDocSnapshot.exists() && otheruserDocSnapshot.exists) {
        const userData = userDocSnapshot.data();
        const otheruserData=otheruserDocSnapshot.data();
        const notifData=notifSnapshot.data();

        // Add the new connection to the existing true_connections or create a new array if it doesn't exist
        const newnotifData = notifData.Connects.filter(item => item.id !== itemToAdd);
        const updatedTrueConnections = userData.true_connections ? [...userData.true_connections, itemToAdd] : [itemToAdd];
        const updatedotheruserTrueConnections=otheruserData.true_connections?[...otheruserData.true_connections,FIREBASE_AUTH.currentUser.uid]:[FIREBASE_AUTH.currentUser.uid]
        // Update the true_connections field in Firestore
        await updateDoc(userDocRef, {
          true_connections: updatedTrueConnections
        });
        await updateDoc(otheruserRef,{
          true_connections: updatedotheruserTrueConnections,
        });
        await setDoc(notifdocRef, { Connects: newnotifData }, { merge: true });
        console.log("Added to true_connections successfully!");
      } else {
        console.log("User document does not exist!");
      }
    } catch (error) {
      console.error("Error adding to true_connections:", error);
    }
  };
  
  const renderItemContent = () => {
    if (item?.type === "Mutuals") {
      return (
        <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => console.log("Minus")} style={styles.button}>
          <Text style={{ color: "#ffffff", alignSelf: "center" }}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addToTrueConnections(item.id)} style={styles.button}>
          <Text style={{ color: "#ffffff", alignSelf: "center" }}>+</Text>
        </TouchableOpacity>
      </View>
      );
    } else if (item?.type === "Connection") {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // vertically centers the content
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 4,
    marginHorizontal: 16,
    borderColor: primaryColors.red,
    padding: 10, // to provide some spacing inside the item
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
    flexDirection:'row'
  },
  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    marginTop: 5,
    marginRight: 10,
  },
  
  button: {
    padding: 10,
    backgroundColor: accentColors.lightblue,
    borderRadius: 20,
    marginLeft: 5, // Space between the buttons
    width: 35,
    alignItems: 'center', // To center the text within the button
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtn: {
    padding: 10,
    backgroundColor: accentColors.lightblue,
    borderRadius: 20,
    marginLeft: 5, // Space between the buttons
    width: 60,
    alignItems: 'center', // To center the text within the button           // Elevation for android to give a shadow effect
  },
});

export default NotifScreen;