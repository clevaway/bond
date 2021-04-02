import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD2hQfQKrLaZ0cZPDiIVatF5FhPlVeOqfE",
  authDomain: "bond-8a506.firebaseapp.com",
  projectId: "bond-8a506",
  storageBucket: "bond-8a506.appspot.com",
  messagingSenderId: "895524001491",
  appId: "1:895524001491:web:5d38180fe6cbb4df22a626",
  measurementId: "G-1N248D9N7R"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp