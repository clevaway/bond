import store from '@/store';
import firebaseApp from '@/firebaseConfig';
import firebase from 'firebase';

// utils
const db = firebaseApp.database();

// SingOut
firebaseApp.signOut = async () => {
  try {
    await firebase.auth().signOut();
    store.commit('setCurrentUser', null); // Update the state in the store
    return true;
  } catch (error) {
    return error;
  }
};

//   if(store.state.currentUser){
//   let getUpdate = db.ref('users/'+store.state.currentUser.uid);
//   getUpdate.on('value', (snapshot) => {
//     const data = snapshot.val();
//     console.log(data)
//   });
// }

// vibrate both users phones
