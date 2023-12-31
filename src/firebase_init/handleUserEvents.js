import { addDoc, collection,serverTimestamp } from "@firebase/firestore"
import { firestore } from "./firebase"

const HandleUserEvents = (Titledata, Descdata,Sponserdata,Datedata,LocationData,CreatedbyData,ImageLinkData) => {
    const ref = collection(firestore, "Event_data") 
    console.log(CreatedbyData);
    let data = {
        Title: Titledata,
        Description: Descdata,
        Sponser:Sponserdata,
        Date:Datedata,
        Creator:CreatedbyData,
        createdAt: serverTimestamp(),
        Image_Link:ImageLinkData,
        Location:LocationData,
    }  
    try {
        addDoc(ref, data)   
    } catch(err) {
        console.log(err)
    }
}

export default HandleUserEvents