import firebase from "firebase/app";

// Optionally import the services that you want to use

import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";
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
const messaging = firebase.messaging();



const getMessagingToken = () => {
  return messaging.getToken({ vapidKey: 'BD2cigDiDWXJYm1vN-9vRco3-znK-YUTR6bOrYvkZU2RjEHyuVpYXdpuz-wyTckDrshBULT462eX8ENSejzmeJg' })
    .then((currentToken) => {
      if (currentToken) {
        console.log("FCM token> ", currentToken);
        db.collection("tokens")
          .doc(currentToken)
          .set({token: currentToken});
      } else {
        console.log('No registration token available. Request permission to generate one.');
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
}

messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  const { title, ...options } = payload.notification;
  navigator.serviceWorker.register("firebase-messaging-sw.js");
  function showNotification() {
    Notification.requestPermission(function (result) {
      if (result === "granted") {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification(payload.notification.title, {
            body: payload.notification.body,
            tag: payload.notification.tag,
          });
        });
      }
    });
  }
  showNotification();
});

export { auth, db, getMessagingToken };
