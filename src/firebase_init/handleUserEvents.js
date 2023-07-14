import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "./firebase"
 
const HandleUserEvents = (Titledata, Descdata,Sponserdata,Datedata) => {
    const ref = collection(firestore, "Event_data") 
    let data = {
        Title: Titledata,
        Description: Descdata,
        Sponser:Sponserdata,
        Date:Datedata,
    }  
    try {
        addDoc(ref, data)   
    } catch(err) {
        console.log(err)
    }
}

export default HandleUserEvents