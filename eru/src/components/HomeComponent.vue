<template>
  <div>
    <v-card
      id="wrapper"
      class="pa-12 mx-auto mt-16"
      elevation="12"
      max-width="500"
      ><center>
        <h3 class="title font-weight-regular mb-5">
          Add your partner to get started.
        </h3>

        <v-avatar size="80" class="mb-5">
          <img :src="currentUser.photoURL" :alt="currentUser.displayName" />
        </v-avatar>
        <br />
        <span>{{ currentUser.displayName }}</span>
        <br />
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              class="mt-5"
              depressed
              color="pink"
              dark
            >
              Add partner
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add your partner</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Partner's Email *"
                      required
                      hint="An email is required to invite partner"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Send invite
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <br />
        <v-btn
          @click="pingPartner"
          class="mx-2 mt-5"
          fab
          dark
          small
          color="pink"
        >
          <v-icon dark> mdi-heart </v-icon> </v-btn
        ><br />
        <v-btn @click="signOut" class="mt-8" icon color="pink">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </center>
    </v-card>

    <!-- notification snackbar -->
    <v-snackbar
      :color="snackbarNotification.color"
      v-model="snackbarNotification.status"
      :timeout="snackbarNotification.displayTime"
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

export default {
  data() {
    return {
      dialog: false, // to add new partner
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
              "❤ Now Connected to partner!";
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
    pingPartner() {
      this.snackbarNotification.status = true;
      this.snackbarNotification.color = "primary";
      this.snackbarNotification.snackMessage = "Pinging partner...";
      this.snackbarNotification.displayTime = 7000;
      //   vibrate user's device first
      window.navigator.vibrate(200); // vibrate for 200ms
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
