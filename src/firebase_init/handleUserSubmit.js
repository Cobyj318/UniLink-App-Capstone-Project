import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "./firebase"
 
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