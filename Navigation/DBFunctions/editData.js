import { updateDoc, doc, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from "../../src/firebase_init/firebase";
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';

export async function editData(newNameData, newMajor) {
    try {
      const userRef = collection(firestore, 'User_data');
      let firestoreQuery = query(userRef);
  
      // Check if a searchID is provided, and add a where clause to the query
      firestoreQuery = query(userRef, where('Id', '==', FIREBASE_AUTH.currentUser?.uid));
      
      const querySnapshot = await getDocs(firestoreQuery);
      const docos = querySnapshot.docs[0];

      const docref = doc(firestore, 'User_data', docos.id);
      updateDoc(docref, {FirstName:newNameData[0], LastName:newNameData[1], Major:newMajor});
      console.log("success")

    }catch (error){
        console.error('Error editing data:', error);
    }
}