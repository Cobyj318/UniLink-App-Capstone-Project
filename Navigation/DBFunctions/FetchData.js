import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "../../src/firebase_init/firebase";

export const fetchData = async () => {
  try {
    const eventsRef = collection(firestore, 'Event_data');
    const eventsQuery = query(eventsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(eventsQuery);
    const usersData = [];
    querySnapshot.forEach((doc) => {
      const { Title, Description, Sponser, Date } = doc.data();
      usersData.push({
        id: doc.id,
        Title,
        Description,
        Sponser,
        Date,
      });
    });
    return usersData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
