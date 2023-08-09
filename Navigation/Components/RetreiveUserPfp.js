export async function fetchUserPfp(searchID) {
    try {
      const userRef = collection(firestore, 'User_data');
      let firestoreQuery = query(userRef);
  
      // Check if a searchID is provided, and add a where clause to the query
      if (searchID) {firestoreQuery = query(userRef, where('Id', '==', searchID));}
      
      const querySnapshot = await getDocs(firestoreQuery);
  
      if (querySnapshot.empty) {return [];}
      // Access the first document directly (assuming there's only one matching document)
      const doc = querySnapshot.docs[0];
      const { Profile_Image } = doc.data();
      const userData = {
        Profile_Image,
      };
      if (Profile_Image){return{userData}}
      return []; // Return an array with the single user data object
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  