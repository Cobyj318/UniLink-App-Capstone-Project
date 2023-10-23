import React from 'react';
import { View,StyleSheet, KeyboardAvoidingView} from 'react-native';
import RedLine from '../Home_Screens/Components/RedLine';
import { Image } from 'expo-image';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import GroupUpdates from './GroupUpdates';
import GroupDetail from './GroupDetail';
const { height } = Dimensions.get('window');

const GroupDetailsScreen = ({ route }) => {
  const { groupDetails } = route.params;
  console.log('Group Details:', groupDetails);
  const Tab = createMaterialTopTabNavigator();
  
  function TabScreens() {
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen name="Details" component={GroupDetail} initialParams={{groupDetails}}/>
          <Tab.Screen name="Updates" component={GroupUpdates} initialParams={{groupDetails}}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <View style={styles.container}>
        <Image source={{uri: groupDetails.Image_Link}} style={styles.image}/>
        <RedLine />
        <TabScreens/>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: height / 8, // Set the height to one-third of the screen height
  },
});

export default GroupDetailsScreen;
