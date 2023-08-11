// SimpleMenu.js
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SimpleMenu = () => {
 return (
   <View style={styles.container}>
     <Text>SimpleMenu</Text>
   </View>
 );
};

export default SimpleMenu;

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   justifyContent: "center",
   alignItems: "center",
 },
});
