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
import database from "@/services/database";

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
  },
  methods: {
    getCurrentUserLoggedIn() {
      this.currentUser = store.state.currentUser;
      console.log(this.currentUser);
    },
    pingPartner() {
      this.snackbarNotification.status = true;
      this.snackbarNotification.color = "primary";
      this.snackbarNotification.snackMessage = "Pinging partner...";
      this.snackbarNotification.displayTime = 7000;
    },
    // user to singout
    async signOut() {
      await database.signOut();
      this.$router.push("/auth");
    },
  },
};
</script>
