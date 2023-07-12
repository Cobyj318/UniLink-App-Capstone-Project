import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "./firebase"
 
const HandleUserEvents = (Titledata, Descdata) => {
   
    const ref = collection(firestore, "Event_data") // Firebase creates this automatically
    let data = {
        Title: Titledata,
        Description: Descdata,
    }  
   
    try {
        addDoc(ref, data)
        
    } catch(err) {
        console.log(err)
    }
    

}

export default HandleUserEvents