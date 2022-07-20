import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCF5b9rsKNqb1m_iHpTyWbeJBUuprv5vpk",
  authDomain: "disney-clone-9a9ec.firebaseapp.com",
  projectId: "disney-clone-9a9ec",
  storageBucket: "disney-clone-9a9ec.appspot.com",
  messagingSenderId: "275280940531",
  appId: "1:275280940531:web:1b4bceda455394bfed9686",
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
