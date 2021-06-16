import firebase from "firebase/app";

// Optionally import the services that you want to use

import "firebase/auth";
import "firebase/firestore";
//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvjc7eiBwiYg85lvdygnjdOMGFE5XggiQ",
  authDomain: "cobalu-hyperhyper.firebaseapp.com",
  projectId: "cobalu-hyperhyper",
  storageBucket: "cobalu-hyperhyper.appspot.com",
  messagingSenderId: "652220259634",
  appId: "1:652220259634:web:81fdfc0ccc26574e09cb2b"
};



firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
