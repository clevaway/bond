import store from "@/store";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDlH9bOMCk0Z9e5llhIjzkE4s5wrBCrp2Q",
    authDomain: "connected-1ca2f.firebaseapp.com",
    projectId: "connected-1ca2f",
    storageBucket: "connected-1ca2f.appspot.com",
    messagingSenderId: "688344423363",
    appId: "1:688344423363:web:e9bed3a261727e893f3b76",
    measurementId: "G-QYS8RKXXD0"
};

const database = firebase.initializeApp(firebaseConfig);

// Google auth

database.googleSignIn = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    store.commit("setCurrentUser", firebase.auth().currentUser); // Update the state in the store
    return true;
  } catch (error) {
    return error;
  }
};

// SingOut

database.signOut = async () => {
    try {
      await firebase.auth().signOut();
      store.commit("setCurrentUser", null); // Update the state in the store
      store.commit("setCurrentUserRole", null);
      return true;
    } catch (error) {
      return error;
    }
  };
export default database;
