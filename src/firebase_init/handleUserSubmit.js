import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "./firebase"
 
/**
 * Handles the submission of user data to the Firebase Firestore collection "User_data".
 *
 * @function HandleUserSubmit
 * @param {string} Userdata - The username of the user to be added.
 * @param {string} Passdata - The password of the user to be added.
 * @param {string} Emaildata - The email of the user to be added.
 * @returns {void}
 */
const HandleUserSubmit = (Userdata, Passdata, Emaildata) => {
    const ref = collection(firestore, "User_data") // Firebase creates this automatically
 
    let data = {
        Username: Userdata,
        Password: Passdata,
        Email: Emaildata
    }
    
    try {
        addDoc(ref, data)
    } catch(err) {
        console.log(err)
    }
}

export default HandleUserSubmit