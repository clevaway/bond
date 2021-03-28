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

const firebaseApp = firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore()
// collection references
const usersCollection = db.collection('users')



// Google auth
firebaseApp.googleSignIn = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    store.commit("setCurrentUser", firebase.auth().currentUser); // Update the state in the store
    let user = firebase.auth().currentUser
    // create the user in firestore DB
    creatUserInDataBase(user.uid, user.displayName, user.email)
    return true;
  } catch (error) {
    return error;
  }
};

// SingOut
firebaseApp.signOut = async () => {
    try {
      await firebase.auth().signOut();
      store.commit("setCurrentUser", null); // Update the state in the store
      return true;
    } catch (error) {
      return error;
    }
  };

     // create user profile object in userCollections on firebase db
     async function creatUserInDataBase(userId, name, email){
     await usersCollection.doc(userId).set({
      userId: userId,
      userName: name,
      userEmail: email,
      // partnerId: null,
      // partnerName: null,
      // partnerEmail: null,
      // partnerPhotoUrl: null,
      // vibrate : false,
    })
  }

export default firebaseApp;
