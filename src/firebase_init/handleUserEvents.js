import { addDoc, collection,serverTimestamp } from "@firebase/firestore"
import { firestore } from "./firebase"
 
const HandleUserEvents = (Titledata, Descdata,Sponserdata,Datedata) => {
    const ref = collection(firestore, "Event_data") 
    let data = {
        Title: Titledata,
        Description: Descdata,
        Sponser:Sponserdata,
        Date:Datedata,
        createdAt: serverTimestamp(),
    }  
    try {
        addDoc(ref, data)   
    } catch(err) {
        console.log(err)
    }
}

export default HandleUserEvents