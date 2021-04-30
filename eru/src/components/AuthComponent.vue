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
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
        store.commit("setCurrentUser", firebase.auth().currentUser); // Update the state in the store
        // alert("You are now signed-in");
        this.snackbarNotification.status = true;
        this.snackbarNotification.color = "green";
        this.snackbarNotification.snackMessage = "You are now signed-in";
        this.snackbarNotification.displayTime = 5000;
        console.log("You are logged in as => ");
        console.log(store.state.currentUser);
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
      } catch (error) {
        this.snackbarNotification.status = true;
        this.snackbarNotification.color = "red";
        this.snackbarNotification.snackMessage = error;
        this.snackbarNotification.displayTime = 6000;
      }
    },
    // End of google SignIn
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
#wrapper {
  margin-top: 90px;
}
</style>
