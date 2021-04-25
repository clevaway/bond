<template>
  <div>
    <v-container
      id="wrapper"
      class="pa-12 mx-auto mt-5"
      elevation="12"
      max-width="500"
      ><center>
        <h3 class="title font-weight-regular mb-5">
          Add your partner to get started.
        </h3>
        <BondAvatars
          :yourPhoto="currentUser.photoURL"
          partnerPhoto="https://www.superselected.com/wp-content/uploads/2019/02/Black-Woman-Braided-Hair.jpg"
        />
        <br />
        <p class="mt-3 font-weight-light">You & Anna</p>
        <br />
        <AddPartner />
        <br />
        <div class="mx-2 mt-5">
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
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarNotification.status = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <!-- / notification snackbar -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import store from "@/store";
import socket from "@/plugins/socketio.js";
import firebaseApp from "@/firebaseConfig";
import firebase from "firebase";
import BondAvatars from "@/components/userComponents/BondAvatars.vue";
import LikeButton from "@/components/userComponents/LikeButton.vue";
import AddPartner from "@/components/AddPartner.vue";

export default {
  components: {
    BondAvatars,
    LikeButton,
    AddPartner,
  },
  data() {
    return {
      currentUser: store.state.currentUser,
      snackbarNotification: {
        snackMessage: "No data",
        status: false,
        color: "",
        displayTime: 3000,
      },
    };
  },
  mounted: function () {
    this.getCurrentUserLoggedIn();
    this.getsocketConnectionNameFromDB();
  },
  methods: {
    // function to setup connection
    establishSocketConnection(socketConnectionName) {
      // only connect to room when user is __authenticated
      if (store.state.currentUser) {
        console.log("User Authenticated...");
        console.log("Establishing Socket Connection with server...");
        console.log(socketConnectionName);
        // if socketConnectionName is not in db create one and store in db
        if (!socketConnectionName) {
          console.log("socketConnectionName IS NOT in DB");
          this.createSocketConnectionInDB(store.state.currentUser.uid);
          this.snackbarNotification.status = true;
          this.snackbarNotification.color = "green";
          this.snackbarNotification.snackMessage = "💑Contacting partner...";
          this.snackbarNotification.displayTime = 5000;
        } else {
          // if socket is in database just use it
          console.log("socketConnectionName IS IN DB");
          // sending the create room event to the server alongside the room name to be created
          // create room
          socket.emit("createRoom", socketConnectionName.socketConnectionName);
          // receiving info from backend about created room status
          socket.on("createRoomStatus", (message) => {
            console.log(message);
            this.snackbarNotification.status = true;
            this.snackbarNotification.color = "green";
            this.snackbarNotification.snackMessage =
              "❤ You can now ping your partner!";
            this.snackbarNotification.displayTime = 5000;
          });
        }
      } else {
        console.log("User not Authenticated!");
      }
    },
    // function to get the socketConnectionName to connect to from firebase database
    async getsocketConnectionNameFromDB() {
      // utils
      const db = firebaseApp.database();

      let socketConnectionName = "";
      let getUpdate = db.ref("users/" + store.state.currentUser.uid);
      try {
        let snapshot = await getUpdate.once("value");
        socketConnectionName = snapshot.val();
        // console.log(socketConnectionName);
        this.establishSocketConnection(socketConnectionName);
      } catch (error) {
        console.log(error);
        this.snackbarNotification.status = true;
        this.snackbarNotification.color = "green";
        this.snackbarNotification.snackMessage = "❤ Now Connected to partner!";
        this.snackbarNotification.displayTime = 5000;
      }
    },
    // function to create connection
    createSocketConnectionInDB(userId) {
      // utils
      const db = firebaseApp.database();
      db.ref("users/" + userId).set({
        socketConnectionName: "Room1",
      });
    },
    // function to get curren logged in user
    getCurrentUserLoggedIn() {
      this.currentUser = store.state.currentUser;
      console.log(this.currentUser);
    },
    // ping partner funtion
    pingPartner() {
      let socketConnectionName = "Room1";
      console.log(socketConnectionName);
      // emiting event to backend to vibrate all devices in this room
      socket.emit("vibrate", socketConnectionName);

      // vibrate all devices in this room, event coming from backend
      socket.on("vibrateThisDevice", (message) => {
        console.log(message);
        this.snackbarNotification.status = true;
        this.snackbarNotification.color = "green";
        this.snackbarNotification.snackMessage = "❤ Vibe!!!";
        this.snackbarNotification.displayTime = 5000;
        //   vibrate user's device first
        window.navigator.vibrate(200); // vibrate for 200ms
      });
    },
    // user singout function
    async signOut() {
      try {
        await firebase.auth().signOut();
        store.commit("setCurrentUser", null); // Update the state in the store
        this.$router.push("/auth");
      } catch (error) {
        this.snackbarNotification.status = true;
        this.snackbarNotification.color = "red";
        this.snackbarNotification.snackMessage = error;
        this.snackbarNotification.displayTime = 6000;
      }
    },
  },
};
</script>
