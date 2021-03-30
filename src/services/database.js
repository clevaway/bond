import store from "@/store";
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

  // vibrate both users phones


// realtime firebase
usersCollection.onSnapshot(snapshot => {
    const arrayOfUsers = [];
  snapshot.forEach(doc => {
    let user = doc.data()
      // console.log(user)
    arrayOfUsers.push(user)
  })
  console.log(arrayOfUsers)
  arrayOfUsers.map(user => {
    if(user.userId === store.state.currentUser.uid){
      console.log(user);
    }
  })
})

export default firebaseApp;
