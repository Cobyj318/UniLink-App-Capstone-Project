import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Pressable, Image, TouchableOpacity } from 'react-native';
import { primaryColors } from "../Components/Colors"
const pfpImage = 'https://static.thenounproject.com/png/5034901-200.png';

const Types = '';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    type: "Mutuals",
    title: 'First Item',
    image: pfpImage
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    type: "Connection",
    title: 'Second Item',
    image: pfpImage
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    type: "Misc",
    title: 'Third Item',
    image: pfpImage
  },
];

const renderNotifTypes = ( {item} ) => {
  if (item.type === "Connection"){
    return(
      <Pressable>
        <View style={styles.item}>
          <Image source={{ uri: item.image }} style={styles.userPfp} />
          <Text>{item.title}</Text>
          <TouchableOpacity onPress={() => console.log("Connect")} style={styles.connectBtn}>
            <Text style={{color: "#ffffff", alignSelf:"center"}}>+</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  } else if (item.type === "Mutuals"){
    return(
      <Pressable>
        <View style={styles.item}>
          <Image source={{ uri: item.image }} style={styles.userPfp} />
          <Text>{item.title}</Text>
          <TouchableOpacity onPress={() => console.log("View Project")} style={styles.viewBtn}>
            <Text style={{color: "#ffffff", alignSelf:"center", fontSize:12}}>View</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  } else {
    return(
      <Pressable>
        <View style={styles.item}>
          <Image source={{ uri: item.image }} style={styles.userPfp} />
          <Text>{item.title}</Text>
        </View>
      </Pressable>
    );
  };
};

const NotifScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderNotifTypes}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flex:1,
    flexDirection:'row',
    borderWidth:1,
    borderRadius:15,
    backgroundColor: '#e8e8e8',
    marginVertical: 4,
    marginHorizontal: 16,
  },
  userPfp: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  connectBtn: {
    padding:10,
    backgroundColor: primaryColors.blue,
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
    backgroundColor: primaryColors.blue,
    borderRadius: 20,
    marginTop:5,
    marginLeft:10,
    marginRight:10,
    position: 'absolute',
    right:0,
  }
});

export default NotifScreen;