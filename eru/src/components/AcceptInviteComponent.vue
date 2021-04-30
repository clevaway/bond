<template>
  <span>
    <v-card
      id="wrapper"
      class="pa-12 mx-auto"
      elevation="0"
      height="350"
      max-width="500"
    >
      <v-row justify="center">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>Bond Invite</span>
        </v-card-title>
      </v-row>
      <v-row class="mt-n5" justify="center">
        <v-img
          contain
          max-height="129"
          max-width="100"
          src="https://i.pinimg.com/originals/2f/79/ca/2f79cab3c0274c157d52d77f0f998e24.gif"
        />
      </v-row>

      <v-row>
        <!-- message -->
        <center>
          Hey, {{ currentUser.displayName }}. You got a bond invite! Wait a few
          seconds while we bond you with your partner
          <br />

          <v-progress-circular
            class="mt-8"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </center>
        <!-- /message -->
      </v-row>
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
    </v-card>
  </span>
</template>

<script>
import store from "@/store";
// import firebase from "firebase";

export default {
  components: {},
  data() {
    return {
      bondkey: null, // the bondkey to be sent to the backend
      currentUser: store.state.currentUser, //currently logged in user
      snackbarNotification: {
        snackMessage:
          "Note: We are still building this feature! Please check back letter",
        status: true,
        color: "primary",
        displayTime: 7000,
      },
    };
  },

  mounted: function () {
    this.getBondKeyFromURL();
    this.getCurrentUserLoggedIn();
  },
  methods: {
    // function to get curren logged in user
    getCurrentUserLoggedIn() {
      this.currentUser = store.state.currentUser;
    },
    getBondKeyFromURL() {
      // if the data in the url is true
      if (this.$route.query.bondkey) {
        //check if they are login
        if (!store.state.currentUser) {
          this.$router.push("/auth?bondkey=" + this.$route.query.bondkey);
        } else {
          // everything is good that is, bondkey is true and they are logged in
          this.bondkey = this.$route.query.bondkey;
          console.log(this.bondkey);
        }
      } else {
        // if the data doesn't contain any params in the URL redirect them
        // if user is login redirect to home
        if (store.state.currentUser) {
          this.$router.push("/");
        } else {
          // redirect to the login
          this.$router.push("/auth");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#wrapper {
  margin-top: 90px;
}
</style>
