import firebase from 'firebase'

import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyDzCAGq99EB0-eUjC-Gtv0HfFwtps9b5Wo",
  authDomain: "appcitas-78b48.firebaseapp.com",
  databaseURL: "https://appcitas-78b48.firebaseio.com",
  projectId: "appcitas-78b48",
  storageBucket: "appcitas-78b48.appspot.com",
  messagingSenderId: "777906371365",
  appId: "1:777906371365:web:5f47d5f08a235f5d81b8cc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db,
}
