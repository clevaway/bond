<template>
  <span>
    <v-card
      id="wrapper"
      class="pa-12 mx-auto"
      elevation="12"
      height="440"
      max-width="500"
    >
      <v-row justify="center">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>Welcome to Bond</span> </v-card-title
        ><br />
      </v-row>
      <v-row justify="center">
        <ButtonGoogle @click="googleSignIn" text="Sign in with Google" />
        <!-- message -->
        <div>
          <v-container>
            Send your loved one a vibration with a lovely sound, so they know
            you miss them. Anytime you want to, anywhere they are.
            <div class="mt-5">
              Basic Features
              <ul>
                <li>Open Signups (Only Google for now)</li>
              </ul>
            </div>
          </v-container>
        </div>
      </v-row>
      <!-- /message -->
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
      <!-- overlay loader-->
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <!-- overlay loader-->
    </v-card>
  </span>
</template>

<script>
import store from "@/store";
import firebase from "firebase";
import ButtonGoogle from "@/components/userComponents/ButtonGoogle.vue";

export default {
  components: { ButtonGoogle },
  data() {
    return {
      overlay: false,
      snackbarNotification: {
        snackMessage: "No data",
        status: false,
        color: "",
        displayTime: 3000,
      },
    };
  },
  methods: {
    // Google signin method
    async googleSignIn() {
      this.overlay = true; //show loader when loading google auth
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
        store.commit("setCurrentUser", firebase.auth().currentUser); // Update the state in the store
        // alert("You are now signed-in");
        console.log(store.state.currentUser);
        this.authSendToBackEnd();
      } catch (error) {
        this.overlay = false; //hide loader when loading google auth
        this.snackbarNotification.status = true;
        this.snackbarNotification.color = "red";
        this.snackbarNotification.snackMessage = error;
        this.snackbarNotification.displayTime = 6000;
      }
    },
    // End of google SignIn
    // function that sends data to backend on login
    async authSendToBackEnd() {
      const userObject = {
        uid: store.state.currentUser.uid,
        name: store.state.currentUser.displayName,
        username: null,
        photo: store.state.currentUser.photoURL,
        email: store.state.currentUser.email,
      };
      console.log(userObject);
      try {
        // login or signup user
        let response = await this.axios.post(
          `https://bond-api.vercel.app/user`,
          userObject
        );
        response = response.data[0];
        console.log("Return data => ");
        console.log(response);
        if (response.status == "login") {
          console.log(response.message);
          this.snackbarNotification.status = true;
          this.snackbarNotification.color = "primary";
          this.snackbarNotification.snackMessage = response.message;
          this.snackbarNotification.displayTime = 5000;
          this.checkAuthReason();
        } else if (response.status == "signup") {
          console.log(response.message);
          this.snackbarNotification.status = true;
          this.snackbarNotification.color = "primary";
          this.snackbarNotification.snackMessage = response.message;
          this.snackbarNotification.displayTime = 5000;
          this.checkAuthReason();
        } else {
          console.log(response.message);
          this.snackbarNotification.status = true;
          this.snackbarNotification.color = "primary";
          this.snackbarNotification.snackMessage =
            "You should never see this error! Just in case";
          this.snackbarNotification.displayTime = 5000;
        }
      } catch (error) {
        // if an error occures
        console.error("There was an error =>" + error);
        this.snackbarNotification.status = true;
        this.snackbarNotification.color = "red";
        this.snackbarNotification.snackMessage = "Error:" + error.message;
        this.snackbarNotification.displayTime = 6000;
      }
    },
    //this function checks why they are on the auth route
    checkAuthReason() {
      // check if it's an invite or a normal login
      if (this.$route.query.bondkey) {
        // redirect them to accept view with the bondkey to be used later on there
        console.log("bondkey => " + this.$route.query.bondkey);
        this.$router.push("/accept?bondkey=" + this.$route.query.bondkey);
      } else {
        // redirect them to home page if it's normal login
        console.log("Normal auth");
        this.$router.push("/"); // redirects user when are logged in
      }
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
#wrapper {
  margin-top: 90px;
}
</style>
