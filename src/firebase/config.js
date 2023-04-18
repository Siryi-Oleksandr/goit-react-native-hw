import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuJP7EczOfGbVJriOTwoRExxXFKcEYJ7s",
  authDomain: "react-native-hw-6.firebaseapp.com",
  projectId: "react-native-hw-6",
  storageBucket: "react-native-hw-6.appspot.com",
  messagingSenderId: "115088471131",
  appId: "1:115088471131:web:d21f8f117aed8ae54bbb7e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
