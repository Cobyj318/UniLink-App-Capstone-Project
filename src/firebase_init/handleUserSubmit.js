import { setDoc, doc, collection } from "@firebase/firestore";
import { firestore } from "./firebase";

const HandleUserSubmit = (FirstName, LastName, Major, IdData, AvatarData) => {
  const userRef = doc(firestore, "User_data", IdData); // Specify the custom ID here
  const notifRef = doc(firestore, "Notifications", IdData); // Specify the custom ID here

  const data = {
    FirstName,
    LastName,
    Major,
    Connections: [],
    Skills: [],
    Projects: [],
    Interests: [],
    Experience: "",
    Profile_Image: AvatarData,
    Id:IdData,
  };
  // Using setDoc to set data and the document ID for the "User_data" collection
  const setUserDocPromise = setDoc(userRef, data);

  // Using setDoc to set data and the document ID for the "Notifications" collection
  const setNotifDocPromise = setDoc(notifRef, {
    Connects: [], // You can add your desired data here for Notifications
  });

  // Use Promise.all to wait for both document creations to complete
  return Promise.all([setUserDocPromise, setNotifDocPromise])
    .then(() => IdData) // Return the specified ID
    .catch((error) => {
      console.error("Error adding documents: ", error);
      return null;
    });
};

export default HandleUserSubmit;
