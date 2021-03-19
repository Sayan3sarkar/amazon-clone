import firebase from 'firebase';

const firebaseConfig = {
    // apiKey: "AIzaSyC33vbz_JC4j1Wlhkx_wp4hcubQkVWhy74",
    // authDomain: "clone-e0a97.firebaseapp.com",
    // projectId: "clone-e0a97",
    // storageBucket: "clone-e0a97.appspot.com",
    // messagingSenderId: "766155243846",
    // appId: "1:766155243846:web:135aa21b769cc42f79e547"
    apiKey: "AIzaSyAwHd48SUJgTvAPMAo9TSfBcLqo0Tz4tD4",
    authDomain: "clone-3a936.firebaseapp.com",
    projectId: "clone-3a936",
    storageBucket: "clone-3a936.appspot.com",
    messagingSenderId: "597628445962",
    appId: "1:597628445962:web:cd6a2259354e8a1fc986f3"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth};