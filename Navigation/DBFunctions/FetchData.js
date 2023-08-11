import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "../../src/firebase_init/firebase";

export const fetchData = async () => {
  try {
    const eventsRef = collection(firestore, 'Event_data');
    const eventsQuery = query(eventsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(eventsQuery);
    const usersData = [];
    querySnapshot.forEach((doc) => {
      const { Title, Description, Sponser, Date,Location,Creator,Image_Link } = doc.data();
      usersData.push({
        id: doc.id,
        Title,
        Description,
        Sponser,
        Date,
        Image_Link,
        Location,
        Creator,
      });
    });
    return usersData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};



export const fetchNewsData = async () => {
  try {
    const eventsRef = collection(firestore, 'emails/payload');
    //const eventsQuery = query(eventsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(eventsRef);
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

export const fetchtagData = async () => {
  try {
    const eventsRef = collection(firestore, 'Portfolio_tags');
    const querySnapshot = await getDocs(eventsRef);
    const tagData = [];
    querySnapshot.forEach((doc) => {
      const { Interests, Skills} = doc.data();
      tagData.push({
        id: doc.id,
        Interests,
        Skills
      });
    });
    return tagData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};