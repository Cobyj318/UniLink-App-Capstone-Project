import * as FileSystem from 'expo-file-system';

const saveJSONLocally = async (filename, jsonContent) => {
    try {
      await FileSystem.writeAsStringAsync(filename, jsonContent);
      console.log('JSON file has been saved:', filename);
    } catch (error) {
      console.error('An error occurred while saving the JSON file:', error);
    }
  };
export default saveJSONLocally


  