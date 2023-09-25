import React from 'react';
import MainStack from './Navigation/MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

function App() {
  // Function to delete data from AsyncStorage
  // const deleteDataFromStorage = async () => {
  //   try {
  //     await AsyncStorage.removeItem('userEmail');
  //     await AsyncStorage.removeItem('userPassword');
  //     console.log('Data deleted from AsyncStorage');
  //   } catch (error) {
  //     console.error('Error deleting data from AsyncStorage:', error);
  //   }
  // };
  // deleteDataFromStorage();
  //   const loadLoginInfo = async () => {
  //     try {
  //       const encryptedEmail = await AsyncStorage.getItem('userEmail');
  //       const encryptedPassword = await AsyncStorage.getItem('userPassword');
  //       console.log('email',encryptedEmail,'pass',encryptedPassword);
  //     } catch (error) {
  //       console.error('Error loading login info:', error);
  //       return null; // Handle error
  //     }
  //   };
  //   loadLoginInfo();
  return (
    <MainStack />  
  );
}

export default App;
