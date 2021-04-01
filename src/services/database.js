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
const db = firebase.database()




// Google auth
firebaseApp.googleSignIn = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    store.commit("setCurrentUser", firebase.auth().currentUser); // Update the state in the store
    let user = firebase.auth().currentUser
    // create room name
    createSocketConnection(user.uid)
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

  function createSocketConnection(userId) {
    db.ref('users/' + userId).set({
      socketConnectionsName: "Room1",
    });
  }

  if(store.state.currentUser){
  let getUpdate = db.ref('users/'+store.state.currentUser.uid);
  getUpdate.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data)
  });
}
  

  // vibrate both users phones
  

export default firebaseApp;
