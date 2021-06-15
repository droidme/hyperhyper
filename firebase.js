import firebase from "firebase/app";

// Optionally import the services that you want to use

import "firebase/auth";
import "firebase/firestore";
//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfM4LebSdcsitAUcGOyfvo8Q1fUpqrtCg",
  authDomain: "cobalu-test.firebaseapp.com",
  databaseURL: "https://cobalu-test-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cobalu-test",
  storageBucket: "cobalu-test.appspot.com",
  messagingSenderId: "165340625678",
  appId: "1:165340625678:web:dfe5b83620ccbefd90355f",
  measurementId: "G-E18GYTN4LM"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
