import { updateDoc, doc, getDocs, query, where, deleteDoc, collection } from 'firebase/firestore';
import { firestore,FIREBASE_AUTH, storage} from "../../src/firebase_init/firebase";
import { deleteUser } from 'firebase/auth'
import { ref, deleteObject } from 'firebase/storage';

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

    }catch (error){
        console.error('Error editing data:', error);
    }
}

export async function deleteSelfData(){
  try{
    const userRef = doc(firestore, 'User_data', FIREBASE_AUTH.currentUser?.uid);
    const storageRef = ref(storage, `images/${FIREBASE_AUTH.currentUser?.uid}/`);
    deleteObject(storageRef);
    deleteDoc(userRef);
    deleteUser(FIREBASE_AUTH.currentUser);
    
  }catch(err){
    console.log(err, "Unsuccessful");
  }
}