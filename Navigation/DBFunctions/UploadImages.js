import { storage } from "../../src/firebase_init/firebase";

export const uploadImageToFirebase = async (imageURI) => {
  try {
    const response = await fetch(imageURI);
    const blob = await response.blob();

    const storageRef = storage.ref().child("images/" + Math.random().toString(36).substring(7)); // Generate a random unique filename
    const uploadTask = storageRef.put(blob);

    uploadTask.on("state_changed",
      (snapshot) => {
        // Upload progress tracking, you can implement a progress bar here
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% complete");
      },
      (error) => {
        console.error("Error uploading image:", error);
      },
      async () => {
        // Upload complete, get the download URL and save it or use it as needed
        const downloadURL = await storageRef.getDownloadURL();
        console.log("Download URL:", downloadURL);
        // Save the downloadURL to your Firestore database if needed
      }
    );
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};
