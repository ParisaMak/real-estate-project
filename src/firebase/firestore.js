import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '@/firebase/firebase';

export const saveUser = async (user) => {
    try{
        const userRef = doc(db , 'users' , user.uid);
        const userSnapshot = await getDoc(userRef);
        if(!userSnapshot.exists()) {
            const {displayName, email, uid } = user;
            await setDoc(userRef, {
                displayName,
                email,
                uid
            });
        }
    }catch(error) {
        console.error('Error firestore',error)
    }
}

export const saveHouses = async (houses) => {
    for (const house of houses) {
      const houseDocRef = doc(db, "houses", house.id);
      await setDoc(houseDocRef, house);
    }
  }