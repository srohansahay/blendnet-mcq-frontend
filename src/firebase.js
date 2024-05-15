// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, docs } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkw3CFjqFKF4XtL_9vy-nQ-BKfmLIkrxo",
  authDomain: "blendnet-mcq.firebaseapp.com",
  projectId: "blendnet-mcq",
  storageBucket: "blendnet-mcq.appspot.com",
  messagingSenderId: "765709989789",
  appId: "1:765709989789:web:ceaa382c72836b4d61a174"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


