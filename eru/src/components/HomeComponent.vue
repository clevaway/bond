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
// import socket from "@/plugins/socketio.js";
import firebaseApp from "@/firebaseConfig";
import firebase from "firebase";
import BondAvatars from "@/components/userComponents/BondAvatars.vue";
import LikeButton from "@/components/userComponents/LikeButton.vue";
import AddPartner from "@/components/AddPartner.vue";
firebaseApp; //calling firebase init
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
  },
  methods: {
    // function to get curren logged in user
    getCurrentUserLoggedIn() {
      this.currentUser = store.state.currentUser;
      console.log(this.currentUser);
    },
    // ping partner funtion
    pingPartner() {
      console.log("vibe debugger...");
      window.navigator.vibrate([200, 52, 600, 400]); // vibrate for 200ms
      this.snackbarNotification.status = true;
      this.snackbarNotification.color = "primary";
      this.snackbarNotification.snackMessage = "❤ Vibe!";
      this.snackbarNotification.displayTime = 5000;
      //   vibrate user's device first
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
