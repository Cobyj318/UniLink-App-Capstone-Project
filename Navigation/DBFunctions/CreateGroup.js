import { addDoc, collection} from "@firebase/firestore"
import { firestore } from "../../src/firebase_init/firebase";

const CreateGroup = (Group) => {
    const ref = collection(firestore, "Groups") 
    try {
        addDoc(ref, Group)   
    } catch(err) {
        console.log(err)
    }
}

export default CreateGroup