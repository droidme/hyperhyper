import firebase from "firebase/app";

// Optionally import the services that you want to use

import "firebase/auth";
import "firebase/firestore";
//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

//cobalu-test
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

// hyperhyper
// const firebaseConfig = {
//   apiKey: "AIzaSyCvjc7eiBwiYg85lvdygnjdOMGFE5XggiQ",
//   authDomain: "cobalu-hyperhyper.firebaseapp.com",
//   projectId: "cobalu-hyperhyper",
//   storageBucket: "cobalu-hyperhyper.appspot.com",
//   messagingSenderId: "652220259634",
//   appId: "1:652220259634:web:81fdfc0ccc26574e09cb2b"
// };



firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
