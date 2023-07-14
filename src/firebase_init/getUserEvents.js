
import { collection, getDocs } from "firebase/firestore"; 
import { firestore } from "./firebase"
import saveJSONLocally from "./saveJSONLocally";
import * as FileSystem from 'expo-file-system';

const getUserEvents = async () => 
{    
  const filePath = FileSystem.documentDirectory + 'posts.json';
  const querySnapshot = await getDocs(collection(firestore, "Event_data"));
  querySnapshot.forEach(async (doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    saveJSONLocally(filePath,JSON.stringify(doc.data()));
  });
}

export default getUserEvents