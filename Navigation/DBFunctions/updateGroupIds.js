import { getDocs, collection, updateDoc } from "@firebase/firestore";
import { firestore } from "../../src/firebase_init/firebase";

const updateGroupIds = async () => {
  const groupsCollectionRef = collection(firestore, "Groups");
  try {
    // Get all documents in the "Groups" collection
    const querySnapshot = await getDocs(groupsCollectionRef);
    // Iterate through each document and update its ID
    querySnapshot.forEach(async (doc) => {
      const docRef = doc.ref; 
      // Update the document with its own ID
      await updateDoc(docRef, {
        id: doc.id,
      });
    });

    console.log("Update completed successfully");
  } catch (err) {
    console.error("Error updating group IDs:", err);
  }
};

export default updateGroupIds;
