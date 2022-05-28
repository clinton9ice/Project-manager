// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBUPD7ITA7Bl2WUXbIO7jaaT_ahuOGfP2E",
//   authDomain: "project-manager-b6a9c.firebaseapp.com",
//   projectId: "project-manager-b6a9c",
//   storageBucket: "project-manager-b6a9c.appspot.com",
//   messagingSenderId: "288216885564",
//   appId: "1:288216885564:web:74d722e9b27341885b5639",
//   measurementId: "G-Z1PEBYZL67",
// };
const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const firestore = getFirestore(app);
export default { db: firestore, app };
