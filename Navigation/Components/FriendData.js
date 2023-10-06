import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../src/firebase_init/firebase";
import { UserDelete } from "stream-chat-expo";

export async function fetchFriendData(searchID) {
  try {
    const userRef = collection(firestore, 'User_data');
    let firestoreQuery = query(userRef);

    // Check if a searchID is provided, and add a where clause to the query
    if (searchID) {firestoreQuery = query(userRef, where('id', '==', searchID));}
    
    const querySnapshot = await getDocs(firestoreQuery);

    if (querySnapshot.empty) {return [];}
    // Access the first document directly (assuming there's only one matching document)
    const doc = querySnapshot.docs[0];
    const { FirstName, LastName, Major,Profile_Image,Connections, Skills, Interests } = doc.data();
    const userData = {
      id: doc.id,
      FirstName,
      LastName,
      Major,
      Profile_Image,
      Connections,
      Skills, 
      Interests
    };
    return [userData]; // Return an array with the single user data object
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
