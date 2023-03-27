import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAwvcCin35-BJanw1MGRI8k4W1wbVHWILI",
  authDomain: "react-native-my.firebaseapp.com",
  databaseURL:
    "https://react-native-my-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-native-my",
  storageBucket: "react-native-my.appspot.com",
  messagingSenderId: "90309754730",
  appId: "1:90309754730:web:09112a0a998220ae21ef13",
  measurementId: "G-LV9TQ9ZEQL",
};

export default firebase.initializeApp(firebaseConfig);

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
