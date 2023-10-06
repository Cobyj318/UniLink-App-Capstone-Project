import { setDoc, doc, collection } from "@firebase/firestore";
import { firestore } from "./firebase";

const HandleUserSubmit = (FirstName, LastName, Major, IdData, AvatarData) => {
  const userRef = doc(firestore, "User_data", IdData); // Specify the custom ID here
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

  // Using setDoc to set data and the document ID
  return setDoc(userRef, data)
    .then(() => IdData) // Return the specified ID
    .catch((error) => {
      console.error("Error adding document: ", error);
      return null;
    });
};

export default HandleUserSubmit;
