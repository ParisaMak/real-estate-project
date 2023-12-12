import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithPopup ,
    signOut,
    signInWithEmailAndPassword,
    GoogleAuthProvider} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyANmMxd9k68pId0zrcT9PHQSAbUiFyhY2w",
    authDomain: "dtt-project-15208.firebaseapp.com",
    projectId: "dtt-project-15208",
    storageBucket: "dtt-project-15208.appspot.com",
    messagingSenderId: "129041797470",
    appId: "1:129041797470:web:f6be4acae67ab8747dffcf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
  });

export const SignInWithGooglePopup = () => signInWithPopup(auth, provider);

export const CreateAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;
   return await createUserWithEmailAndPassword(auth , email ,password)
}

export const SignInAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;
   return await signInWithEmailAndPassword(auth , email ,password)
}
export const SignOutUser = async() => await signOut(auth);

