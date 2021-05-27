<template>
  <div>
    <v-container id="wrapper" class="pa-12 mx-auto mt-5" elevation="12" max-width="500">
      <center>
        <h3 class="title font-weight-regular mb-5">Add your partner to get started.</h3>
        <BondAvatars
          v-if="partnerInfo && currentUser"
          :yourPhoto="currentUser.photoURL"
          :partnerPhoto="partnerInfo.person.photo"
        />
        <BondAvatars
          v-else
          :yourPhoto="currentUser.photoURL"
          partnerPhoto="https://www.voanews.com/themes/custom/voa/images/Author__Placeholder.png"
        />
        <br />
        <p class="mt-3 font-weight-light" v-if="partnerInfo">You & {{partnerInfo.person.name}}</p>
        <p class="mt-3 font-weight-light" v-else>You & Your partner</p>

        <!-- add partner button component -->
        <span v-if="!partnerInfo">
          <br />
          <AddPartner />
          <br />
        </span>

        <!-- add partner button component -->

        <div class="mx-2 mt-5" v-if="partnerInfo">
          <LikeButton @click="pingPartner" />
        </div>
        <br />
        <v-btn @click="signOut" class="mt-5" icon color="primary">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </center>
    </v-container>

    <!-- notification snackbar -->
    <v-snackbar
      :color="snackbarNotification.color"
      v-model="snackbarNotification.status"
      :timeout="snackbarNotification.displayTime"
      top
      right
    >
      {{ snackbarNotification.snackMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbarNotification.status = false">Close</v-btn>
      </template>
    </v-snackbar>
    <!-- / notification snackbar -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import store from '@/store';
// import socket from "@/plugins/socketio.js";
import firebaseApp from '@/firebaseConfig';
import firebase from 'firebase';
import BondAvatars from '@/components/userComponents/BondAvatars.vue';
import LikeButton from '@/components/userComponents/LikeButton.vue';
import AddPartner from '@/components/AddPartner.vue';
import socket from '@/plugins/socketio.js';
console.log(socket);
firebaseApp; //calling firebase init
export default {
  components: {
    BondAvatars,
    LikeButton,
    AddPartner,
  },
  data() {
    return {
      partnerInfo: null,
      roomName: null, //The room they are currently in
      currentUser: store.state.currentUser,
      snackbarNotification: {
        snackMessage: 'No data',
        status: false,
        color: '',
        displayTime: 3000,
      },
    };
  },
  mounted: function () {
    this.getCurrentUserLoggedIn();
    this.getBonded();
  },
  methods: {
    // function that checks if they are bonded or not
    async getBonded() {
      try {
        let response = await this.axios.get(
          `https://bond-api.vercel.app/getBondedUsers/${store.state.currentUser.uid}`
        );
        response = response.data[0];
        this.partnerInfo = response;
        console.log('Return data => ');
        console.log(response);
        this.roomName = response.room_id; // the room they are currently on
        this.establishSocketConnection(response.room_id, store.state.currentUser.displayName); //passing the room_id and the person who joined
      } catch (error) {
        // if an error occures
        console.error('There was an error =>' + error);
        this.snackbarNotification.status = true;
        this.snackbarNotification.color = 'red';
        this.snackbarNotification.snackMessage = 'Error:' + error.message;
        this.snackbarNotification.displayTime = 6000;
      }
    },
    // function to get curren logged in user
    getCurrentUserLoggedIn() {
      this.currentUser = store.state.currentUser;
      console.log(this.currentUser);
    },
    // ping partner funtion
    pingPartner() {
      let socketConnectionName = this.roomName;
      console.log('roomName set => ' + socketConnectionName);
      // emiting event to backend to vibrate all devices in this room
      socket.emit('vibrate', socketConnectionName);

      // vibrate all devices in this room, event coming from backend
      socket.on('vibrateThisDevice', (message) => {
        console.log(message);
        console.log('vibe debugger...');
        this.snackbarNotification.status = true;
        this.snackbarNotification.color = 'green';
        this.snackbarNotification.snackMessage = '❤ Vibe!!!';
        this.snackbarNotification.displayTime = 5000;
        //   vibrate user's device first
        window.navigator.vibrate([200, 52, 600, 400]); // vibrate for 200ms
      });
      // console.log('vibe debugger...');
      // window.navigator.vibrate([200, 52, 600, 400]); // vibrate for 200ms
      // this.snackbarNotification.status = true;
      // this.snackbarNotification.color = 'primary';
      // this.snackbarNotification.snackMessage = '❤ Vibe!';
      // this.snackbarNotification.displayTime = 5000;
      //   vibrate user's device first
    },
    // function to setup connection
    establishSocketConnection(socketConnectionName, userJoining) {
      // only connect to room when user is __authenticated
      if (store.state.currentUser) {
        console.log('User Authenticated...');
        console.log('Establishing Socket Connection with server...');
        console.log('socketConnectionName => ' + socketConnectionName);
        // if socketConnectionName is not in db create one and store in db
        if (!socketConnectionName) {
          console.log('socketConnectionName IS NOT in DB');
          this.snackbarNotification.status = true;
          this.snackbarNotification.color = 'green';
          this.snackbarNotification.snackMessage = '💑Contacting partner...';
          this.snackbarNotification.displayTime = 5000;
        } else {
          // if socket is in database just use it
          console.log('socketConnectionName IS IN DB');
          // sending the create room event to the server alongside the room name to be created
          // create room
          socket.emit('createRoom', socketConnectionName, userJoining);
          // receiving info from backend about created room status
          socket.on('createRoomStatus', (message) => {
            console.log(message);
            this.snackbarNotification.status = true;
            this.snackbarNotification.color = 'green';
            this.snackbarNotification.snackMessage = 'Connected!';
            this.snackbarNotification.displayTime = 5000;
          });
        }
      } else {
        // when user is not __authenticated yet
        console.log('User not Authenticated!');
      }
    },
    // user singout function
    async signOut() {
      try {
        await firebase.auth().signOut();
        store.commit('setCurrentUser', null); // Update the state in the store
        this.$router.push('/auth');
      } catch (error) {
        this.snackbarNotification.status = true;
        this.snackbarNotification.color = 'red';
        this.snackbarNotification.snackMessage = error;
        this.snackbarNotification.displayTime = 6000;
      }
    },
  },
};
</script>
